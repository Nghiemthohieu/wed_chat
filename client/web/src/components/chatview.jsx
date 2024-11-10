    import { useContext, useEffect, useRef, useState } from "react";
    import { ChatContext } from "../context/ChatContext";
    import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
    import { AuthContext } from "../context/AuthContext";
    import ChatOnboard from "./chatOnboard";
    import avarter from "../../Image/avatar_trang_1_cd729c335b.jpg";
    import moment from "moment";
    import 'moment/locale/vi';
    import InputEmoji from "react-input-emoji";
    import {Stack} from "react-bootstrap";
    moment.locale('vi');

    const Chatview = () => {
        const { user } = useContext(AuthContext);
        const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
        const { recipientUser } = useFetchRecipientUser(currentChat, user);
        const [textMessage, setTextMessage] = useState(""); // Use useState to manage text message state
        const scroll = useRef();

        useEffect(()=>{
            scroll.current?.scrollIntoView({behavior: "smooth"});
        },[messages])

        if (!recipientUser) return <ChatOnboard />;
        if (isMessagesLoading) {
            return <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>;
        }

        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                sendTextMessage(textMessage, user, currentChat?._id, setTextMessage);
            }
        };

        return (
            <>
                <main>
                    <div className="main__center flex flex-col flex-1 animated w100">
                        <header id="header" className="flx" style={{position: "absolute", zIndex:"999", background:"#fff"}}>
                            <div className="thread-chat relative flx flx-1 items-center">
                                <div className="threadChat__avatar clickable" id="ava_chat_box_view">
                                    <div className="relative zavatar-container">
                                        <div className="zavatar zavatar-l zavatar-single flex items-center justify-center relative disableDrag clickable">
                                            <img src={avarter} alt="" className="a-child" />
                                        </div>
                                    </div>
                                </div>
                                <div className="threadChat__title flex-1 flex flex-col w-0">
                                    <div className="flex items-center main-title-container w-full">
                                        <div className="flex items-center overflow-hidden">
                                            <div className="header-title flex items-center flex-1 font-bold text-lg">
                                                {recipientUser?.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex items-center w-full">
                                            <div className="subtitle header-subtitle">
                                                <span>
                                                    <span>Truy cập</span>
                                                    <span>1 giờ trước</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center" id="headerBtns">
                                <button className="z--btn--v2 btn-tertiary-neutral medium rounded icon-only" title="Thông tin hội thoại">
                                    <span className="material-symbols-outlined icon">view_week</span>
                                </button>
                            </div>
                        </header>

                        <article id="chatView" className="relative flx" style={{height:"100%"}}>
                            <div className="message-view__blur__overlay_noavatar"></div>
                            <div id="messageView" className="message-view" tabIndex="21">
                                <div id="dragOverlayMessageView" className="drag-media-overlay">
                                    <div className="drag-title">Gửi nhanh</div>
                                    <div className="drag-desc">Thả Files vào đây để gửi ngay</div>
                                </div>
                                <div id="messageViewContainer" className="message-view__scroll" style={{overflow: "scroll"}}>
                                    <div className="message-view__scroll__inner preview-ts fadeInAndOut" id="messageViewScroll" style={{paddingTop: "90px"}}>
                                        {messages && messages.map((msg, index) => {
                                            return (
                                                <div className="chat-item flx chat-item-audit chat-item-spacing --s2 me" key={index} ref={scroll}>
                                                    <div className="chat-content flx flx-col flx-cell chat-content-audit" style={{ marginRight: msg?.senderId === user?._id ? "0" : "50px" }}>
                                                        <div className="chat-message wrap-message rotate-container me -send-time -reaction bubble-jump-target">
                                                            <div style={{ display: "flex", width: "100%", justifyContent: msg?.senderId === user?._id ? "flex-end" : "initial" }}>
                                                                <div className="card card-with-reaction-v2 me last-msg card--text">
                                                                    <div>
                                                                        <div className="overflow-hidden">
                                                                            <span className="span15">
                                                                                <span className="text">{msg.text}</span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <div className="card-send-time flx flx-al-c flx-1 me">
                                                                            <span className="card-send-time__sendTime non-selected">{moment(msg.createdAt).calendar()}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-reaction-v2-space" style={{ height: "0px" }}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div id="chat-box-input-container-id" className="chat-box-input-container">
                                    <div id="dragOverlayInputbox" className="drag-media-overlay drag-media-overlay--chat-box-input">
                                        <div className="drag-title">Xem trước khi gửi</div>
                                        <div className="drag-desc">Thả Files vào đây để xem lại trước khi gửi</div>
                                    </div>
                                    <div id="chat-box-bar-id" className="chat-box-bar">
                                        <div className="left-chat-box-bar">
                                            <ul className="chat-box-toolbar">
                                                {['ar_stickers', 'imagesmode', 'attach_file', 'id_card', 'screenshot_region', 'edit_note', 'add_comment', 'more_horiz'].map((icon, index) => (
                                                    <li className="chat-box-toolbar-item" key={index}>
                                                        <button className="z--btn--v2 btn-tertiary-neutral medium rounded icon-only" title="Toolbar Icon">
                                                            <span className="material-symbols-outlined icon">{icon}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="right-chat-box-bar"></div>
                                    </div>
                                    <div id="chatInput" className="chat-box-input">
                                        <div id="chat-input-container-id" className="chat-input-container--audit-2023">
                                            <Stack direction="horizonal" gap={3} className="chat-input flx" style={{width: "100%"}}>
                                                <InputEmoji onKeyDown={handleKeyPress} value={textMessage} onChange={setTextMessage} fontFamily="hunito" borderColor="rgba(72,112,223,0.2)" border="0" />
                                                <button className="send-btn clickable" style={{
                                                    fontVariationSettings:"'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                                    height:"100%"
                                                    }} 
                                                    onClick={() => sendTextMessage(textMessage, user, currentChat._id, sendTextMessage)}
                                                    >
                                                    <span className="material-symbols-outlined">
                                                        send
                                                    </span>
                                                </button>
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </main>
            </>
        );
    };

    export default Chatview;
