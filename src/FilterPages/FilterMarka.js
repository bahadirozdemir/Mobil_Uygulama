import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { FilterContext } from '../navigation/GlobalFilter'
import { AuthContext } from '../navigation/AuthProvider'
import { Checkbox } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { confirmButtonStyles } from 'react-native-modal-datetime-picker';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const FilterMarka = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { msg, setFilter,MarkaFiltreleri,setMarkaFiltreleri } = useContext(FilterContext);
  const [markalar, setMarkalar] = useState([])
  const [secilen, setSecilen] = useState([])
  const [isLoad, setLoading] = useState(true)
  let markacheck=[];
  useEffect(() => {
    const markalarigetir= async ()=>{
      firestore().collection("ilanlar").get().then(result => {
        result.forEach(element => {
         const ara=markacheck.find(item=>item===element.data().Marka)
          if(ara)
          {
              console.log("Zaten Var");
          }
          else
          {
            setMarkalar(markalar => [element.data().Marka, ...markalar]);
            markacheck.push(element.data().Marka);
          }
        
        });
      })
      setTimeout(() => {
        setLoading(false);
      },1500);
    }
    markalarigetir();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLoad==false ? "Filtrelemek İstediğiniz Markaları Seçin" : "Sizin İçin Markaları Topluyoruz" }</Text>
      {isLoad==false ? 
      <ScrollView style={{ width: "80%" }} showsVerticalScrollIndicator={false}>
        {
     
          markalar.map((element, value) => (
            <View style={styles.item} key={value}>
              <View>
                <Checkbox
                  status={secilen.find(item => item === element) ? 'checked' : 'unchecked'}
                  onPress={() => {
                    const check = secilen.find(item => item === element)
                    if (check) {
                      setSecilen([...secilen.filter(item => item != element)])
                    }
                    else {
                      setSecilen([...secilen, element]);
               
                    }

                  }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ color: "black", fontSize: 15 }}>{element}</Text></View>
            </View>
            
          ))}
        <View style={styles.button}>
          <Button
            title="Uygula"
            color="#32628d"
            onPress={() => {
              if(secilen.length==0)
              {
                console.log("Hiç Bir Filtre Seçilmedi.")
                setMarkaFiltreleri([])
                setFilter(true);
                navigation.goBack();
              }
              else
              {
                setMarkaFiltreleri(secilen);
                setFilter(true);
                navigation.goBack();
              }
            }}
          />
        </View>
      </ScrollView>
      :<ActivityIndicator animating={true} color={MD2Colors.red800} />}
    </View>
  )
}

export default FilterMarka

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  header: {
    fontSize:20,
    fontWeight: "bold",
    color: "#32628d",
    marginBottom: 40
  },
  item: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
  },
  button: {


    width: "100%",
    marginTop: 20,
},
})
