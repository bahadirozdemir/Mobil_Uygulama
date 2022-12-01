import React,{useContext, useEffect,useState} from 'react'
import { View, Text,Animated, Easing ,TouchableOpacity, FlatList,StyleSheet, TextInput, ImageBackground,ActivityIndicator } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../navigation/AuthProvider'
import Lottie from 'lottie-react-native';
export default PostPage=()=>{
  const {user} =useContext(AuthContext);
  const [firstData, setFirstData] = useState([])
  const [Tumilanlar, setTumilanlar] = useState([])
  const [start, setStart] = useState()
  const [kontrol,setKontrol]=useState(false);
  const animationProgress = React.useRef(new Animated.Value(0))
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
    firestore().collection("ilanlar").orderBy("ilanTarihiZaman","desc").limit(2).get().then(result=>{
       let ilanlar=[];
       result.forEach(element=>{
          ilanlar.push(element.data());
       })
       setTumilanlar(ilanlar);
       setStart(ilanlar[1].ilanTarihiZaman);
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
    if(kontrol!=true)
    {
      return (
        <View style={{backgroundColor:"transparent"}}>
          <ActivityIndicator size="large" color="black"/>
        </View>
     )
    }
    else 
    {
       
      return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}}>
        <Lottie source={require('../assets/abc.json')} style={{width:100,height:100}} autoPlay={true} loop={false}/>     
        <Text style={{fontSize:20,fontWeight:"bold",marginBottom:10}}>Tüm İlanları Gördünüz</Text> 
        </View>
     )
    }
  }
  const dataekle=()=>{
    if(kontrol!=true)
    {
      setTimeout(() => {
        firestore().collection("ilanlar").orderBy("ilanTarihiZaman","desc").startAfter(start).limit(2).get().then(querySnapshot=>{
          let index=0;
          querySnapshot.forEach(element=>{
            Tumilanlar.push(element.data());
            index++;
         })
         console.log(index);
         if(index==1)
         {
          setKontrol(true);    
         }
        })
      },1000);
    }
    
  }
 
  
  return (
  <FlatList ListFooterComponent={loadMore} onEndReached={dataekle} data={Tumilanlar} renderItem={(item, index) => postlarigoster(item, index)}/>
  )
}


