import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../util/services";

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState({}); // Đặt giá trị mặc định là object rỗng

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

                if (response?.error) {
                    console.log("Error getting messages...", response.error);
                    return;
                }

                const lastMessage = response?.[response.length - 1] || {};
                setLatestMessage(lastMessage);
            } catch (error) {
                console.error("API request failed:", error);
            }
        };
        getMessages();
    }, [chat?._id, newMessage, notifications]);

    console.log("Latest message:", latestMessage);
    return { latestMessage }; // Trả về object chứa latestMessage
};