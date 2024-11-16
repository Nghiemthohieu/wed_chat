import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { loginUser } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");  // State for phone number
  const [password, setPassword] = useState("");  // State for password
  const [error, setError] = useState("");  // State for error messages

  // Handle login
  const handleLogin = async () => {
    console.log("phoneNumber", phoneNumber); // Check the phone number value
    console.log("password", password); // Check the password value

    // Attempt to login using loginUser function
    const loginError = await loginUser({ phoneNumber, password });
    console.log("loginError: ",loginError);

    if (loginError) {
      setError("Tên đăng nhập hoặc mật khẩu không khớp, vui lòng nhập lại");
    } else {
      navigation.replace('Chat');
    }
  };

  // Handle register redirection
  const handleRegister = () => {
    navigation.replace('Register');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#1b7af9'} />
      <Text style={styles.header}>Đăng Nhập</Text>

      {/* Input Phone Number */}
      <TextInput
        style={[styles.input, styles.inputFocused]}
        placeholder="Nhập số điện thoại"
        value={phoneNumber} // Bind phoneNumber state
        onChangeText={setPhoneNumber} // Use onChangeText for text input
      />

      {/* Input Password */}
      <TextInput
        style={[styles.input, styles.inputFocused]}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        value={password} // Bind password state
        onChangeText={setPassword} // Use onChangeText for text input
      />

      {/* Display error message if any */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Forgot password link */}
      <TouchableOpacity>
        <Text style={styles.Link}>Lấy lại mật khẩu</Text>
      </TouchableOpacity>

      {/* Register link */}
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.Link}>Đăng ký</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    padding: 20,
  },
  header: {
    backgroundColor: '#1E90FF', // Dark blue color
    fontSize: 15,
    marginBottom: 20,
    padding: 10,
    color: '#fff',
    textAlign: 'center',
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
    padding: 10,
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
  icon: {
    color: '#fff',
  },
  Link: {
    paddingBottom: 5,
    color: '#1b7af9',
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default LoginScreen;
