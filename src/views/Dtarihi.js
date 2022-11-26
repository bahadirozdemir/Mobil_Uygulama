import React, { Component, useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import SelectCountry from './SelectCountry';
import SelectList from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';
import DatePicker from 'react-native-modern-datepicker';


const Stack = createStackNavigator();

const UpdateDtarih = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const {user} = useContext(AuthContext);
    current=new Date().getFullYear()+"-"+ (new Date().getMonth()+1)+"-"+(new Date().getDate()+1);
    let newdate="";
    const fonksiyon = ()=>{
       
         if(selectedDate==null)
         alert("Lütfen Bir Tarihi Seçimi Yapınız");
         else{
            for (let index = 9; index > 0; index=index-3) {
                if(index < 6)
                index=0;
                else
                newdate=newdate+selectedDate[index-1]+selectedDate[index]+".";               
             }
             for(let index=0;index < 4;index++){
                newdate=newdate+selectedDate[index];
             }
             const coll=firestore().collection("users");
             coll.doc(user.uid).update({
                Dtarihi:newdate
              }).then(result=>{
                navigation.goBack();
              })
         }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Lütfen Doğum Tarihinizi Seçiniz.</Text>
            <Text></Text>
            <DatePicker
                maximumDate={current}
                mode="calendar"
                minuteInterval={30}
                style={{ borderRadius: 10 }}
                onSelectedChange={date => setSelectedDate(date)}
            />
            <Text></Text>
             <View style={styles.button}>
                   <Button
                      title="Doğum Tarihini Kaydet"
                      color="#B7950B" 
                      onPress={fonksiyon}        
                   />
                </View>
        </View>
    );
};


export default Sehir = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UpdateDtarih"
                component={UpdateDtarih}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({

    button2: {


        width: "100%",
        marginTop: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "80%",
        borderRadius: 10,

    },
});
