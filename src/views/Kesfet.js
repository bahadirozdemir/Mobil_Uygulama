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
import storage from '@react-native-firebase/storage'
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
  const [Like, setLike] = useState();
  const [refresh, setrefresh] = useState(false);
  const [yenile, setYenile] = useState();
  const [ilankayit, Setilan] = useState(true);
  const [kayitdizi, SetKayitDizi] = useState([]);
  const [yorumsayisi, setYorumsayisi] = useState();
  const [begenicheck, setCheck] = useState();
  const [begenisayisi, setBegeniSayisi] = useState();
  const [ilanFoto, setilanFoto] = useState();
  const [yenilen, setYenilen] = useState(false);
  let temizlen = [];
  let b = [];
  let begeni = false;
  useEffect(() => {
    Setcurrentuser(user.uid);
    setPost([]);
    temizlen = [];
    yorumsay = [];
    begenisay = [];
    begenikontrol = [];
    resimler = [];
    Setloading(true);
    firestore().collection("ilanlar").get().then(async (veriler) => {
      veriler.forEach((element, sayac) => {
        temizlen.push(element.data())
      });
      temizlen.forEach(async (element, i) => {
        await firestore().collection("Yorumlar").doc(element.Yorumlar).get().then(result => {
          uzunluk = result.data().Yorumlar.length;
          yorumsay.push(uzunluk);
        })
        await firestore().collection("Begeniler").doc(element.Begenenler).get().then(result => {
          uzunluk = result.data().Begenenler.length;
          begenisay.push(uzunluk);
          if (result.data().Begenenler.indexOf(user.uid) != -1) {
            begenikontrol.push({ ilanid: element.Begenenler, begenn: true })
          }
          else {
            begenikontrol.push({ ilanid: element.Begenenler, begenn: false });
          }
        })

        const url = await storage().ref("Uploads/" + element.ilanyapanid + "/ilanResimleri/" + element.Begenenler + "/data1").getDownloadURL();
        resimler.push(url);
        if ((temizlen.length - 1) == i) {
          setilanFoto(resimler);
          setCheck(begenikontrol);
          setBegeniSayisi(begenisay);
          setYorumsayisi(yorumsay);
        }
      });
      setPost(temizlen);
      setTimeout(() => {
        Setloading(false);
      }, 1500);
    })

  }, [yenilen])
  const sayfayenile = () => {
    setYenilen(!yenilen);
  }

  if (isloading == true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>

        <Lottie source={require('../assets/93387-car-insurance-offers-loading-page.json')} style={{ width: 500, height: 500 }} autoPlay loop />
        <Text style={{ fontSize: 26 }}>İlanlar Yükleniyor...</Text>
      </View>
    )
  }

  const begen = (item, index) => {
    let begenendizisi = [];
    firestore().collection("Begeniler").doc(item.Begenenler).get().then((result) => {
      if (result.data().Begenenler.length > 0) {
        result.data().Begenenler.forEach((begeniverenler, index) => {
          begenendizisi.push(begeniverenler);
          if (index == (result.data().Begenenler.length - 1)) {
            let a = begenendizisi.indexOf(user.uid);
            if (a != -1) {
              let b = [
                user.uid
              ]
              firestore().collection("Begeniler").doc(item.Begenenler).update({
                Begenenler: firestore.FieldValue.arrayRemove(...b)
              }).then(result => {
                console.log("Kaldırıldı");
                begenikontrol.forEach((element, index) => {
                  if (element.ilanid == item.Begenenler) {
                    begenikontrol[index].begenn = false;
                    begenisayisi[index] = begenisayisi[index] - 1;
                    setBegeniSayisi(begenisayisi);
                    setCheck(begenikontrol);
                    setLike(!Like);
                  }

                })

              })

            }
            else {
              let b = [
                user.uid
              ]
              firestore().collection("Begeniler").doc(item.Begenenler).update({
                Begenenler: firestore.FieldValue.arrayUnion(...b)
              }).then(result => {
                console.log("Beğenildi");
                begenikontrol.forEach((element, index) => {
                  if (element.ilanid == item.Begenenler) {
                    begenikontrol[index].begenn = true;
                    begenisayisi[index] = begenisayisi[index] + 1;
                    setBegeniSayisi(begenisayisi);
                    setCheck(begenikontrol);
                    setLike(!Like);
                  }
                })


              })
            }
          }

        });
      }
      else {
        let b = [
          user.uid
        ]
        firestore().collection("Begeniler").doc(item.Begenenler).update({
          Begenenler: firestore.FieldValue.arrayUnion(...b)
        }).then(result => {
          console.log("Beğenildi");
          begenikontrol.forEach((element, index) => {
            if (element.ilanid == item.Begenenler) {
              begenikontrol[index].begenn = true;
              begenisayisi[index] = begenisayisi[index] + 1;
              setBegeniSayisi(begenisayisi);
              setCheck(begenikontrol)
              setLike(!Like);
            }

          })


        })
      }

    })




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
            }).then(y => {
              console.log("Önceden Kaydedilmiş Update Edildi.");
              SetKayitDizi(dizi);
            })

          }
          else {
            firestore().collection("Kaydedilenler").doc(currentuser).get().then(resultdizi => {
              let verim = resultdizi.data().Kaydet;
              let a = verim.indexOf(ilanveri);
              verim.splice(a, 1);
              firestore().collection("Kaydedilenler").doc(currentuser).update({
                Kaydet: verim
              }).then(u => {
                console.log("İlanı Kaldırıldı");
                SetKayitDizi(verim);
              })
            })
          }
        }
      });
      if (checkm == 0) {


        let dizi = [];
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
    //console.log(begenikontrol);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height - 80;
    //let begenicheck = item.Begenenler.indexOf(currentuser);
    let kayitcheck = kayitdizi.indexOf(item.ilanid);
    //console.log(begenikontrol);
    console.log(ilanFoto);
    return (

      <View style={{ width: windowWidth, height: windowHeight, flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
        {isloading == true ? (<View style={{ backgroundColor: "#252525", opacity: 0.9, width: "100%", height: "100%", position: 'absolute', zIndex: 999, justifyContent: "center", alignItems: "center" }}><Lottie source={require('../assets/125180-loader.json')} style={{ width: 200, height: 200 }} autoPlay loop /></View>) : ""}
        <View style={{ width: "100%", height: "50%",justifyContent:"center",alignItems:"center" }}>
        <ImageBackground source={{ uri:ilanFoto[index] }} resizeMode="cover" style={{width:windowWidth,height:"100%"}} />
        </View>
        <View style={{ marginTop: -30, width: "100%", height: "60%", flexDirection: "row" }}>
          <View style={{ width: "80%", backgroundColor: "#494D5F", borderTopLeftRadius: 30 }}>

            <View style={{ marginLeft: 15, marginTop: 50, width: "100%", height: "15%" }}>
              <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 25, marginBottom: 5 }}>{item.Marka}</Text>
              <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>{item.Model}</Text>
              <View style={{ width: "100%", height: "30%", flexDirection: "row" }}>
                <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>{item.YakitTipi}</Text>
                <Text> </Text>
                <Text> </Text>
                <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>{item.Kilometre} KM</Text>
              </View>
              <Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 20 }}>{item.Fiyat}</Text>
            </View>

          </View>
          <View style={{ width: "20%", backgroundColor: "#494D5F", borderTopRightRadius: 30,borderLeftWidth:1,borderLeftColor:"white"}}></View>
        </View>

        <View style={{ height: "50%", width: "100%", backgroundColor: "white" }}>
          <Text></Text>
        </View>
        <View style={{ width: "15%", position: 'absolute', bottom: 10, right: 1, alignItems: "center", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => {
            begen(item, index)
          }} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ant name={(begenikontrol[index].begenn == true ? "heart" : "hearto")} size={27} color={(begenikontrol[index].begenn == true ? "red" : "#f1f1f1")} /><Text style={{ color: "#f1f1f1" }}>{begenisayisi[index]}</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Yorumlar', item.Yorumlar)} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ev name="comment" size={27} color={"#f1f1f1"} /><Text style={{ color: "#f1f1f1" }}>{yorumsayisi[index]}</Text></View></TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Setilan(!ilankayit);
            İlanKaydet(item.ilanid)
          }} style={{ padding: 5 }}><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}><Ant name={(kayitcheck != -1 ? "plussquare" : "plussquareo")} size={27} color={"#f0f0f0"} /><Text style={{ color: "#f1f1f1" }}>Kaydet</Text></View></TouchableOpacity>
        </View>
        <View style={{ width: "80%", position: 'absolute', bottom: 10, left: 1, flexDirection: "column" }}>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile",{ilanyapan:item.ilanyapanid,ilanid:item.ilanid}) } style={{ padding: 7 }}><Text style={{ color: "#f1f1f1", fontWeight: "bold", fontSize: 16 }}>{item.ilanyapan}</Text></TouchableOpacity>
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