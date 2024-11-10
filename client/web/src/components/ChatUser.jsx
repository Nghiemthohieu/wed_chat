import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import avarter from "../../Image/avatar_trang_1_cd729c335b.jpg";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";
import { unreadNotificationsFunc } from "../util/unreadNotificationsFunc";
import { useFetchLatestMessage } from "../hooks/useFetchLatestMessage";
import moment from "moment";

const ChatUser = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const {onlineUsers, notifications, markAllNotificationsAsRead} = useContext(ChatContext);
    const {latestMessage} = useFetchLatestMessage(chat);
    const isOnline = onlineUsers?.some((user) => user?.UserId === recipientUser?._id);
    
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        (n) => n.senderId  === recipientUser?._id
    )

    const truncateText = (text) =>{
        let shortText = text.substring(0,20);

        if(text.length> 20){
            shortText = shortText +  "..."
        }

        return shortText;
    }
    return ( 
    <>
        <div className="msg-item"  data-id="div_TabMsg_ThrdChItem" style={{ height: '74px', width: '100%' }} onClick={()=>{
            if(thisUserNotifications?.length !== 0){
                markAllNotificationsAsRead(
                    thisUserNotifications,
                    notifications
                )
            }
        }}>
            <div className="gridv2 conv-item conv-rel lv-2 fluid tiny grid-fluid-8" style={{ gap: '0px', gridTemplateColumns: '60px auto 1px 42px' }}>
                <div className="flx flx-center conv-item__avatar grd-ava lv-2 grid-item">
                    <div className="rel zavatar-container conversationList__avatar">
                        <div className="zavatar zavatar-l zavatar-single flx flx-al-c flx-center rel disableDrag clickable zavatar-4">
                            <img draggable="false" src={avarter} className="a-child" alt="Avatar" />
                            <div className={`z-noti-badge --big --counter --noti-enable --anchor --top-right leftbar-unread-badge ${isOnline ? "" : "hidden"}`}
                            >
                                <i className="fa-5_Plus_24_Line z-noti-badge-content"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="conv-status grid-item"></div>
                <div className="conv-item-title__name truncate grid-item fw16">
                    {/* <span className="material-symbols-outlined community__conv-indicator">groups</span> */}
                    <div className="truncate">{recipientUser?.name}</div>
                </div>
                <div className="conv-item-title__more rel grid-item" style={{ overflow: 'visible', lineHeight: '21px', transition: 'none' }}>
                    <div className="flx flx-al-c" style={{ width: 'fit-content', opacity: 1 }}>
                        <div className="flx flx-center">
                            <span className="preview-time --b">
                                <span>{moment(latestMessage?.createdAt).calendar()}</span>
                            </span>
                        </div>
                    </div>
                    <div id="conv-title-action" className="flx flx-al-c absolute" style={{ width: 'fit-content', top: '0px', right: '0px', opacity: 0, transitionDelay: '0ms' }}>
                        <div className="z--btn--v2 btn-tertiary-neutral small conv-action__menu-v2 --rounded icon-only" data-disabled data-translate-title="Thêm" title="Thêm">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </div>
                    </div>
                </div>
                <div className="conv-item-body flx flx-al-c truncate grid-item">
                    <div className="conv-item-body__main truncate flx flx-al-c w100">
                        <div className="conv-message truncate unread">
                            <div className="truncate flx fw14" style={{ alignItems: 'center' }}>
                                {/* <div className="conv-dbname truncate" style={{ marginRight: '4px' }}>
                                    Lan Anh:
                                </div> */}
                                <div className="truncate">
                                {
                                    latestMessage?.text && (
                                        <span>{truncateText(latestMessage?.text)}</span>
                                    )    
                                } 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="conv-item-body__action hasOption grid-item">
                    <div className="conv-action__unread-v2 flx flx-al-c">
                        <div className={`z-noti-badge --big --counter --noti-enable ${thisUserNotifications?.length > 0 ? "" : "hidden"}`}>
                            <i className={`fa-5_Plus_24_Line z-noti-badge__content --big `}> 
                                {thisUserNotifications?.length>0 ? thisUserNotifications.length : ""}
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
     );
}
 
export default ChatUser;