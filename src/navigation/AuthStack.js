import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React,{useContext}from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './AuthProvider';
import { Formik } from 'formik';
import * as yup from 'yup';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPassword from '../views/ForgetPassword';


const Stack = createStackNavigator();


const registerSchema=yup.object().shape(
   {
      name:yup.string().required("İsim Boş Geçilemez"),
      surname:yup.string().required("Soyisim Boş Geçilemez"),
      email:yup.string().required("E-Mail Adresi Boş Geçilemez").email('Geçerli Bir E-Mail Adresi Giriniz.'),
      password:yup.string().required("Şifre Alanı Boş Geçilemez").min(8,({min})=>'Şifre En az '+min+" karakter olmalıdır.").matches(/\w*[a-z]\w*/,'En az 1 adet küçük harf kullanınız.').matches(/\w*[A-Z]\w*/,'En az 1 adet büyük harf kullanınız.').matches(/\d/,'En az 1 adet rakam kullanınız.'),
      confirmpassword:yup.string().required("Doğrulama Şifre Alanı Boş Geçilemez").oneOf([yup.ref('password')],'Şifreler Eşleşmiyor'),
   }
)


const validationrules=yup.object().shape(
   {
      email:yup.string().
      required('E-Mail Adresi Boş Geçilemez').
      email('Geçerli Bir E-Mail Adresi Giriniz.'),
      password:yup.string().required('Şifre Alanı Boş Geçilemez').min(8,({min})=>'Şifre En az '+min+" karakter olmalıdır"),
   }
);

 
const Register = ({ navigation }) => {
const {register}=useContext(AuthContext);
   return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

         <View style={{ width: "100%", alignItems: "center", justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "transparent", height: "15%", marginBottom: 20, alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
               <Image source={require('../assets/5.png')}
                  style={{ width: 300, height: 50, marginBottom: 10 }} />
               <Text style={styles.baslik}> Ailesine Katılın</Text>
            </View>
            <Formik
             initialValues={{name:"",surname:"",email:"",password:"",confirmpassword:""}}
             validationSchema={registerSchema}
             onSubmit={(values)=>register(values.email,values.password,values.name,values.surname)}>
             {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) => (
            <>
            <TextInput
               name="name"
               style={styles.input}
               placeholder="Adınız"
               onChangeText={handleChange('name')}
               onBlur={handleBlur('name')}
               value={values.name}
               keyboardType="default"
            />
            {(errors.name && touched.name) && (<Text style={{color:"red"}}>{errors.name}</Text>)}
            <TextInput
               name="surname"
               style={styles.input}
               placeholder="Soyadınız"
               onChangeText={handleChange('surname')}
               onBlur={handleBlur('surname')}
               value={values.surname}
               keyboardType="default"
            />
              {(errors.surname && touched.surname) && (<Text style={{color:"red"}}>{errors.surname}</Text>)}
            <TextInput
               name="email"
               style={styles.input}
               placeholder="E-Mail Adresiniz"
               onChangeText={handleChange('email')}
               onBlur={handleBlur('email')}
               value={values.email}
               keyboardType="email-address"
            />
              {(errors.email && touched.email) && (<Text style={{color:"red"}}>{errors.email}</Text>)}
            <TextInput
               name="password"
               style={styles.input}
               placeholder="Şifreniz"
               onChangeText={handleChange('password')}
               onBlur={handleBlur('password')}
               value={values.password}
               keyboardType="password"
               secureTextEntry={true}
            />
              {(errors.password && touched.password) && (<Text style={{color:"red"}}>{errors.password}</Text>)}
            <TextInput
               name="confirmpassword"
               style={styles.input}
               placeholder="Tekrar Şifreniz"
               onChangeText={handleChange('confirmpassword')}
               onBlur={handleBlur('confirmpassword')}
               value={values.confirmpassword}
               keyboardType="password"
               secureTextEntry={true}
            />
            {(errors.confirmpassword && touched.confirmpassword) && (<Text style={{color:"red"}}>{errors.confirmpassword}</Text>)}
            <View style={styles.button}>

               <Button
                  title="Kayıt Ol"
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
const Login = ({ navigation }) => {
   const {login}=useContext(AuthContext);
   return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>

         <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            <Image source={require('../assets/3.jpg')}
               style={{ width: "100%", height: "50%" }} />
            <Formik
               validationSchema={validationrules}
               initialValues={{ email: '', password: '' }}
               onSubmit={values => login(values.email,values.password)}>
               {({handleChange,handleBlur,handleSubmit,values,errors,isValid,touched}) => (
                  <> 
                     <TextInput 
                        name="email"
                        style={styles.input}
                        placeholder="E-Mail Adresiniz"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType='email-address'
                     />
                    {(errors.email && touched.email) && (<Text style={{color:"red"}}>{errors.email}</Text>)}
                     <TextInput
                        name="password"
                        style={styles.input}
                        placeholder="Şifreniz"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        keyboardType='password'
                        secureTextEntry={true}
                     />
                      {(errors.password && touched.password)&&(<Text style={{color:"red"}}>{errors.password}</Text>)}
                      <View style={{backgroundColor:"white",width:"80%",height:"3%",alignItems:"flex-end"}}> 
                        <TouchableOpacity
                        onPress={()=>{navigation.navigate('ForgetPassword')}}
                        ><Text>Şifremi Unuttum</Text></TouchableOpacity>
                      </View>
                     <View style={styles.button}>

                        <Button
                           title="Giriş Yap"
                           color="#B7950B"
                           onPress={handleSubmit} 
                            
                        />
                     </View>
                  </>
               )}
            </Formik>
            <View style={{ justifyContent: "center", width: "100%", height: "12%",alignItems: "flex-end", flexDirection: "row" }}>
               <Text>Hesabınız Yok Mu ? </Text><TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={{ fontWeight: "bold", color: "#B7950B" }}>Hesap Oluşturun</Text></TouchableOpacity>
            </View>
         </View>
      </SafeAreaView> 
   )
}

export default AuthStack = () => {
   return (
      <Stack.Navigator initialRouteName='Login'>
         <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}

         />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}

         />
      </Stack.Navigator>

   )
}

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


   },
   baslik:
   {
      fontSize: 25,
      fontWeight: 'bold',
      color: "black"

   }
});