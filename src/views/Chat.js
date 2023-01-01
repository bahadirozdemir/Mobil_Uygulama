import { StyleSheet, Text, View, ScrollView,Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { List, Avatar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import Loading from '../utils/Loading';
import moment from 'moment';
const Chat = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [chatnumarasi, setChatNumarasi] = useState([])
  const [bilgiler, setBilgiler] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const [sonmesaj, setsonmesaj] = useState([])
  const [tarihler, settarihler] = useState([])
  useEffect(() => {
    setisLoading(true);
     firestore().collection("chat").onSnapshot(konusmalar => {
      setBilgiler([]);
      setChatNumarasi([]);
      konusmalar.forEach(async (element) => {
        if(element.data().mesajlar != "")
        {

        if (element.data().kisi1 == user.uid || element.data().kisi2 == user.uid) {
          setChatNumarasi(chatnumarasi => [element.id, ...chatnumarasi]);
  
          setsonmesaj(sonmesaj =>[element.data().mesajlar[0],...sonmesaj]);
          let a=moment(new Date().getFullYear()+"-"+(new Date().getMonth() + 1) + "-" +(new Date().getDate()))
          let b=moment(new Date(element.data().mesajlar[0].createdAt.seconds  * 1000).toISOString().split('T')[0])
          let gunsayisi =a.diff(b,"days"); 
          if(gunsayisi==0)
          {
            gunsayisi="Bugün"
          }
          else if(gunsayisi % 7 == 0)
          {
             gunsayisi = (gunsayisi / 7)+" hafta önce";
          }
          else if(gunsayisi % 30 == 0)
          {
            gunsayisi = (gunsayisi / 30)+" ay önce";
          }
          else if(gunsayisi % 1 == 0)
          {
            gunsayisi = (gunsayisi / 1)+" gün önce";
          }
          settarihler(tarihler =>[gunsayisi,...tarihler]);  
          if (element.data().kisi1 != user.uid) {
           await firestore().collection("users").doc(element.data().kisi1).get().then(veriler => {
              setBilgiler(bilgiler => [veriler.data(), ...bilgiler]);
            });
          }
          else {
           await firestore().collection("users").doc(element.data().kisi2).get().then(veriler => {
              setBilgiler(bilgiler => [veriler.data(), ...bilgiler]);
            });
          }
        }
                  
      }
      });
      setTimeout(() => {
        setisLoading(false);
      }, 1500);
    })
  
    
  }, [])
  if (isLoading == true) {
    return <Loading />
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (

    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        { bilgiler.length == 0 ?<View style={{width:windowWidth,height:windowHeight,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:25,fontWeight:"bold"}}>Sohbetiniz Bulunmuyor.</Text></View> : 
            bilgiler.map((element,value) => (
            <List.Item
              key={value}
              onPress={() => { navigation.navigate('Messages',{chatid:chatnumarasi[value]})}}
              style={{ marginLeft: 12 }}
              title={element.Name +" "+ element.Surname}
              description={sonmesaj[value].text + ' ● ' +tarihler[value]}
              left={props => <Avatar.Image size={55} source={{uri:element.Photo}} />}
            />
            
          )) 
        }
       
      </ScrollView>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})