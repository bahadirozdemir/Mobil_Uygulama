import { View, Dimensions, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import SelectList from 'react-native-dropdown-select-list';
import FontAwo from 'react-native-vector-icons/FontAwesome5'
import Ant from 'react-native-vector-icons/AntDesign'
import Lottie from 'lottie-react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import uuid from 'react-native-uuid';
import { RFValue } from "react-native-responsive-fontsize"
import { List, MD3Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import PostIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Octi from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar } from 'react-native-paper';
const MyDocs = ({navigation}) => {
  const [currentuser, Setcurrentuser] = useState({});
  const { user } = useContext(AuthContext);
  const { SignOut } = useContext(AuthContext);
  //const [List, Setlist] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const usercoll = firestore().collection("users");
  let dizi = [];
  let whilecheck = true;
  let check = 0;
  const imagez = [
    require('../assets/Z.png'),
    "https://firebasestorage.googleapis.com/v0/b/react-native-a20b5.appspot.com/o/Uploads%2FtHkQV7tLXnaxRYngPD1Qv05AxZb2%2FilanResimleri%2F5c9a46ce-b93a-4915-b856-f397efa49520%2Fdata0?alt=media&token=4642f412-8841-426c-99ee-db86342b754b",
    "https://firebasestorage.googleapis.com/v0/b/react-native-a20b5.appspot.com/o/Uploads%2FtHkQV7tLXnaxRYngPD1Qv05AxZb2%2FilanResimleri%2F8b5b96c3-3d1c-40b5-97a6-3fac6c264ca1%2Fdata0?alt=media&token=683784f5-e1d9-488a-84a1-0c7866c422db",
    "https://firebasestorage.googleapis.com/v0/b/react-native-a20b5.appspot.com/o/Uploads%2Fk3BUFOM7OGPjvVpw0CfOeBtLj7r1%2FilanResimleri%2Feacc5347-cd2c-4d9a-b135-cd30ab06599e%2Fdata0?alt=media&token=dd036503-2c72-4267-9257-521f3d3e24bb"
  ];

  useEffect(() => {
    firestore().collection('users').doc(user.uid).onSnapshot(documentSnapshot => {
      Setcurrentuser(documentSnapshot.data());
    })
  }, [])
  return (

    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
      <View style={styles.header}><View style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}><Lottie source={require('../assets/122835-handshake.json')} style={{ width: 100, height: 100 }} autoPlay loop /></View><View style={{ width: "80%", justifyContent: "center", alignItems: "flex-start", height: "100%" }}><Text style={{ fontSize: RFValue(18), fontWeight: "bold", color: "black" }}>Sahibinden.com</Text></View></View>
      <View style={{ width: "100%", height: "44%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", height: "20%", flexDirection: "row" }}>
          <View style={{ width: "80%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: "#3c92bc" }}><View style={{ flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "flex-start" }}><Text style={{ fontSize: RFValue(17), color: "white" }}> Merhaba {currentuser.Name}</Text><Text style={{ fontSize: 13, color: "white" }}>  Üye</Text></View></View>
          <View style={{ width: "20%", height: "100%", backgroundColor: "#2E8BE7", justifyContent: "center", alignItems: "center" }}><FontAwo name="medal" size={22} color="yellow" /></View>
        </View>
        <SwiperFlatList
          autoplay
          autoplayDelay={7}
          autoplayLoop
          index={0}
          autoplayLoopKeepAnimation={true}
          data={imagez}
          renderItem={({ item, index }) => (
            <View style={{ width: width }}>
              <ImageBackground source={index == 0 ? item : { uri: item }} resizeMode="cover" style={{ width: "100%", height: "100%" }} />
            </View>
          )}
        />

      </View>

      <View style={{ width: "100%", justifyContent: "center", alignItems: "center", height: "37%", flexDirection: "row", padding: 12, flexWrap: "wrap" }}>

        <View style={{ width: "100%" }}>
          <List.Item  onPress={()=>{navigation.navigate('Tumilanlar')}} style={styles.itemler} titleStyle={{ fontSize: 19,fontWeight:"bold"}} titleEllipsizeMode="middle"
            title="Tüm İlanlar"
            description="Size uygun olan ilanlara göz atın."
            left={() => <Ionicons name="md-list-outline" size={55} color="#fca001" />}
          />
           <List.Item onPress={()=>{navigation.navigate('About')}} style={styles.itemler} titleStyle={{ fontSize: 19,fontWeight:"bold"}} titleEllipsizeMode="middle"
            title="Premium Üyelik Nedir?"
            description="İlanınız için öneri ve fırsatlar."
            left={() => <Ionicons name="information-circle-outline" size={55} color="#fca001" />}
          />
           <List.Item style={styles.itemler} titleStyle={{ fontSize: 19,fontWeight:"bold"}} titleEllipsizeMode="middle"
            title="Bize Sorun"
            description="Aklınıza takılan bir soru mu var ? 7/24 Aktif canlı desteğimizle görüşün."
            left={() => <Ionicons name="md-mic-circle-outline" size={55} color="#fca001" />}
          />
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
  itemler: {
    width:"100%",
    height:"40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 5,
  }

})