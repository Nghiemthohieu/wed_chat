import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ChatScreen from '../screen/ChatScreen';
import Chatview from '../components/Chatview';
import { ChatContextProvider } from '../context/ChatContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

enableScreens();

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { user } = useContext(AuthContext);
    return ( 
        <ChatContextProvider user={user}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chatview" component={Chatview} options={{ headerShown: false }} />
          </Stack.Navigator>
        </ChatContextProvider>
    );
}
 
export default Navigation;