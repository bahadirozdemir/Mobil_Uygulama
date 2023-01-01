import { StyleSheet, Text, View,ActivityIndicator,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState, useCallback, useContext } from 'react'
import { GiftedChat, Actions, SystemMessage, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import Ion from 'react-native-vector-icons/Ionicons'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'

const Messages = ({ route }) => {
    const veriler = route.params;
    const [messages, setMessages] = useState([]);
    const [currentuser, setCurrentUser] = useState([]);
    const { user } = useContext(AuthContext);
    x = (props) => {
        return ( 
          <Send
            {...props}
            containerStyle={styles.sendContainer}
          >
          <Ion name="send" size={25} color="#1c55be" />
          </Send>
        );
      }
    useEffect(() => {
            
            firestore().collection("users").doc(user.uid).get().then(veriler=>{
                setCurrentUser(veriler.data());
            })
            firestore().collection("chat").doc(veriler.chatid).onSnapshot(belge => {
                setMessages(belge.data().mesajlar);
            })
            
    },[])
  
    const onSend = async (newmessage) => {
        await firestore().collection("chat").doc(veriler.chatid).set({
            mesajlar: GiftedChat.append(messages, newmessage)
        }, { merge: true }).then(response => {
        })
    }
    return (
 
        <GiftedChat
            locale='tr'
            placeholder='Bir Mesaj Yazın.' 
            renderSend={x}
            messages={messages.map(x => ({ ...x, createdAt:x?.createdAt.toDate()}))}
            onSend={messages => onSend(messages)}
            user={{
                _id: user.uid,
                avatar:currentuser.Photo,
            }}
            
            
        />
      
      
    )
}

export default Messages

const styles = StyleSheet.create({
    sendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 15,
      },
})