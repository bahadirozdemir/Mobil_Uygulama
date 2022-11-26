import { View,Dimensions,Text, StyleSheet, ImageBackground,Image} from 'react-native'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import SelectList from 'react-native-dropdown-select-list';
import FontAwo from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Lottie from 'lottie-react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import uuid from 'react-native-uuid';

const MyDocs = () => {
  const [currentuser, Setcurrentuser] = useState({});
  const { user } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  const [List, Setlist] = useState([]);
  const usercoll = firestore().collection("users");
  let dizi = [];
  let whilecheck = true;
  let check = 0;
  const imagez = [
  require('../assets/Z.png'),
  "https://www.arabahabercisi.com/wp-content/uploads/2020/03/en-pop%C3%BCler-10-araba.jpg", 
  "https://www.cumhuriyet.com.tr/Archive/2021/11/29/1888598/kapak_112247.jpg", 
  "https://www.webtekno.com/images/editor/default/0003/57/9ce42e70b9055cc2f5dde463543ca948fb7848b4.jpeg" 
]; 
  let x = [{

    ilanBaslik: "Merhaba Aracım Tamamen Temizdir.",
    ilanBegeni: "250",
    ilanid: "",
    ilanyapan: "",
    ilanyapanid:"",
    Begenenler: [],
    Yorumlar: []
  }]
  useEffect(() => {
    firestore().collection('users').doc(user.uid).onSnapshot(documentSnapshot => {
      Setcurrentuser(documentSnapshot.data());
    })
  }, [])
  const gonder = () => {
    let unique = uuid.v4();
    let ilandizisi = [];
    firestore().collection("ilanlar").get().then(result => {
      result.forEach(element => {
        ilandizisi = element.data().userilan;
      });
    })
    while (whilecheck) {
      ilandizisi.forEach(dizim => {
        if (dizim.ilanid == unique) {
          check++;
          unique = uuid.v4();
        }

      })
      if (check == 0) {
        x[0].ilanid = unique;
        x[0].ilanyapan = currentuser.Name + " " + currentuser.Surname;
        x[0].ilanyapanid = user.uid;
        whilecheck = false;
      }
      check = 0;
    }

    let checkuser = false;
    firestore().collection("ilanlar").get().then(veriler => {
      veriler.forEach(element => {
        if (user.uid == element.id) {
          checkuser = true;
          firestore().doc("ilanlar/" + user.uid).update({
            userilan: firestore.FieldValue.arrayUnion(...x)
          }).then(result => {
            console.log("Update Edildi")
          })
        }
      })
      if (checkuser == false) {
        firestore().doc("ilanlar/" + user.uid).set({
          userilan: firestore.FieldValue.arrayUnion(...x)
        }).then(result => {
          console.log("Sıfırdan Eklendi")
        })
      }
    })
    console.log("Döngü Kırıldı Hasan Abi");
    whilecheck = true;
  }
  return (
  
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start"}}>   
      <View style={styles.header}><View style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}><Lottie source={require('../assets/122835-handshake.json')} style={{ width: 100, height: 100 }} autoPlay loop /></View><View style={{ width: "80%", justifyContent: "center", alignItems: "flex-start", height: "100%" }}><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Sahibinden.com</Text></View></View>
      <View style={{width:"100%",height:"44%",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <View style={{width:"100%",height:"20%",flexDirection:"row"}}>
      <View style={{width:"80%",height:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:"#3c92bc"}}><View style={{flexDirection:"column",width:"100%",height:"100%",justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontSize:18,color:"white"}}> Merhaba {currentuser.Name}</Text><Text style={{fontSize:13,color:"white"}}>  Üye</Text></View></View>
      <View style={{width:"20%",height:"100%",backgroundColor:"#2E8BE7",justifyContent:"center",alignItems:"center"}}><FontAwo name="medal" size={22} color="yellow" /></View>
      </View>
      <SwiperFlatList
      autoplay
      autoplayDelay={7}
      autoplayLoop
      index={0}
      autoplayLoopKeepAnimation={true}
      data={imagez}
      renderItem={({ item,index }) => (
        <View style={{width:width}}>
          <ImageBackground source={index==0 ? item  : {uri:item}} resizeMode="cover" style={{ width: "100%", height: "100%"}} />
        </View>
      )}
    />
    
      </View>
      
    <View style={{width:"100%",justifyContent:"center",alignItems:"center",height:"37%",flexDirection:"row",padding:12,flexWrap:"wrap"}}>
   
    <View style={{width:"96%",height:"15%",justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontSize:20}}>Kategoriler</Text></View>
      <View style={{marginRight:8,width:"30%",backgroundColor:"white",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5,height:"50%",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
        <View><Image style={{width:70,height:70}} source={require('../assets/washing-machine.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Beyaz Eşya</Text>
      </View>
      
      <View style={{width:"30%",backgroundColor:"#e9e9e9",height:"50%",backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5}}>
      <View><Image style={{width:70,height:70}} source={require('../assets/car.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Araba</Text>
      </View>
      <View style={{marginLeft:8,marginBottom:8,width:"33%",backgroundColor:"white",height:"50%",borderRadius:10,justifyContent:"center",alignItems:"center",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5}}>
      <View><Image style={{width:70,height:70}} source={require('../assets/phone.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Cep Telefonu</Text>
      </View>
      <View style={{marginRight:8,width:"30%",backgroundColor:"white",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5,height:"50%",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
        <View><Image style={{width:70,height:70}} source={require('../assets/computer.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Bilgisayar</Text>
      </View>
      <View style={{width:"30%",backgroundColor:"#e9e9e9",height:"50%",backgroundColor:"white",borderRadius:10,justifyContent:"center",alignItems:"center",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5}}>
      <View><Image style={{width:70,height:70}} source={require('../assets/giyim.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Giyim</Text>
      </View>
      <View style={{marginLeft:8,marginBottom:8,width:"33%",backgroundColor:"white",height:"50%",borderRadius:10,justifyContent:"center",alignItems:"center",shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation:5}}>
      <View><Image style={{width:70,height:70}} source={require('../assets/gym.png')}/></View>
        <Text style={{fontSize:15,fontWeight:"bold"}}>Spor Aletleri</Text>
      </View>
       
      
      
    </View>
   
    </View>
   
  )
}


export default MyDocs

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#f7e401",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
 
  
})