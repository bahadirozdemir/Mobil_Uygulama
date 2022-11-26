import { View, Text, ImageBackground, Dimensions, Button, StyleSheet, FlatList, RefreshControl, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather'
import Icones from 'react-native-vector-icons/MaterialIcons'
import Awesome from 'react-native-vector-icons/FontAwesome'
import Ant from 'react-native-vector-icons/AntDesign'
import Ev from 'react-native-vector-icons/Octicons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from '../utils/Loading';
import PageLoading from '../utils/PageLoading'
import Lottie from 'lottie-react-native';
import * as yup from 'yup';
import Commentloading from '../utils/Commentloading'
import { Formik } from 'formik';
import Yorumlar from './Yorumlar'
import UserProfile from './UserProfile'
const Stack = createStackNavigator();

const KesfetScreen = ({ navigation }) => {
  //listViewRef.initialScrollIndex(0);

  const { user } = useContext(AuthContext);
  const [currentuser, Setcurrentuser] = useState(null)
  const [yorumdizi, setYorumlar] = useState([])
  const [postlar, setPost] = useState([])
  const [isloading, Setloading] = useState(true);
  const [ilansahip, setsahip] = useState([])
  const [Like, setLike] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const [yenile, setYenile] = useState();
  const [ilankayit, Setilan] = useState(true);
  const [kayitdizi, SetKayitDizi] = useState([]);
  let temizlen = [];
  let b = [];
  let begeni = false;
  useEffect(() => {
    Setcurrentuser(user.uid);
    setPost([]);
    temizlen = [];
    Setloading(true);
    firestore().collection("ilanlar").get().then(veriler => {
      veriler.forEach(element => {
        element.data().userilan.forEach(x => {
          temizlen.push(x);
        });
      });
      setPost(temizlen);
      setTimeout(() => {
        Setloading(false);
      }, 1500);
    })
  }, [])
  const sayfayenile = () => {
    setPost([]);
    temizlen = [];
    setrefresh(true);
    firestore().collection("ilanlar").get().then(veriler => {
      veriler.forEach(element => {
        element.data().userilan.forEach(x => {
          temizlen.push(x);
        });
      });
      setPost(temizlen);
      setrefresh(false);
    })
  }

  // if (isloading == true) {
  //   return (
  //     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  //     <Lottie source={require('../assets/125180-loader.json')} style={{width:200,height:200}} autoPlay loop />      
  //    </View>
  //   )
  // }

  const begen = (item, index) => {

    const veriyiekle = (item, index) => {
      let ilansahibid;
      firestore().collection("ilanlar").get().then(veriler => {
        veriler.forEach(element => {
          element.data().userilan.forEach(x => {
            if (x.ilanid == item.ilanid) {
              ilansahibid = element.id;
            }
          });

          firestore().doc("ilanlar/" + ilansahibid).get().then(result => {
            result.data().userilan[index].Begenenler = item.Begenenler;
            firestore().doc("ilanlar/" + ilansahibid).update({
              userilan: result.data().userilan
            }).then(result => {
              console.log("update edildi");

            })

          })
        })
      });

    }
    let a = item.Begenenler.indexOf(currentuser);
    if (a != -1) {
      item.Begenenler.splice(a, 1);
      veriyiekle(item, index);
    }
    else {
      item.Begenenler.push(currentuser);
      veriyiekle(item, index);
    }


  }
  const İlanKaydet = (ilanveri) => {
    let checkm = 0;
    firestore().collection("Kaydedilenler").get().then(result => {
      result.forEach(element => {
        if (currentuser == element.id) {
          checkm++;
          let a = element.data().Kaydet.indexOf(ilanveri);
          if (a == -1) {
            let dizi = element.data().Kaydet;
            dizi.push(ilanveri);
            firestore().collection("Kaydedilenler").doc(currentuser).update({
              Kaydet: dizi
            }).then(y=>{
              console.log("Önceden Kaydedilmiş Update Edildi.");
              SetKayitDizi(dizi);
            })

          }
          else {
             firestore().collection("Kaydedilenler").doc(currentuser).get().then(resultdizi=>{
                let verim = resultdizi.data().Kaydet;
                let a=verim.indexOf(ilanveri);
                verim.splice(a,1);
                firestore().collection("Kaydedilenler").doc(currentuser).update({
                  Kaydet:verim
                }).then(u=>{
                  console.log("İlanı Kaldırıldı");
                  SetKayitDizi(verim);
                })
             })
          }
        }
      });
      if (checkm == 0) {
    
     
            let dizi=[];
            dizi.push(ilanveri);
            firestore().collection("Kaydedilenler").doc(currentuser).set({
              Kaydet: dizi
            }).then(x => {
              console.log("Sıfırdan kaydedilen bir ilan ekledik");
              SetKayitDizi(dizi);          
            })
            
      }

    })
  }

  const ilanKesfet = ({ item, index }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height - 80;
    begenisayisi = item.Begenenler.length;
    yorumsayisi = item.Yorumlar.length;
    console.log("geldi");
    let begenicheck = item.Begenenler.indexOf(currentuser);
    let kayitcheck = kayitdizi.indexOf(item.ilanid);
    return (
     
      <View style={{ width: windowWidth, height: windowHeight, flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
        {isloading == true ? (<View style={{ backgroundColor: "#252525", opacity: 0.9, width: "100%", height: "100%", position: 'absolute', zIndex: 999, justifyContent: "center", alignItems: "center" }}><Lottie source={require('../assets/125180-loader.json')} style={{ width: 200, height: 200 }} autoPlay loop /></View>) : ""}

    
        <View style={{ width: "100%", height: "50%", backgroundColor: "#c5cbd9", justifyContent: "center", alignItems: "center" }}>
        
          <ImageBackground source={{ uri: "https://www.otoshops.com/cms/uploads/18/20180829131014/HaberOrtac-180.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center" }} />
         
        </View>
       
        <View style={{ marginTop: -30, width: "100%", height: "60%", flexDirection: "row" }}>
          <View style={{ width: "80%", backgroundColor: "#484a4b", borderTopLeftRadius: 30 }}>
         
            <View style={{ marginLeft: 15, marginTop: 50, width: "100%", height: "15%" }}>
              <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 25 }}>Mercedes C-180</Text>
              <View style={{ width: "100%", height: "50%", flexDirection: "row" }}>
                <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>2022 Model</Text>
                <Text> </Text>
                <Text> </Text>
                <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>65.000 KM</Text>
              </View>
              <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 20 }}>765.000 TL</Text>
            </View>
          
          </View>
          <View style={{ width: "20%", backgroundColor: "#2e2f31", borderTopRightRadius: 30 }}></View>
        </View>
      
        <View style={{ height: "50%", width: "100%", backgroundColor: "white" }}>
          <Text></Text>
        </View>
        <View style={{ width: "15%", position: 'absolute', bottom: 10, right: 1, alignItems: "center", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => {
            setLike(!Like)
            begen(item, index)
          }} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ant name={(begenicheck != -1 ? "heart" : "hearto")} size={27} color={(begenicheck != -1 ? "red" : "#f1f1f1")} /><Text style={{ color: "#f1f1f1" }}>{begenisayisi}</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Yorumlar', { item })} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ev name="comment" size={27} color={"#f1f1f1"} /><Text style={{ color: "#f1f1f1" }}>{yorumsayisi}</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Setilan(!ilankayit);
            İlanKaydet(item.ilanid)}} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ant name={(kayitcheck != -1 ? "plussquare" : "plussquareo")} size={27} color={"#f0f0f0"} /><Text style={{ color: "#f1f1f1" }}>Kaydet</Text></View></TouchableOpacity>
        </View>
        <View style={{ width: "80%", position: 'absolute', bottom: 10, left: 1, flexDirection: "column" }}>
          <TouchableOpacity onPress={()=>{navigation.navigate("UserProfile",item.ilanyapanid)}} style={{ padding: 7 }}><Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>{item.ilanyapan}</Text></TouchableOpacity>
          <View style={{ padding: 7 }}><Text style={{ color: "#f1f1f1", fontSize: 14 }}>{item.ilanBaslik}</Text></View>
        </View>
      </View>
   
    )

  }
  return (
    <View style={styles.container}>

      {postlar.length > 0 ? (<FlatList refreshControl={<RefreshControl refreshing={refresh} onRefresh={sayfayenile} />} data={postlar} renderItem={(item, index) => ilanKesfet(item, index)} pagingEnabled />) : ""}
    </View>
  )


}










export default Kesfet = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen
        name="KesfetScreen"
        component={KesfetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Yorumlar"
        component={Yorumlar}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white" },
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalcontent: {
    backgroundColor: "#161616",
    paddingTop: 12,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
    paddingBottom: 20
  },
  button: {
    backgroundColor: "gray",
  },
  baricon: {
    width: 200,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },


})