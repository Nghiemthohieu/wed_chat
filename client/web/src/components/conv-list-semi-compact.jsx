import React from 'react';
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import avarter from "../../Image/avatar_trang_1_cd729c335b.jpg";
import { useContext } from "react";
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";
import ChatUser from './ChatUser';

const ConvListSemiCompact = () => {
    const {potentialChats, createChat , updateCurrentChat, userChats, isUserChatsLoading} = useContext(ChatContext);
    const {user} = useContext(AuthContext);
    const {onlineUsers} = useContext(ChatContext);
    
    return (
        <div className="conv-list-semi-compact">
            <div id="contact-search">
                <div className="group-search grid-item">
                    <div>
                        <div style={{ top: '40px', left: '-1px', position: 'absolute', pointerEvents: 'none' }}></div>
                        <span className="material-symbols-outlined btn group-search__icon">search</span>
                    </div>
                    <span className="flx-al-c fake-textholder truncate fk-normal" style={{ display: 'flex', height: '90%' }}>Tìm kiếm</span>
                    <input
                        id="contact-search-input"
                        autoComplete="off"
                        aria-autocomplete="list"
                        tabIndex="-1"
                        maxLength="100"
                        type="text"
                        data-id="txt_Main_Search"
                    />
                </div>
                <div className="icon-only" title="Thêm bạn">
                    <span className="material-symbols-outlined">person</span>
                </div>
                <div className="icon-only" title="Tạo nhóm chat">
                    <span className="material-symbols-outlined">group_add</span>
                </div>
            </div>
            <div className="flx flx-col flx-1 h0" style={{ opacity: 1 }}>
                <div className="msg-filters-bar flx flx-al-c ver3">
                    <div className="w100 h100 flx flx-col">
                        <div className="flx flx-al-c tab-main w100 rel small border-bottom" style={{ padding: '0px 16px' }}>
                            <div className="h100 tab-item selected">
                                <div className="z-noti-badge-container">
                                    <div className="tab-text">Tất cả</div>
                                </div>
                            </div>
                            <div className="h100 tab-item">
                                <div className="z-noti-badge-container">
                                    <div className="tab-text">Chưa đọc</div>
                                </div>
                            </div>
                            <div className="flx-1"></div>
                            <div style={{ width: 'fit-content', maxWidth: '100%' }}>
                                <div className="flx flx-al-c filter-preview-v2 label-filter-preview">
                                    <div className="flx">
                                        <div>Phân loại</div>
                                    </div>
                                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                </div>
                            </div>
                            <div className="z--btn--v2 btn-tertiary-neutral small margin-left-4 --full-rounded icon-only margin-left-4">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w100 h100 web" tabIndex="999" style={{ position: 'relative', display: 'block', flex: '2 1 0%' }}>
                    <div style={{ overflow: 'visible', height: '0px', width: '0px' }}>
                        <div className="virtualized-scroll" style={{ position: 'relative', overflow: 'hidden', width: '344px', height: '608px' }}>
                            <div style={{ position: 'absolute', inset: '0px', marginRight: '-6px', marginBottom: '-6px' }}>
                                <div
                                    aria-label="grid"
                                    className="ReactVirtualized__Grid ReactVirtualized__List"
                                    id="conversationList"
                                    role="grid"
                                    style={{
                                        boxSizing: 'border-box',
                                        direction: 'ltr',
                                        height: '608px',
                                        position: 'absolute',
                                        width: '344px',
                                        willChange: 'transform',
                                    }}
                                >
                                    <div className="ReactVirtualized__Grid__innerScrollContainer" style={{ width: 'auto', height: '608px', maxWidth: '344px', maxHeight: '2146px', overflow: 'auto', position: 'relative' }}>
                                        {isUserChatsLoading && <p>loading chats...</p>}
                                        {Array.isArray(userChats) && userChats.length > 0 ? (
                                            userChats.map((chat, index) => (
                                                <div key={index} onClick={() => updateCurrentChat(chat)}>
                                                    <ChatUser chat={chat} user={user} />
                                                </div>
                                            ))
                                        ) : (
                                            <p>Không có cuộc trò chuyện nào.</p>
                                        )}
                                        {potentialChats && 
                                            potentialChats.map((u, index) => {
                                                return(
                                                    <div className="msg-item" data-id="div_TabMsg_ThrdChItem" style={{ height: '74px', width: '100%' }} key={index} onClick={()=> createChat(user._id, u._id)}>
                                                        <div className="gridv2 conv-item conv-rel lv-2 fluid tiny grid-fluid-8" style={{ gap: '0px', gridTemplateColumns: '60px auto 1px 42px' }}>
                                                            <div className="flx flx-center conv-item__avatar grd-ava lv-2 grid-item">
                                                                <div className="rel zavatar-container conversationList__avatar">
                                                                    <div className="zavatar zavatar-l zavatar-single flx flx-al-c flx-center rel disableDrag clickable zavatar-4">
                                                                        <img draggable="false" src={avarter} className="a-child" alt="Avatar" />
                                                                        <div className={`z-noti-badge --big --counter --noti-enable --anchor --top-right leftbar-unread-badge ${
                                                                            onlineUsers?.some((user) => user?.UserId === u?._id) ? "" : "hidden"
                                                                            }`}
                                                                        >
                                                                            <i className="fa-5_Plus_24_Line z-noti-badge-content"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="conv-status grid-item"></div>
                                                            <div className="conv-item-title__name truncate grid-item fw16">
                                                                {/* <span className="material-symbols-outlined community__conv-indicator">groups</span> */}
                                                                <div className="truncate">{u.name}</div>
                                                            </div>
                                                            <div className="conv-item-title__more rel grid-item" style={{ overflow: 'visible', lineHeight: '21px', transition: 'none' }}>
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
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="conv-item-body__action hasOption grid-item">
                                                                <div className="conv-action__unread-v2 flx flx-al-c">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="scrollbar-horizontal" style={{ position: 'absolute', height: '6px', right: '2px', bottom: '2px', left: '2px', borderRadius: '3px' }}>
                                <div className="scroll-thumb-horizontal" style={{ position: 'relative', display: 'block', height: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '0px' }}></div>
                            </div>
                            <div className="scrollbar-vertical" style={{ position: 'absolute', width: '6px', right: '2px', top: '2px', bottom: '2px', borderRadius: '3px' }}>
                                <div className="scroll-thumb-vertical" style={{ position: 'relative', display: 'block', width: '100%', cursor: 'pointer', borderRadius: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.2)', height: '0px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvListSemiCompact;
