import { useContext } from "react";
import { useFetchRecipientUser } from "../hook/useFetchRecipient";
import { ChatContext } from "../context/ChatContext";
import { useFetchLatestMessage } from "../hook/useFetchLatestMessage";
import { unreadNotificationsFunc } from "../util/unreadNotificationsFunc";
import moment from "moment";
import { Text, SafeAreaView, View, TextInput, StyleSheet, Image, TouchableOpacity , StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/core";

const ChatUser = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const {onlineUsers, notifications, markAllNotificationsAsRead, updateCurrentChat} = useContext(ChatContext);
    const {latestMessage} = useFetchLatestMessage(chat);
    const isOnline = onlineUsers?.some((user) => user?.UserId === recipientUser?._id);
    const navigation = useNavigation();

    const handlChatview=(chat)=>{
        if(thisUserNotifications?.length !== 0){ 
            markAllNotificationsAsRead( 
                thisUserNotifications, 
                notifications 
            );
        }
        updateCurrentChat(chat);
        navigation.replace('Chatview');
    }
    
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(
        (n) => n.senderId  === recipientUser?._id
    )

    const truncateText = (text) =>{
        let shortText = text.substring(0,20);

        if(text.length> 20){
            shortText = shortText +  "..."
        }

        return shortText;
    }


    return ( 
        <TouchableOpacity style={styles.msgItem} onPress={()=>{ 
            handlChatview(chat)
        }}>
            <View style={styles.avatar}>
                <Image
                    source={{ uri: 'https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg' }}
                    style={styles.Image}
                />
                <View style={isOnline ? styles.onlineUsers : ''}></View>
            </View>
            <View style={styles.TextItem}>
                <View style={styles.headerItem}>
                    <View style={styles.nameItem}>
                        <Text style={styles.nameItemText}>{recipientUser?.name}</Text>
                    </View>
                    <View style={styles.dateItem}>
                        <Text style={styles.dateItemText}>{moment(latestMessage?.createdAt).calendar()}</Text>
                    </View>
                </View>
                <View style={styles.Message}>
                    <View style={styles.MessageText}>
                        <Text style={{fontWeight:'bold'}}>
                            {latestMessage?.text && (
                                <Text>{truncateText(latestMessage?.text)}</Text>
                            )}
                        </Text>
                    </View>
                    <View style={thisUserNotifications?.length>0 ? styles.Notification : ''}>
                        <Text style={styles.NotificationText}>
                            {thisUserNotifications?.length>0 ? thisUserNotifications.length : "" }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
     );
}
 
export default ChatUser;

const styles = StyleSheet.create({
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
        position: 'absolute',
        right:65,
        backgroundColor:'red',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:100,
    },
    NotificationText: {
        fontSize: 12,
        color:'#fff',
        fontWeight:'bold',
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