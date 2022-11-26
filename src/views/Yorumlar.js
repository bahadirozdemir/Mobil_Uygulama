import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ant from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider';
import { useContext } from 'react';
import Commentloading from '../utils/Commentloading'
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import Awesome from 'react-native-vector-icons/FontAwesome'
import * as yup from 'yup';


const registerSchema = yup.object().shape(
  {
    yorum: yup.string().required("Yorum Boş Gönderilemez"),
  }
)
export default Yorumlar = ({ route, navigation }) => {
  let begendizi = [];
  const { item } = route.params;
  const {user,arttir,setArttir} = useContext(AuthContext)
  const [Like, setLike] = useState(false);
  const [namearray, setname] = useState([]);
  const [yorumdizi, setyorumdizi] = useState([]);
  const [isloading, Setloading] = useState(true);
  const [yorum, setyorum] = useState(true);
  let isimler = [];
  useEffect(() => {
    firestore().collection('ilanlar').get().then(x => {
      x.forEach(element => {
        element.data().userilan.forEach(y=>{
            if(y.ilanid==item.ilanid)
            {
              setyorumdizi(y.Yorumlar);
              firestore().collection("users").get().then(users=>{
                 users.forEach(x => {
                    y.Yorumlar.forEach(y => {
                       if(y.yorumyapanid==x.id)
                       {
                         isimler.push(x.data().Name);
                       }
                    });
                 });
                 setname(isimler);
              })
             
        
            }
        })
      });
    
      Setloading(false);
    });
  }, [yorum])

  if (isloading == true) {
    return <Commentloading />
  }
  const yorumekle=(veri)=>{
     firestore().collection("ilanlar").get().then(result=>{
       result.forEach(element => {
           firestore().collection("ilanlar").doc(element.id).get().then(ar=>{
              ar.data().userilan.forEach(a => {
                 if(item.ilanid==a.ilanid)
                 {
                    firestore().collection("ilanlar").doc(element.id).get().then(geridonendizi=>{
                      let x;
                      x=geridonendizi.data().userilan;
                      x.forEach((dizim,index) => {
                        if(dizim.ilanid==item.ilanid)
                        {
                          let y={
                            yorumicerik:veri,
                            yorumyapanid:user.uid
                          }
                          x[index].Yorumlar.push(y);
                          firestore().collection("ilanlar").doc(element.id).update({
                            userilan:x
                          }).then(basari=>{
                            console.log("Başarı Bir Şekilde Yorum Eklendi");
                            setyorum(!yorum);
                          })
                        }
                        
                      });
                       
                    })                
                 }
              }); 
           })
       });
       
     })
     
  }
  const fonksiyonpage = ({ item, index }) => {
    //console.log(index);
    return (
    <View style={{ backgroundColor: "#161616", flex: 1, justifyContent: "center", alignItems: "center" }}>
     

      <View key={index} style={{ justifyContent: "space-between", marginTop: 5, alignItems: "center", flexDirection: "row", height: 100, width:"90%", marginBottom: 20 }}>
        <View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 50 }}><ImageBackground source={image} resizeMode="cover" imageStyle={{ borderRadius: 50 }} style={{ width: 50, height: 50, justifyContent: "center" }} /></View>
        <View style={{ width: 270, alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          <View style={{ marginBottom: 10 }}><Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>{namearray[index]}</Text></View>
          <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white" }}>{item.yorumicerik}</Text></View>
          <View style={{ width: "100%", marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
            <View><Text style={{ color: "gray", fontSize: 13 }}>14 Saat Önce</Text></View>
            <View><Text style={{ color: "gray", fontSize: 13 }}>1 Beğenme</Text></View>
          </View>
        </View>

        <TouchableOpacity

        ><Awesome color={Like == true ? "red" : "white"} name={Like == true ? "heart" : "heart-o"} size={15} /></TouchableOpacity>
      </View>

    </View>
    )
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height - 80;
  const image = { uri: "https://www.wpdurum.com/uploads/thumbs/anime-kiz-profil-resimleri-1.jpg" };
  return (
    <View style={{flex:1,backgroundColor:"#161616"}}>
       <View style={{height:"9%",marginTop: 10, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.baricon} />
        <Text style={{ color: "white", marginTop: 10, fontSize: 20 }}>Yorumlar</Text>
      </View>
      {yorumdizi.length > 0 ? (<FlatList data={yorumdizi} renderItem={(item, index) => fonksiyonpage(item, index)} pagingEnabled />) : ""}
      {yorumdizi.length == 0 ? <View style={{ width: "100%", height: "80%", justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Henüz Yorum Yok</Text></View> : ""}
      <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#353535", width: "100%", height: "10%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 50 }}><ImageBackground source={image} resizeMode="cover" imageStyle={{ borderRadius: 50 }} style={{ width: 50, height: 50, justifyContent: "center" }} /></View>
        <Formik
          initialValues={{yorum:""}}
          validationSchema={registerSchema}
          onSubmit={(values) => yorumekle(values.yorum)}>
          {({ handleChange, handleBlur, handleSubmit, values,errors }) => (
            <>
              <TextInput
                name="yorum"
                style={styles.input}
                placeholderTextColor="white"
                placeholder="Yorum ekle"
                onChangeText={handleChange('yorum')}
                onBlur={handleBlur('yorum')}
                value={values.yorum}
                keyboardType="default"
              />
               <TouchableOpacity onPress={handleSubmit} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}><Ant name="send" size={27} color={"#f1f1f1"} /></TouchableOpacity>
            </>
          )}
         
        </Formik>
       
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "70%",
    borderRadius: 10,
    borderColor: "white",
    color: "white"


  },
})