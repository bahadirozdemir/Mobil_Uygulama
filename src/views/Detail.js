import { View, Text } from 'react-native'
import React from 'react'

export default Detail = ({ route }) => {
   const veriler =route.params;
   console.log(veriler.ilanid);
}

