import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { baseUrl, postRequest } from "../util/services";
import Login from "../pages/Login";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Khởi tạo người dùng từ localStorage nếu nó tồn tại
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        phoneNumber: "",
        password: "",
    });

    const navigate = useNavigate();  // Khởi tạo useNavigate

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async(e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response);
        }

        // Đăng ký thành công
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);

        // Chuyển hướng người dùng đến trang chat
        navigate("/");
    }, [registerInfo, navigate]); // Thêm navigate vào dependency array

    const loginUser = useCallback(async (loginData) => {
        // Send login request to server
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginData));
    
        if (response.error) {
            // If there is an error, return the error message
            return response.error;
        }
    
        // If login is successful, save user data to local storage and set user state
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        return null;  // No error
    }, []);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login"); // Quay lại trang login khi người dùng logout
    }, [navigate]);

    return (
        <AuthContext.Provider 
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
