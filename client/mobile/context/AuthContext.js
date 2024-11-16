import React, { createContext, useCallback, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { baseUrl, getRequest, postRequest } from "../util/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        phoneNumber: "",
        password: "",
    });

    const navigation = useNavigation();

    // Lấy thông tin người dùng từ AsyncStorage khi khởi tạo
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const savedUser = await AsyncStorage.getItem("user");
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Failed to load user from AsyncStorage", error);
            }
        };
        fetchUser();
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
    
        try {
    
            const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
            
            setIsRegisterLoading(false);
    
            if (response.error) {
                setRegisterError(response.message || "An error occurred during registration.");
                return;  // Dừng lại nếu có lỗi
            }
    
            // Đăng ký thành công
            await AsyncStorage.setItem("user", JSON.stringify(response));
            setUser(response);
    
            // Chuyển hướng người dùng đến trang chat
            navigation.navigate("Chat");
        } catch (error) {
            setIsRegisterLoading(false);
            setRegisterError("An error occurred during registration.");
            console.error("Error during registration:", error);  // Ghi lại lỗi
        }
    }, [registerInfo, navigation]);

    const loginUser = useCallback(async (loginData) => {
        console.log("LoginData: ", loginData);
        // Send login request to server
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginData));
        console.log("API response:", response);
        if (response.error) {
            // If there is an error, return the error message
            return response.error;
        }
    
        // If login is successful, save user data to local storage and set user state
        AsyncStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        return null;  // No error
    }, []);

    const logoutUser = useCallback(async () => {
        try {
            await AsyncStorage.removeItem("user");
            setUser(null);
            navigation.navigate("Login");
        } catch (error) {
            console.error("Failed to logout", error);
        }
    }, [navigation]);

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
