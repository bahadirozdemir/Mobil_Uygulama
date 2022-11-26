import { View, Text ,ActivityIndicator} from 'react-native'
import React from 'react'

export default Loading = () => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}}>
        <ActivityIndicator size="large" color="black"/>
        <Text>Lütfen Bekleyin.</Text>
    </View>
  )
}

 