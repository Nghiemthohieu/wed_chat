import { Children, createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../util/services";
import {io} from "socket.io-client";

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
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications,setNotifications] = useState([]);
    const [allUsers,setAllUsers] = useState([]);

    console.log("notifications",notifications);

    useEffect(()=>{
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    },[user]);

    useEffect(()=>{

        if(socket===null) return;

        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) =>{
            setOnlineUsers(res);
        })

        return () =>{
            socket.off("getOnlineUsers");
        };

    },[socket]);

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

    useEffect(() => {
        if (socket === null) return;
    
        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chatId) return;
    
            setMessages((prev) => [...prev, res]);
        });

        socket.on("getNotification", (res) =>{
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);

            if(isChatOpen){
                setNotifications(prev => [{...res, isRead: true},...prev]);
            } else {
                setNotifications(prev => [res, ...prev]);
            }
        })
    
        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        };
    
    }, [socket, currentChat]);
    

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getRequest(`${baseUrl}/users`);
                if (response.error) {
                    return console.error("Error fetching users:", response);
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
                console.error("Error fetching users:", error);
            }
        };

        getUsers();
    }, [user, userChats]);  // Added `user` to the dependency array

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
                    console.error("Error fetching user chats:", error);
                }
            }
        };

        getUserChats();
    }, [user, notifications]);

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
                    console.error("Error fetching Messages:", error);
                }
        };

        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async(textMessage, sender, currenChatId, setTextMessage)=>{

            if(!textMessage) return console.log("You must type something...");

            const response = await postRequest(`${baseUrl}/messages`,JSON.stringify({
                chatId: currenChatId,
                senderId: sender._id,
                text: textMessage
            })
        );

        if(response.error){
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev)=> [...prev, response]);
        setTextMessage("");

    },[])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async(firstId,secondId)=>{
        const response = await postRequest(`${baseUrl}/chats`,JSON.stringify({
                firstId,
                secondId,
            })
        );
        if(response.error){
            return console.log("Error creating chat", response);
        }

        setUserChats((prev)=>[...prev, response]);
    },[]);

    const markAllNotificationsAsRead = useCallback((notifications)=>{
        const mNotification = notifications.map((n)=> {
            return{...n, isRead: true};
        });

        setNotifications(mNotification);
    },[])

    const markNotificationsAsRead= useCallback((n, userChats, user, notifications)=>{
        //find chat to open

        const desiredChat= userChats.find(chat =>{
            const chatMembers = [user._id, n.senderId]
            const isDesiredChat = chat?.members.every((members) =>{
                return chatMembers.includes(members);
            });

            return isDesiredChat
        });

        //mark notification as read
        const mNotifications = notifications.map((el)=>{
            if(n.secondId === el.senderId){
                return {...n, isRead: true};
            } else {
                return el;
            }
        });

        updateCurrentChat(desiredChat);
        setNotifications(mNotifications);
    },[]);

    const markThisUserNotificationsAsRead = useCallback((thisUserNotification, notifications)=>{
        const mNotifications = notifications.map((el)=>{
            let notification;

            thisUserNotification.forEach((n)=>{
                if(n.senderId === el.senderId)
                {
                    notification = {...n, isRead: true};
                } else {
                    notification =el;
                }
            });
            return notification;
        });
        setNotifications(mNotifications);
    },[]);

    return (
        <ChatContext.Provider 
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                currentChat, // Add this line
                messages,
                isMessagesLoading,
                messagesError,
                sendTextMessage,
                onlineUsers,
                notifications,
                allUsers,
                markAllNotificationsAsRead,
                markNotificationsAsRead,
                markAllNotificationsAsRead,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
