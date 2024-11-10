import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import {ChatContextProvider} from './context/ChatContext';

function App() {
    const { user } = useContext(AuthContext); // Lấy trạng thái người dùng từ AuthContext

    return (
        <ChatContextProvider user={user}>
            <Routes>
                {/* Nếu người dùng tồn tại, hiển thị Chat, nếu không hiển thị Login */}
                <Route path="/" element={user ? <Chat /> : <Login />} />
                <Route path="/register" element={user ? <Chat /> : <Register />} />
                <Route path="/login" element={user ? <Chat /> : <Login />} />
                {/* Chuyển hướng tất cả các đường dẫn khác về trang chính, nếu không đăng nhập, sẽ hiển thị Login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ChatContextProvider>
    );
}

export default App;
