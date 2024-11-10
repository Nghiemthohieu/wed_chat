import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState("");  // Thêm state cho "Nhập lại mật khẩu"
    const [passwordError, setPasswordError] = useState(null);    // State cho lỗi khớp mật khẩu

    // Hàm kiểm tra và xử lý đăng ký
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kiểm tra xem mật khẩu và nhập lại mật khẩu có khớp không
        if (registerInfo.password !== confirmPassword) {
            setPasswordError("Mật khẩu và Nhập lại mật khẩu không khớp");
            return;
        }
        
        // Nếu khớp, xóa thông báo lỗi và thực hiện đăng ký
        setPasswordError(null);
        registerUser(e);
    };

    return (
        <div className="wrapper-page is-only-desktop">
            <div className="zLogin-layout">
                <div className="header animated fadeIn">
                    <h1>
                        <a className="logo" style={{ cursor: 'auto' }}></a>
                    </h1>
                </div>
                <div className="body">
                    <div></div>
                    <div className="zcard body-container show-pc-banner">
                        <div className="zcard-head">
                            <div className="zcard-head-wrapper">
                                <div className="zcard-head-title">
                                    <p style={{ margin: 0, textAlign: 'center' }}>Đăng ký tài khoản</p>
                                </div>
                            </div>
                        </div>
                        <div className="zcard-body" style={{ padding: '12px' }}>
                            <form onSubmit={handleSubmit} className="form-signin" style={{ maxWidth: '400px', margin: 'auto' }}>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">phone_iphone</span>
                                    <input
                                        id="input-phone"
                                        tabIndex="1"
                                        type="tel"
                                        name="phone_num"
                                        autoComplete="off"
                                        placeholder="Số điện thoại"
                                        className="input"
                                        onChange={(e) => updateRegisterInfo({ ...registerInfo, phoneNumber: e.target.value })}
                                    />
                                </div>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">person</span>
                                    <input
                                        id="input-name"
                                        tabIndex="2"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Tên hiển thị"
                                        className="input"
                                        onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                                    />
                                </div>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">lock</span>
                                    <input
                                        tabIndex="3"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        autoComplete="off"
                                        onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                                    />
                                </div>
                                <div className="line-form has-ico">
                                    <span className="material-symbols-outlined left-5 icon">lock</span>
                                    <input
                                        tabIndex="4"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        autoComplete="off"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {/* Hiển thị thông báo lỗi nếu mật khẩu không khớp */}
                                {passwordError && (
                                    <em className="error">{passwordError}</em>
                                )}
                                {registerError?.error && (
                                    <em className="error">{registerError?.message}</em>
                                )}
                                <div className="space"></div>
                                <div className="textAlign-center has-2btn">
                                    <button
                                        type="submit"
                                        tabIndex="5"
                                        className="btn-login btn--m block first"
                                        disabled={isRegisterLoading}
                                    >
                                        {isRegisterLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản mới"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
