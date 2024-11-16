import React, { useContext, useState } from "react";
import { Text, SafeAreaView, View, TextInput, StyleSheet, Image, TouchableOpacity , StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import ChatUser from "../components/ChatUser";
import { ScrollView } from "react-native";

const ChatScreen = () => {
    const {potentialChats, createChat , userChats, isUserChatsLoading} = useContext(ChatContext);
    const {user} = useContext(AuthContext);
    const {onlineUsers} = useContext(ChatContext);
    const [selectedTab, setSelectedTab] = useState('comment'); // Mặc định chọn 'comment'
    const navigation = useNavigation(); // Khởi tạo hook navigation

    // Hàm xử lý khi một tab được chọn
    const handleSelectTab = (tab) => {
        setSelectedTab(tab);
    };

    const handleChatview = (chat) => {
        console.log('Navigating to Chatview with chat:', chat);
        updateCurrentChat(chat);
        navigation.replace('Chatview');
      };

      const handleLogOut= () =>{
        navigation.replace('Login');
      }

    return (
        <SafeAreaView style={styles.container}>
            {userChats?.length<-1 ? null : (
                <View>
                    <StatusBar barStyle="light-content" backgroundColor={'#1b7af9'} />
                    <View style={styles.header}>
                        <View style={styles.search}>
                            <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Tìm kiếm"
                                placeholderTextColor="#d1d2d3"
                            />
                        </View>
                    </View>

                    <View style={styles.body}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {isUserChatsLoading && <Text>loading chats...</Text>}
                        {userChats && userChats.map((chat, index) => (
                            <TouchableOpacity key={index}>
                                <ChatUser chat={chat} user={user} />
                            </TouchableOpacity>
                        ))}
                        {potentialChats && potentialChats.map((u, index) => (
                            <TouchableOpacity style={styles.msgItem} key={index} onPress={() => createChat(user._id, u._id)}>
                                <View style={styles.avatar}>
                                    <Image
                                        source={{ uri: 'https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg' }}
                                        style={styles.Image}
                                    />
                                    <View style={onlineUsers?.some((user) => user?.UserId === u?._id) ? styles.onlineUsers : ''}></View>
                                </View>
                                <View style={styles.TextItem}>
                                    <View style={styles.headerItem}>
                                        <View style={styles.nameItem}>
                                            <Text style={styles.nameItemText}>{u.name}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                        </ScrollView>
                    </View>
                    <View style={styles.footer}>
                        <View style={selectedTab === 'comment' ? styles.selected : null}>
                            <Icon
                                name="comment"
                                size={20}
                                color={selectedTab === 'comment' ? '#1E90FF' : '#000'}
                                style={styles.icon}
                                onPress={() => handleSelectTab('comment')}
                            />
                            {selectedTab === 'comment' && <Text style={styles.label}>Tin nhắn</Text>}
                        </View>
                        <View style={selectedTab === 'address-book' ? styles.selected : null}>
                            <Icon
                                name="address-book"
                                size={20}
                                color={selectedTab === 'address-book' ? '#1E90FF' : '#000'}
                                style={styles.icon}
                                onPress={() => handleSelectTab('address-book')}
                            />
                            {selectedTab === 'address-book' && <Text style={styles.label}>Danh bạ</Text>}
                        </View>
                        <View style={selectedTab === 'th' ? styles.selected : null}>
                            <Icon
                                name="th"
                                size={20}
                                color={selectedTab === 'th' ? '#1E90FF' : '#000'}
                                style={styles.icon}
                                onPress={() => handleSelectTab('th')}
                            />
                            {selectedTab === 'th' && <Text style={styles.label}>Khám phá</Text>}
                        </View>
                        <View style={selectedTab === 'clock-o' ? styles.selected : null}>
                            <Icon
                                name="clock-o"
                                size={20}
                                color={selectedTab === 'clock-o' ? '#1E90FF' : '#000'}
                                style={styles.icon}
                                onPress={() => handleSelectTab('clock-o')}
                            />
                            {selectedTab === 'clock-o' && <Text style={styles.label}>Nhật ký</Text>}
                        </View>
                        <TouchableOpacity onPress={handleLogOut}>
                            <Icon
                                name="arrow-right"
                                size={20}
                                color={selectedTab === 'user' ? '#1E90FF' : '#000'}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position:'absolute',
        width: '100%',
        zIndex:9999,
        backgroundColor: '#1E90FF',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        padding: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    body: {
        paddingTop:50,
        paddingBottom:49,
    },
    msgItem:{
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        height:76,
    },
    avatar:{},
    Image: {
        height:45,
        width:45,
        borderRadius: 100,
    },
    TextItem: {
        paddingLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        width:'100%',
    },
    headerItem:{
        width:'100%',
        paddingBottom:5,
    },
    nameItem:{},
    nameItemText:{
        fontWeight:'bold',
    },  
    dateItem:{
        position:'absolute',
        right:45,
    },
    dateItemText:{
        fontSize:12,
        fontWeight:'400',
        color:'#ccc',
    },
    Message: {
        marginTop:5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MessageText:{},
    Notification: {
        backgroundColor:'#FFF',
        marginLeft:4,
        paddingTop:2,
        paddingBottom:2,
        paddingLeft:4,
        paddingRight:4,
        borderRadius:100,
        height:22,
    },
    NotificationText: {
        fontSize: 12,
        color:'#e50000',
        fontWeight:'bold',
    },
    footer:{
        position:'absolute',
        bottom:0,
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        borderTopWidth:1,
        borderTopColor:'#ccc',
        width:'100%',
        height:50,
        zIndex:9999,
    },
    icon:{
        padding:4,
    },
    label:{
        fontSize:12,
        fontWeight:'bold',
        color:'#1E90FF',
    },
    selected:{
        alignItems:'center',
    },
    onlineUsers:{
        position:'absolute',
        height: 12,
        width:12,
        borderRadius:10,
        backgroundColor:'#24832c',
        bottom:10,
        right:4,
    },
});
