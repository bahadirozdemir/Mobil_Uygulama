import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, FlatList, Dimensions, RefreshControl } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack'
import { Formik } from 'formik';
import * as yup from 'yup';
import SelectList from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import Loading from '../utils/Loading';
import { Avatar, Button, Card, Title, Paragraph, Dialog, Portal, Provider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'


export default Myilanlar = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [ilandizi, setilanDizi] = useState([])
  const [refresh, setrefresh] = useState(false);
  const [er, setError] = useState();
  const [visible, setVisible] = React.useState(false);
  const [modaldizi,setmodaldizi]=useState([]);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const ilanSil = (item) => {
    firestore().collection("ilanlar").doc(item.ilanid).delete().then(() => {
      console.log("Document successfully Removed!");
      for (let index = 0; index < 4; index++) {
        let imageRef = storage().ref('Uploads/' + user.uid + '/ilanResimleri/' + item.ilanid + '/data' + index);
        imageRef.delete().then(() => {
          console.log(index + "Başarılı bir şekilde silindi")
          hideDialog();
        }).catch((e) => console.log(e));
      }
      let ilanbilgilerim = [];
       firestore().collection("ilanlar").where("ilanyapanid","==",user.uid).get().then((response) => {
         response.forEach(element=>{
              ilanbilgilerim.push(element.data());
         })
       }).catch((e) => {
         setError("Henüz Bir İlan Eklemediniz");
       })
       ilanbilgilerim.sort((a,b)=>{
         return b.ilanTarihiZaman-a.ilanTarihiZaman;     
       });
       setilanDizi(ilanbilgilerim);
    }).catch((error) => {
      console.log(error);
    });
  }
  const Gecmisİlanlarim = ({ item, index }) => {
    return (

      <View style={{ flex: 1, alignItems: "center", flexDirection: "column", backgroundColor: "#f1f1f1" }}>
        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", margin: 15, }}>
          <Card style={{ backgroundColor: "white", width: "90%" }}>
            <Card.Content>
              <Title>{item.Marka} {item.Model}</Title>
              <Paragraph style={{ marginBottom: 5 }}>İlan Tarihi : {item.ilanTarihi}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={()=>{setmodaldizi(item);showDialog()}}>Sil</Button>
              <Button mode="contained" onPress={() => console.log('Pressed')}>Görüntüle</Button>
            </Card.Actions>
          </Card>
        </View>
  
      </View>
    )
  }
  hatadizi = [
    { erromessage: "Herhangi bir ilan eklemediniz." }
  ]
  const Hata = ({ item, index }) => {
    const windowHeight = Dimensions.get('window').height - 80;
    return (
      <View style={{ flex: 1, height: windowHeight, alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "#f1f1f1" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{item.erromessage}</Text>
      </View>
    )
  }
  const sayfayenile = async () => {
    let ilanbilgilerim=[];
    setrefresh(true);
    await firestore().collection("ilanlar").where("ilanyapanid","==",user.uid).get().then((response) => {
      response.forEach(element=>{
           ilanbilgilerim.push(element.data());
      })
    }).catch((e) => {
      setError("Henüz Bir İlan Eklemediniz");
      setrefresh(false);
    })
    ilanbilgilerim.sort((a,b)=>{
      return b.ilanTarihiZaman-a.ilanTarihiZaman;     
    });
    setilanDizi(ilanbilgilerim);
    setrefresh(false);
  }
  useEffect(() => {
    const ilanlarigetir=async ()=>
    {
     let ilanbilgilerim = [];
     await firestore().collection("ilanlar").where("ilanyapanid","==",user.uid).get().then((response) => {
        response.forEach(element=>{
             ilanbilgilerim.push(element.data());
        })
      }).catch((e) => {
        setError("Henüz Bir İlan Eklemediniz");
      })
      ilanbilgilerim.sort((a,b)=>{
        return b.ilanTarihiZaman-a.ilanTarihiZaman;     
      });
      setilanDizi(ilanbilgilerim);
    }
    ilanlarigetir();
   
  }, [])
  return (
    <View style={{flex:1}}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "90%", height: 60, justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 15 }}>
          <View style={{ justifyContent: "center", alignItems: "center", width: "10%", height: "100%" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ant name="arrowleft" size={25} color="black" /></TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", width: "85%", height: "100%" }}>
            <Text style={{ color: "black", fontSize: 18 }}>İlanlarım</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", width: "10%", height: "100%" }}>
            <TouchableOpacity onPress={() => navigation.navigate('Addilan')}><Ant name="plus" size={25} color="black" /></TouchableOpacity>
          </View>
        </View>
      </View>
      {ilandizi.length > 0 ? (<FlatList refreshControl={<RefreshControl refreshing={refresh} onRefresh={sayfayenile} />} data={ilandizi} renderItem={(item, index) => Gecmisİlanlarim(item, index)} />) : ""}
      {ilandizi.length == 0 ? (<FlatList refreshControl={<RefreshControl refreshing={refresh} onRefresh={sayfayenile} />} data={hatadizi} renderItem={(item, index) => Hata(item, index)} />) : ""} 
      <Provider>
        <View>
          <Portal>
            <Dialog style={{ backgroundColor: "white" }} visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Uyarı</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Bu İlanı Silmek İstediğinize Emin Misiniz?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={()=>ilanSil(modaldizi)}>Evet</Button>
                <Button onPress={hideDialog}>Hayır</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </View>

  )
}


