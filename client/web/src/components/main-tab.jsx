import { useState } from 'react';
import Login from '../pages/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
const MainTab = () => {
    const {user, logoutUser} =useContext(AuthContext);

    // Khởi tạo state để quản lý tab nào được chọn
    const [selectedTab, setSelectedTab] = useState('messages');

    // Mảng chứa thông tin về các tab
    const tabs = [
        { id: 'messages', title: 'Tin nhắn', icon: 'chat', badge: '5+' },
        { id: 'contacts', title: 'Danh bạ', icon: 'person_book', badge: '2' },
        { id: 'todo', title: 'To-Do', icon: 'check_box', badge: '1' },
    ];

    const navigate = useNavigate(); 

    const handleNavigation = () => {
        navigate('/login'); // Specify the path to navigate to, e.g., '/settings'
    };

    if (!user) {
        navigate('/login');
        return null; // Ngăn chặn việc hiển thị trong khi đang chuyển hướng
    }

    return (
        <div id="main-tab" className="WEB">
            <div>
                <div className="nav-tab-zalo clickable">
                    <div className="zavatar-container clickable">
                        <div className="zavatar zavatar-l clickable" title={user?.name}>
                            <img src="../Image/10ca1b3321a7de4debdd58d28dd3fe2c.jpg" alt="" className="a-child"/>
                        </div>
                    </div>
                </div>
                <div className="nav_tabs_top">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`leftbar-tab clickable ${selectedTab === tab.id ? 'selected' : ''}`}
                            title={tab.title}
                            onClick={() => setSelectedTab(tab.id)} // Chỉ cập nhật khi click vào các tab trong nav_tabs_top
                        >
                            <div className="z-noti-badge-container clickable">
                                <div className="z-noti-badge-container clickable">
                                    <div className="z-noti-badge --big --counter --noti-enable --anchor --top-right leftbar-unread-badge">
                                        <i className="fa-5_Plus_24_Line z-noti-badge-content">{tab.badge}</i>
                                    </div>
                                    <span className="material-symbols-outlined item">
                                        {tab.icon}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="nav-tabs-bottom">
                {/* Các tab ở dưới không có khả năng chuyển đổi select */}
                <div className="leftbar-tab clickable" title="Cloud của tôi">
                    <div className="z-noti-badge-container clickable">
                        <span className="material-symbols-outlined item">
                            cloud
                        </span>
                    </div>
                </div>
                <div className="leftbar-tab clickable" title="Công cụ">
                    <div className="z-noti-badge-container clickable">
                        <span className="material-symbols-outlined item">
                            business_center
                        </span>
                    </div>
                </div>
                <div className="leftbar-tab clickable" title="Cài đặt">
                    <div onClick={logoutUser} className="z-noti-badge-container clickable">
                        <span className="material-symbols-outlined item">
                            settings
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTab;
