import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
const Arama = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [data, setData] = useState([])
  useEffect(() => {
 
  }, [])


  return (
    <View>
      <View style={{ margin: 20 }}>
        <Searchbar
          placeholder="İlan No veya Kelime Arayın."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ backgroundColor: "white" }}
        />
      </View>
       <TouchableOpacity 
      onPress={()=>{
        let markasorgu = "where('Marka','in',['*'])"
        let sorgum="firestore().collection('ilanlar')"
        console.log(sorgum+"."+markasorgu);
        sorgum+"."+markasorgu.get().then(result=>{
          console.log(result);
        })
      }}
       ><Text>A</Text></TouchableOpacity>
    </View>
  )
}

export default Arama

const styles = StyleSheet.create({})