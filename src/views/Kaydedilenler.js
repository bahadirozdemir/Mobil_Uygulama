import { View, Text ,TouchableOpacity,ImageBackground} from 'react-native'
import React from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
const Kaydedilenler = ({navigation}) => {
  return (
    <View style={{flex:1,justifyContent:"flex-start",alignItems:"center",backgroundColor:"white"}}>
        <View style={{width:"100%",height:60,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
            <View style={{justifyContent:"center",alignItems:"center",width:"10%",height:"100%"}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}><Ant name="arrowleft" size={25} color="black" /></TouchableOpacity>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",width:"85%",height:"100%"}}>
            <Text style={{color:"black",fontSize:18}}>Kaydedilen İlanlarım</Text>
            </View>
          

        </View>
        <View style={{width:"100%",flexDirection:"row",flexWrap:"wrap",marginTop:10}}>
         <TouchableOpacity style={{marginLeft:1,marginRight:1,marginBottom:2,backgroundColor:"blue",width:"33%",height:100}}><ImageBackground source={{ uri: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2022/bde-wintertrainings/BMW_M4_Competition-BDE-stage.jpg.asset.1663246083314.jpg' }} resizeMode="cover" style={{flex:1,justifyContent:"center"}}></ImageBackground></TouchableOpacity>
         <TouchableOpacity style={{marginRight:1,marginBottom:2,backgroundColor:"blue",width:"33%",height:100}}><ImageBackground source={{ uri: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2022/bde-wintertrainings/BMW_M4_Competition-BDE-stage.jpg.asset.1663246083314.jpg' }} resizeMode="cover" style={{flex:1,justifyContent:"center"}}></ImageBackground></TouchableOpacity>
         <TouchableOpacity style={{marginBottom:2,backgroundColor:"blue",width:"33%",height:100}}><ImageBackground source={{ uri: 'https://www.bmw-m.com/content/dam/bmw/marketBMW_M/common/topics/magazine-article-pool/2022/bde-wintertrainings/BMW_M4_Competition-BDE-stage.jpg.asset.1663246083314.jpg' }} resizeMode="cover" style={{flex:1,justifyContent:"center"}}></ImageBackground></TouchableOpacity>
         
 
        </View>
    </View>
  )
}

export default Kaydedilenler