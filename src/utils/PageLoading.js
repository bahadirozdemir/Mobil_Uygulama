import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
const PageLoading = () => {
  return (
     <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Lottie source={require('../assets/125180-loader.json')} style={{width:200,height:200}} autoPlay loop />      
     </View>
  )
}

export default PageLoading
 