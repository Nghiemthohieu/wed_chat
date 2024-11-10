// Login.js

import './css/Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Attempt to log in and handle errors
        const loginError = await loginUser({ phoneNumber, password });

        if (loginError) {
            // Set error message if login fails
            setError("Tên đăng nhập hoặc mật khẩu không khớp, vui lòng nhập lại");
        } else {
            // Navigate to the chat page if login is successful
            navigate("/");
        }
    };

    return (
        <div className="wrapper-page is-only-desktop">
            <div className="zLogin-layout">
                <div className="header animated fadeIn">
                    <h1>
                        <a className="logo" style={{ cursor: 'auto' }}></a>
                    </h1>
                    <h2 style={{ fontSize: '1.1em' }}>
                        Đăng nhập tài khoản Zalo
                        <br />
                        để kết nối với ứng dụng Zalo Web
                    </h2>
                </div>
                <div className="body">
                    <div></div>
                    <div className="zcard body-container show-pc-banner">
                        <div className="zcard-head">
                            <div className="zcard-head-wrapper">
                                <div className="zcard-head-title">
                                    <p style={{ margin: 0, textAlign: 'center' }}>
                                        Đăng nhập với mật khẩu
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="zcard-body" style={{ padding: '12px' }}>
                            <form onSubmit={handleLogin} className="form-signin" style={{ maxWidth: '400px', margin: 'auto' }}>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">
                                        phone_iphone
                                    </span>
                                    <input
                                        id="input-phone"
                                        tabIndex="1"
                                        type="tel"
                                        name="phone_num"
                                        autoComplete="off"
                                        placeholder="Số điện thoại"
                                        className="input"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">
                                        lock
                                    </span>
                                    <input
                                        tabIndex="2"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <em className="error">{error}</em>}
                                <div className="space"></div>
                                <div className="textAlign-center has-2btn">
                                    <button type="submit" className="btn-login btn--m block first">
                                        Đăng nhập với mật khẩu
                                    </button>
                                    <div className="btn-wrap-more">
                                        <p style={{ textAlign: 'center', cursor: 'pointer' }}>
                                            Quên mật khẩu
                                        </p>
                                    </div>
                                    <div className="btn-wrap-more">
                                        <p style={{ textAlign: 'center', cursor: 'pointer' }}>
                                            <a href="/register">Đăng ký</a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
