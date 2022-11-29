import React,{useContext, useEffect,useState} from 'react'
import { View, Text, TouchableOpacity, FlatList,StyleSheet, TextInput, ImageBackground,ActivityIndicator } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../navigation/AuthProvider'
 let datalar =[
  {isim : "Ahmet",icerik:"Ahmetin ilanı"},
  {isim : "Mehmet",icerik:"Mehmetin ilanı"},
  {isim : "Salih",icerik:"Salihin ilanı"},
 ]
 
export default PostPage=()=>{
  const {user} =useContext(AuthContext);
  const [firstData, setFirstData] = useState([])
  const [Tumilanlar, setTumilanlar] = useState([])
  useEffect(() => {
    // let kopya = [];
    //   firestore().collection("users").doc(user.uid).get().then(result=>{
    //       setFirstData(result.data().Takip);
    //   })
    //   firstData.forEach(element => {
    //        firestore().collection("ilanlar").doc(element).get().then((dizi)=>{
    //           dizi.data().userilan.forEach((donendizi,index)=>{
    //               kopya.push(donendizi);
    //               if(index==(firstData.length-1))
    //               {
    //                 setTumilanlar(kopya);
    //               }
    //           })
    //        }).catch(e=>{
    //         console.log(e);
    //        })
    //   });
    firestore().collection("ilanlar").orderBy("Marka","asc").get().then(result=>{
       result.forEach(element=>{
         element.data().userilan.forEach(x=>{
          console.log(x.Marka);
         })
       })
    })
  },[])
  const postlarigoster=({item,index,navigation})=>{
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return (
  <View style={{ flex: 1, alignItems: "center", justifyContent:"center",flexDirection: "column",backgroundColor: "#f1f1f1" }}>
 
      <View style={{width:"100%",justifyContent:"center",alignItems:"center",margin:15}}>
        <Card style={{ backgroundColor: "white", width: "90%" }}>
          <Card.Title title="Bahadır Özdemir" subtitle="1 hafta önce" left={LeftContent} />
          <Card.Content>
            <Title>{item.Marka}</Title>
            <Paragraph>{item.Model}</Paragraph> 
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
           <Card.Actions>
            <Button mode="contained">Görüntüle</Button>
          </Card.Actions>
        </Card>
      </View>
      </View>
    )
  }
     
  const loadMore =()=>{
     return (
        <View style={{backgroundColor:"#fafafa"}}>
          <ActivityIndicator size="large" color="black"/>
        </View>
     )
  }
  const dataekle=()=>{
    veri={isim:"Bahadır",icerik:"Zeynep"}
    datalar.push(veri);
  }
  
  return (
  <FlatList data={Tumilanlar} renderItem={(item, index) => postlarigoster(item, index)}/>
  )
}


