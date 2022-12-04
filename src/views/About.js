import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Alert,
  } from "react-native";
  import firestore from '@react-native-firebase/firestore'
  import React,{useContext} from "react";
import { AuthContext } from "../navigation/AuthProvider";
  
  const About = () => {
    const {user} =useContext(AuthContext);
    const PremiumAl=async()=>{
      await firestore().collection("ilanlar").where("ilanyapanid","==",user.uid).get().then(result =>{
        result.forEach(async (element) => {
           await firestore().collection("ilanlar").doc(element.id).update({
            PremiumCheck:1,
           })
        }); 
       
      })
      await firestore().collection("users").doc(user.uid).update({
        Premium:1
      }).then(response =>{
         alert("Artık Premimum Üyesiniz Tebrikler");
      })
    }
    return (
      <View style={styles.aboutContainer}>
        <Text style={styles.mainHeader}>Merhaba Sahibinden.Com 'a Hoşgeldin</Text>
        <Text style={styles.paraStyle}>ilanın için fırsatları öğrenme vakti ! </Text>

        <View style={styles.aboutLayout}>
          <Text style={styles.aboutSubHeader}>Keşfet İlanları Nedir ? </Text>
          <Text style={[styles.paraStyle, styles.aboutPara]}>
            Keşfet Ekranı Premimum kullanıcıların ilanlarının görüntülendiği sayfadır.
            Bu sayfa sayesinde ilanın kullanıcılar önüne daha çok çıkacak ve ilanının 
            alıcı bulmasını kolaylaştıracak.Hemen Premium olarak daha fazla 
            kullanıcı ile etkileşime geç.
          </Text>
        </View>
  
        <Text style={styles.mainHeader}> Bizi Sosyal Medya Hesaplarıntan Takip Edin.</Text>
  
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/sahibindencom/")
            }>
            <Image
              style={styles.iconStyle}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
              }}
            />
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() =>
              Linking.openURL(
                "https://www.youtube.com/channel/UCFBKak2ep0h2yKv-kfrH9KA"
              )
            }>
            <Image
              style={styles.iconStyle}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/187/187210.png",
              }}
            />
          </TouchableOpacity>
  
        
        </View>
        <Text style={styles.mainHeader}>META ve Sahibinden.com İş Birliği</Text>
        <TouchableOpacity onPress={()=>PremiumAl()} style={{width:"80%",height:50,backgroundColor:"#f1db27",justifyContent:"center",alignItems:"center",borderRadius:20}}><Text style={{fontSize:18,fontWeight:"bold"}}>Premium Üyelik Al</Text></TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    aboutContainer: {
      display: "flex",
      alignItems: "center",
    },
  
    imgStyle: {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    mainHeader: {
      fontSize: 18,
      color: "#344055",
      fontWeight: "500",
      marginTop: 50,
      marginBottom: 10,
      fontFamily: "JosefinSans_700Bold",
    },
    paraStyle: {
      fontSize: 16,
      color: "#7d7d7d",
      paddingBottom: 30,
    },
    aboutLayout: {
      backgroundColor: "#4c5dab",
      paddingHorizontal: 30,
      marginVertical: 30,
    },
    aboutSubHeader: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "500",
      marginVertical: 15,
      fontFamily: "JosefinSans_700Bold",
      alignSelf: "center",
    },
    aboutPara: {
      color: "#fff",
    },
    menuContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
  
    iconStyle: {
      width: "100%",
      height: 50,
      aspectRatio: 1,
    },
  });
  
  export default About;