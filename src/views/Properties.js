import { StyleSheet, Text, View,Image, ScrollViewComponent,ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
const uyariver=()=>{
    console.log("selam");
}

let arabalar = [
  {id:"1", marka:"Renault - Megane",model:"2022 Model 1.3 TCE Joy",image:"https://i12.haber7.net//haber/haber7/photos/2021/13/2021_renault_megane_fiyat_listesini_aciklandi_1617177210_4762.jpg"},
  {id:"2",marka:"Fiat - Egea",model:"2018 Model 1.6 TDI",image:"https://www.tanoto.com.tr/storage/app/media//Blog/egea-otomatik-nasil/egea-otomatik.jpg"},
  {id:"3",marka:"Ford - Focus",model:"2022 Model 1.0 TSI",image:"https://cdnepws.azureedge.net/getmedia/1fe1ebc5-a725-47d0-9785-7da3be087e6e/FocusMCA-galeri7-1440x810.jpg.aspx?width=470"},
  {id:"4",marka:"Mercedes - AMG EQE",model:"2022 Model 1.5 TDI",image:"https://www.mercedes-benz.com.tr/passengercars/mercedes-benz-cars/models/eqe/saloon-v295/design/exterior-design-gallery/_jcr_content/contentgallerycontainer/par/contentgallery/par/contentgallerytile_1007821577/image.MQ6.6.20220419154941.jpeg"},
  {id:"5",arka:"BMW - 5.25i",model:"2017 Model 20.000'de",image:"https://arabam-blog.mncdn.com/wp-content/uploads/2021/09/bmw-5.jpg"},
  {id:"6",marka:"SEAT - Leon",model:"2019 Model Pazarlık Olur Temiz.",image:"https://www.seat.com.tr/seatweb_files/202012713511288_assetRootXL.jpg"},
]
export default Properties = ({navigation}) => {
  return (

    <SafeAreaView style={styles.container}>
    <ScrollView>
   {
 arabalar.map((element,value) => (
   <View key={value} style={styles.incontanier}>
   <Image source={{uri:element.image}}
     style={{width: 400, height: 200}} /> 
       <Text style={{fontSize:30,fontWeight:"bold",marginBottom:5}}>{element.marka}</Text>
       <Text style={{fontSize:17,fontWeight:"bold",marginBottom:5}}>{element.model}</Text>
       <TouchableOpacity onPress={()=>{navigation.navigate('aracdetay',{element,name:element.marka})}} style={styles.button}>< Text style={styles.butonyazi}>İlana Aİt Daha Fazla Detay İçin Tıklayın</Text></TouchableOpacity>
       <View
      style={styles.cubuk}
/>
   </View>
 ))}
  </ScrollView>
</SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container:
    {
       flex:1,
       justifyContent:"flex-start",    
    },
    incontanier:
    {
        flex:1,
        alignItems:"center",
    },
    button:
    {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
        
    },
    butonyazi:
    {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    cubuk:
    {
        marginTop:50,
        borderBottomColor: 'black',
        borderBottomWidth:2, 
        width:"100%",
    }
})