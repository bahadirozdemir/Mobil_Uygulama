import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Animated, Easing, TouchableOpacity, FlatList, StyleSheet, TextInput, ImageBackground, ActivityIndicator,Dimensions } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import Lottie from 'lottie-react-native';
import storage from '@react-native-firebase/storage'
export default PostPage = () => {
  const { user } = useContext(AuthContext);
  const [firstData, setFirstData] = useState([])
  const [Tumilanlar, setTumilanlar] = useState([])
  const [start, setStart] = useState()
  const [sayi, setSayi] = useState(0)
  const [kontrol, setKontrol] = useState(false);
  const [Bos, setBos] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const animationProgress = React.useRef(new Animated.Value(0))
  useEffect(() => {
    firestore().collection("users").doc(user.uid).get().then(async (result) => {
      let gelenilanlar = [];
      for (let index = 0; index < result.data().Takip.length; index++) {
        await firestore().collection("ilanlar").where('ilanyapanid', "==", result.data().Takip[index]).orderBy('ilanTarihiZaman', "desc").limit(1).get().then(dizim => {
          dizim.forEach(async (x) => {
            gelenilanlar.push(x.data());
          })

        })
        if (index == (result.data().Takip.length - 1)) {
          setStart(gelenilanlar[index]);
        }
      }
      setTumilanlar(gelenilanlar);
   
      if (gelenilanlar.length == 0) {
        setBos(true);
        setKontrol(true);
      }
      else {
        setBos(false);
      }

    })

    //  let ilanlar=[];
    //  result.forEach(element=>{
    //     ilanlar.push(element.data());
    //  })
    //  setTumilanlar(ilanlar);
    //  setStart(ilanlar[1].ilanTarihiZaman);

  }, [])
  const postlarigoster = ({ item, index, navigation }) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "#f1f1f1" }}>
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", margin: 15 }}>
          <Card style={{ backgroundColor: "white", width: "90%" }}>
            <Card.Title title={item.ilanyapan} subtitle="1 hafta önce" left={LeftContent} />
            <Card.Content>
              <Title>{item.Marka}</Title>
              <Paragraph>{item.Model}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri:item.Resim1}} />
            <Card.Actions>
              <Button mode="contained">Görüntüle</Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
    )
  }
  const sayfayenile = async () => {
    setrefresh(true);
    setBos(false);
    setKontrol(false);
    setSayi(0);
    firestore().collection("users").doc(user.uid).get().then(async (result) => {
      let gelenilanlar = [];
      let resimler = [];
      for (let index = 0; index < result.data().Takip.length; index++) {
        await firestore().collection("ilanlar").where('ilanyapanid', "==", result.data().Takip[index]).orderBy('ilanTarihiZaman', "desc").limit(1).get().then(dizim => {
          dizim.forEach(async (x) => {
            gelenilanlar.push(x.data());
            
          })

        })
        if (index == (result.data().Takip.length - 1)) {
          setStart(gelenilanlar[index]);
        }
      }
      setTumilanlar(gelenilanlar);
      if (gelenilanlar.length == 0) {
        setBos(true);
        setKontrol(true);
      }
      else {
        setBos(false);
      }

    })
    setrefresh(false);
  }
  const loadMore = () => {
    if (kontrol != true) {
      return (
        <View style={{ backgroundColor: "transparent" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    if (Bos == true) {
      const windowheight  = Dimensions.get('window').height-80;
      return (
        <View style={{width:"100%",height:windowheight, alignItems: "center", justifyContent: "center", backgroundColor: "transparent" }}>
          <Lottie source={require('../assets/116184-sad-money.json')} style={{ width: 200, height: 200 }} autoPlay={true} loop={true} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Takip Ettiğiniz Kullanıcı Bulunmadı.</Text>
        </View>
      )
    }

    else {

      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
          <Lottie source={require('../assets/abc.json')} style={{ width: 100, height: 100 }} autoPlay={true} loop={false} />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Tüm İlanları Gördünüz</Text>
        </View>
      )



    }
  }
  const dataekle = () => {
    if (kontrol != true) {
      firestore().collection("users").doc(user.uid).get().then(async (result) => {
        let gelenilanlar = [];
        let sayac = 0;
        let artan = sayi;
        for (let index = 0; index < result.data().Takip.length; index++) {
          if (Tumilanlar[artan] != undefined) {
            await firestore().collection("ilanlar").where('ilanyapanid', "==", result.data().Takip[index]).orderBy("ilanTarihiZaman", "desc").startAfter(Tumilanlar[artan].ilanTarihiZaman).limit(1).get().then(querySnapshot => {
              querySnapshot.forEach(async (x) => {
                Tumilanlar.push(x.data());
                sayac++;
              })
            })
            artan++
            console.log(artan);    
          }
          else {
            console.log("Döngü Bitti Bütün İlanlar Görüldü.");
          }
        }
        setSayi(artan);
        if (sayac == 0) {
          setKontrol(true);
        }
      })
    }
  }


  return (
   
    <FlatList ListFooterComponent={loadMore} refreshing={refresh} onRefresh={sayfayenile} onEndReached={dataekle} data={Tumilanlar} renderItem={(item, index) => postlarigoster(item, index)} />
  )
}


