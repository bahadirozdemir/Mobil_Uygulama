import { View, Text,SafeAreaView,Button,TextInput,StyleSheet} from 'react-native'
import React, { useContext,useState} from 'react'
import { Formik } from 'formik';
import { AuthContext } from '../navigation/AuthProvider';
import * as yup from 'yup';
import "yup-phone";
import firestore from '@react-native-firebase/firestore'
import { createStackNavigator } from '@react-navigation/stack';
const Stack=createStackNavigator();
 
const Phone = ({navigation}) => { 
   const [currentuser, Setcurrentuser] = useState({})
   const {user} = useContext(AuthContext);
   const coll=firestore().collection("users");
   const addphone=(phone)=>{
      coll.doc(user.uid).update({
        Telefon:phone
      }).then(result=>{
        navigation.goBack();
      })
   }
   
   const registerSchema=yup.object().shape(
       {     
            phone:yup.string().required("Telefon Numarası Boş Bırakılamaz.").min(10,({min})=>'Telefon Numarası En az '+min+" karakter olmalıdır.")
       }
    )
 return (
   <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>

   <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
       <Text style={{fontSize:24}}>Kullanıcılar Sizinle İrtibata Geçsin</Text>
       <Text></Text>
      <Formik
         validationSchema={registerSchema}
         initialValues={{phone: ''}}
         onSubmit={values => addphone(values.phone)}> 
         {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) => (
            <> 
               <TextInput
                  name="phone"
                  style={styles.input}
                  placeholder="Telefon Numaranız"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="phone-pad"
               />
              {(errors.phone && touched.phone) && (<Text style={{color:"red"}}>{errors.phone}</Text>)}
               <View style={styles.button}>
                  <Button
                     title="Kaydet"
                     color="#B7950B" 
                     onPress={handleSubmit}        
                  />
               </View>
            </>
         )}
      </Formik>
   </View>
</SafeAreaView> 
 )
}

export default Phone
const styles = StyleSheet.create({
    input: {
       height: 40,
       margin: 12,
       borderWidth: 1, 
       padding: 10,
       width: "80%",
       borderRadius: 10,
 
    },
    button:
    {
       width: "80%",
       marginTop: 20,
 
 
    }
   
 });