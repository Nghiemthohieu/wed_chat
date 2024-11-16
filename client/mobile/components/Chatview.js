import { Text, SafeAreaView, View, TextInput, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFetchRecipientUser } from "../hook/useFetchRecipient";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";

const Chatview = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState(""); // Use useState to manage text message state
    const scroll = useRef();
    const navigation = useNavigation(); // Khởi tạo hook navigation
    const handleChat = () => {
        navigation.replace('Chat');
    };

    useEffect(() => {
        scroll.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return ( 
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={'#1b7af9'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={handleChat} style={styles.headerItem}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{recipientUser?.name}</Text>
            </View>
            <ScrollView ref={scroll} contentContainerStyle={styles.body}>
                {messages && messages.map((msg, index) => (
                    <View key={index} style={msg?.senderId === user?._id?styles.messageContainerEnd:styles.messageContainerStart}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                        <Text style={styles.timeText}>{moment(msg.createdAt).calendar()}</Text>
                    </View>
                ))}
            </ScrollView>
            {/* Phần footer nhập tin nhắn */}
            <View style={styles.footerInput}>
                <TextInput 
                    style={styles.input}
                    placeholder="Tin nhắn" 
                    placeholderTextColor="#d1d2d3"
                    value={textMessage}
                    onChangeText={(text) => setTextMessage(text)}
                />
                <TouchableOpacity 
                    style={styles.sendButton} 
                    onPress={() => {sendTextMessage(textMessage, user, currentChat._id, setTextMessage); setTextMessage("");}}
                    
                >
                    <Icon name="send" size={20} color="#1E90FF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Chatview;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#1E90FF',
        width: '100%',
        zIndex: 9999,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerItem: {
        paddingRight: 10,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    body: {
        marginTop: 60, // Đảm bảo body không bị che khuất bởi header
        paddingHorizontal: 10,
        paddingBottom:120,
    },
    messageContainerStart: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    messageContainerEnd: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    messageText: {
        paddingBottom: 5,
    },
    timeText: {
        fontSize: 8, 
        color: 'gray',
        alignSelf: 'flex-end',
    },
    footerInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 50,
    },
});
