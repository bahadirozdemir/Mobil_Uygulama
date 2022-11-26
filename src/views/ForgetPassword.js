import { View, Text ,Button,TextInput,SafeAreaView,Image} from 'react-native'
import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup';
import { AuthContext, AuthProvider } from '../navigation/AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
 
const Stack=createStackNavigator();
const resetpasswordschema = yup.object().shape(
    {
        email: yup.string().required("E-Mail Adresi Boş Geçilemez").email('Geçerli Bir E-Mail Adresi Giriniz.'),
    }
)

export default ForgetPassword = () => {
    const { forgetpassword } = useContext(AuthContext);
    
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Formik
                initialValues={{ email: "" }}
                validationSchema={resetpasswordschema}
                onSubmit={(values,{resetForm}) => {forgetpassword(values.email);resetForm({values:''})}}
            >

                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <>
                       <Text style={{fontWeight:"bold",fontSize:20}}>Şifrenizi mi unuttunuz? Yardımcı olalım.</Text>
                        <TextInput
                            style={{
                                height: 40,
                                margin: 12,
                                borderWidth: 1, 
                                padding: 10,
                                width: "80%",
                                borderRadius: 10}}
                            name="email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            placeholder='E-Mail Adresinizi Girin.'
                        />
                        {(errors.email && touched.email) && (<Text style={{ color: "red" }}>{errors.email}</Text>)}
                        <View style={{marginTop:12}}>

                            <Button
                                title="Gönder"
                                color="#B7950B"
                                onPress={handleSubmit}
                            />
                        </View>
                    </>
                )}


            </Formik>
        </SafeAreaView>
    )
}

