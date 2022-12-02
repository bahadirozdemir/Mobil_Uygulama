import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Lottie from 'lottie-react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationAction } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native'
const Stack = createStackNavigator();
export default IlanYukleniyor = ({navigation}) => {
    const [yazi, setYazi] = useState("Üzerinde Çalışıyoruz");
    let mesajlar = ["İlan Bilgilerinizi İşliyoruz", "Her şey Tamamlandı Sizi Yönlendiriyoruz."];
    let index = 0;
    useEffect(() => {
        const mesajyaz = () => {
            if (index < 2) {
                setYazi(mesajlar[index]);
            }
            index++;
            if (index == 3) {
                clearInterval(timerId);
                navigation.navigate("HomeStack")
            }
        }
        let timerId = setInterval(() => {
            mesajyaz();
        },2000);
    }, [])


    return (
        <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center" }}><Lottie source={require('../assets/119376-document-processing.json')} style={{ width: 200, height: 200 }} autoPlay loop />
            <Text style={{ fontSize: 15, fontWeight: 'bold' }} >{yazi}</Text>
        </View>
    )
}
 

