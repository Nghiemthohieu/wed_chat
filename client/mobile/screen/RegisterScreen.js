import React, { useContext, useState, useCallback } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../context/AuthContext"; 
import { useNavigation } from '@react-navigation/native'; // Dùng useNavigation để truy cập navigation

const RegisterScreen = () => {
    const navigation = useNavigation(); // Thêm navigation
    const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState("");  
    const [passwordError, setPasswordError] = useState(null);  

    // Handle form submission and validation
    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và nhập lại mật khẩu
        if (registerInfo.password !== confirmPassword) {
            setPasswordError("Mật khẩu và Nhập lại mật khẩu không khớp");
            return;
        }

        // Nếu mật khẩu hợp lệ, xóa lỗi và tiến hành đăng ký
        setPasswordError(null);
        registerUser(e);
    }, [registerInfo, confirmPassword, registerUser]);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Login'); // Or any screen you want to navigate to
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={'#1b7af9'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.headerItem}><Icon name="arrow-left" size={20} color="#fff" style={styles.icon} /></TouchableOpacity>
                <Text style={styles.headerText}>Đăng ký</Text>
            </View>

            {/* Input Username */}
            <TextInput
                style={[styles.input, registerInfo.name ? styles.inputFocused : null]}
                placeholder="Tên đăng nhập"
                value={registerInfo.name}
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, name: text })}
            />

            {/* Input Phone Number */}
            <TextInput
                style={[styles.input, registerInfo.phoneNumber ? styles.inputFocused : null]}
                placeholder="Số điện thoại"
                value={registerInfo.phoneNumber}
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, phoneNumber: text })}
            />

            {/* Input Password */}
            <TextInput
                style={[styles.input, registerInfo.password ? styles.inputFocused : null]}
                placeholder="Nhập mật khẩu"
                secureTextEntry
                value={registerInfo.password}
                onChangeText={(text) => updateRegisterInfo({ ...registerInfo, password: text })}
            />

            {/* Input Confirm Password */}
            <TextInput
                style={[styles.input, confirmPassword ? styles.inputFocused : null]}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}  
            />

            {/* Show password mismatch error if any */}
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

            {/* Show registration error if any */}
            {registerError && <Text style={styles.errorText}>{registerError}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isRegisterLoading}>
                <Text style={styles.buttonText}>
                    <Icon name="arrow-right" size={20} color="#fff" style={styles.icon} />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    padding: 10,
    alignItems: 'center',
  },
  headerItem: {
    paddingRight: 20,
  },
  headerText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputFocused: {
    borderBottomColor: '#1E90FF',
  },
  button: {
    backgroundColor: '#1E90FF',
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegisterScreen;
