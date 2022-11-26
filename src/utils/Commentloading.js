import { View, Text,ActivityIndicator,ScrollView,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'

const Commentloading = () => {
    return (
        <View style={styles.modalcontent}>
                <View style={{justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity style={styles.baricon} />
                  <Text style={{ color: "white", marginTop: 10, fontSize: 20 }}>Yorumlar</Text>
                </View>
                <View style={{flex:1,height:"80%",alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="white"/>
                <Text style={{color:"white"}}>Yorumlar Yükleniyor.</Text>
                </View>
        </View>
      )
}

export default Commentloading

const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0
    },
    modalcontent: {
      backgroundColor: "#161616",
      paddingTop: 12,
      paddingHorizontal: 20,
      borderTopRightRadius: 20,
      minHeight:"100%",
      paddingBottom: 20,
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