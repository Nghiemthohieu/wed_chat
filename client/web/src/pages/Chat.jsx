import React, { useContext, useState } from 'react';
import MainTab from "../components/main-tab";
import ConvListSemiCompact from "../components/conv-list-semi-compact";
import ChatOnboard from "../components/chatOnboard";
import Chatview from "../components/chatview";
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
    const [showChatView, setShowChatView] = useState(false);
    const {user} = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat} = useContext(ChatContext);
    
    console.log(userChats?.length);
    
    return (
        <div id="app-page">
            {userChats?.length<-1 ? null: (
            <div id="container" className="WEB">
                <nav id="sidebarNav" className="user-none">
                    <MainTab />
                    {/* Pass the click handler to ConvListSemiCompact */}
                    <ConvListSemiCompact/>
                </nav>
                <Chatview />
            </div>
            )}
        </div>
    );
};

export default Chat;
