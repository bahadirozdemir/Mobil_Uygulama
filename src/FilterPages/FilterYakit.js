import { StyleSheet, Text, View, TouchableOpacity, ScrollView,Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { FilterContext } from '../navigation/GlobalFilter'
import { AuthContext } from '../navigation/AuthProvider'
import { Checkbox } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { confirmButtonStyles } from 'react-native-modal-datetime-picker';

const FilterYakit = ({ navigation }) => {
  const {setFilter,YakitFiltre,setYakitFiltre } = useContext(FilterContext);
  let Yakitlar=["Benzin","Dizel","Elektrik"]
  const [markalar, setMarkalar] = useState([])
  const [secilen, setSecilen] = useState([])
  let markacheck = []
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filtrelemek İstediğiniz Yakıt Tipini Seçin</Text>
      <ScrollView style={{ width: "80%" }} showsVerticalScrollIndicator={false}>
        {

        Yakitlar.map((element, value) => (
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
                 setFilter(true)
                 setYakitFiltre([])
                 navigation.goBack();
              }
              else
              {
                 setFilter(true);
                 setYakitFiltre(secilen)
                 navigation.goBack();
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default FilterYakit

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
