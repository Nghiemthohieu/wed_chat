import React, { createContext, useState, useEffect, useCallback } from "react";
import { AsyncStorage } from '@react-native-async-storage/async-storage'; // Dùng AsyncStorage cho việc lưu trữ cục bộ
import { io } from "socket.io-client";
import { baseUrl, getRequest, postRequest } from "../util/services"; // Giả sử bạn đã có hàm getRequest, postRequest cho React Native (Axios hoặc Fetch)

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessageLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("currentChats",currentChat);

  // Kết nối Socket
  useEffect(() => {
    const newSocket = io("http://192.168.0.103:3000", {
      transports: ["websocket"], // Tối ưu cho React Native
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Lắng nghe sự kiện kết nối và thông báo về người dùng online
  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // Gửi tin nhắn mới
  useEffect(() => {
    if (socket === null || !newMessage || !currentChat) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    if (!recipientId) {
      console.error("Không tìm thấy recipientId");
      return;
    }

    console.log("Gửi tin nhắn:", { ...newMessage, recipientId });
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // Nhận tin nhắn mới và cập nhật
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  // Lấy danh sách người dùng
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users`); // Đảm bảo địa chỉ IP đúng
        if (response.error) {
          return console.error("Lỗi khi lấy người dùng:", response);
        }

        const pChats = response.filter((u) => {
          let isChatCreated = false;

          if (user?._id === u._id) {
            return false;
          }

          if (userChats) {
            isChatCreated = userChats.some((chat) => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }

          return !isChatCreated;
        });

        setPotentialChats(pChats);
        setAllUsers(response);
      } catch (error) {
        console.error("Lỗi khi lấy người dùng:", error);
      }
    };

    getUsers();
  }, [user, userChats]);

  // Lấy danh sách các cuộc trò chuyện của người dùng
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatLoading(true);
        setUserChatsError(null);

        try {
          const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
          setIsUserChatLoading(false);

          if (response.error) {
            return setUserChatsError(response);
          }

          setUserChats(response);
        } catch (error) {
          setIsUserChatLoading(false);
          setUserChatsError(error);
          console.error("Lỗi khi lấy cuộc trò chuyện người dùng:", error);
        }
      }
    };

    getUserChats();
  }, [user, notifications]);

  // Lấy tin nhắn trong cuộc trò chuyện hiện tại
  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessagesError(null);

      try {
        const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
        setIsMessageLoading(false);

        if (response.error) {
          return setMessagesError(response);
        }

        setMessages(response);
      } catch (error) {
        setIsMessageLoading(false);
        setMessagesError(error);
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    getMessages();
  }, [currentChat]);

  // Gửi tin nhắn văn bản
  const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
    if (!textMessage) return console.log("Bạn phải nhập nội dung tin nhắn...");

    const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
      chatId: currentChatId,
      senderId: sender._id,
      text: textMessage,
    }));

    if (response.error) {
      return setSendTextMessageError(response);
    }

    setNewMessage(response);
    setMessages((prev) => [...prev, response]);
    setTextMessage("");
  }, []);

  // Cập nhật cuộc trò chuyện hiện tại
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  // Tạo cuộc trò chuyện mới
  const createChat = useCallback(async (firstId, secondId) => {
    console.log("firstId",firstId);
    console.log("secondId",secondId);
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
      firstId,
      secondId,
    }));
    if (response.error) {
      return console.log("Lỗi khi tạo cuộc trò chuyện", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  // Đánh dấu tất cả thông báo là đã đọc
  const markAllNotificationsAsRead = useCallback((notifications) => {
    const mNotification = notifications.map((n) => {
      return { ...n, isRead: true };
    });

    setNotifications(mNotification);
  }, []);

  // Đánh dấu thông báo của người dùng cụ thể là đã đọc
  const markNotificationsAsRead = useCallback((n, userChats, user, notifications) => {
    const desiredChat = userChats.find((chat) => {
      const chatMembers = [user._id, n.senderId];
      const isDesiredChat = chat?.members.every((member) => chatMembers.includes(member));

      return isDesiredChat;
    });

    const mNotifications = notifications.map((el) => {
      if (n.senderId === el.senderId) {
        return { ...n, isRead: true };
      }
      return el;
    });

    updateCurrentChat(desiredChat);
    setNotifications(mNotifications);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationsAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
