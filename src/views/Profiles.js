import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, Button, PermissionsAndroid } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import SelectList from 'react-native-dropdown-select-list';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Kaydedilenler from './Kaydedilenler'
import Myilanlar from './Myilanlar'
import Ant from 'react-native-vector-icons/AntDesign'
import storage from '@react-native-firebase/storage'
import { utils } from '@react-native-firebase/app';

const ImagePicker = require('react-native-image-picker');
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
let options = {

    mediaType: "photo",
}
const Profil = ({ navigation }) => {


    const [currentuser, Setcurrentuser] = useState([]);
    const [Uploading, SetUploading] = useState(false);
    const [ProfilPhoto, setProfilPhoto] = useState();
    const [UpTask, SetUpTask] = useState();
    const [Donen, SetDonen] = useState(false);
    const [downloadurl, setDownloadurl] = useState();
    const [yenile, setYenile] = useState(false);
    const { SignOut, user } = useContext(AuthContext);
    useEffect(() => {
        navigation.addListener('focus', async () => {
            await firestore().collection('users').doc(user.uid).get().then(documentSnapshot => {
                Setcurrentuser(documentSnapshot.data());
                setProfilPhoto(documentSnapshot.data().Photo);
            })
        });
    }, [])



    //Kamera kullanılmak istenirse // 
    // const OpenCamera=async ()=>{
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.CAMERA,
    //           {
    //             title: "App Camera Permission",
    //             message:"App needs access to your camera ",
    //             buttonNeutral: "Ask Me Later",
    //             buttonNegative: "Cancel",
    //             buttonPositive: "OK"
    //           }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             ImagePicker.launchCamera({mediaType:"photo",saveToPhotos:true},(images)=>{
    //                console.log(images);
    //             })
    //         } else {
    //           console.log("Camera permission denied");
    //         }
    //       } catch (err) {
    //         console.warn(err);
    //       }

    // }
    const OpenLibrary = () => {
        ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (!response.didCancel) {
                SetUploading(true);
                const ref = storage().ref("Uploads/" + user.uid + "/ProfilFoto");
                const task = ref.putFile(response.assets[0].uri);
                task.then(async (cevap) => {
                    const url = await storage().ref("Uploads/" + user.uid + "/ProfilFoto").getDownloadURL();

                    firestore().collection("users").doc(user.uid).update({
                        Photo: url
                    }).then(async () => {
                        console.log("Fotoğraf Başarıyla Yüklendi.");
                        setProfilPhoto(url);
                    })
                })
            }
        });

    }







    return (

        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/01/47/bf/0147bfd9753a8633861c9905f6c0f89e.jpg' }} resizeMode="cover" style={styles.image}></ImageBackground>
                </View>

                <TouchableOpacity onPress={OpenLibrary} style={{ position: "absolute", alignSelf: "center" }}><Image style={styles.avatar} source={{ uri: ProfilPhoto}} /></TouchableOpacity>

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{currentuser.Name} {currentuser.Surname}</Text>
                        <Text style={styles.info}>Üye</Text>
                    </View>

                </View>


                <View style={{ alignItems: "center", justifyContent: "center" }}>

                    <View style={styles.informations}>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" }}><Text style={styles.ininformations}><Text style={{ fontWeight: "bold" }}> Doğum Tarihi : </Text> {currentuser.Dtarihi ? currentuser.Dtarihi : "Belirtilmemiş"} </Text><TouchableOpacity onPress={() => navigation.navigate('Dtarihi')}><Text style={styles.inininformations}>Değiştir</Text></TouchableOpacity></View>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" }}><Text style={styles.ininformations}><Text style={{ fontWeight: "bold" }}> İl / İlçe : </Text> {currentuser.Adres ? currentuser.Adres : "Belirtilmemiş"} </Text><TouchableOpacity onPress={() => navigation.navigate('SelectCountry')}><Text style={styles.inininformations}>Değiştir</Text></TouchableOpacity></View>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" }}><Text style={styles.ininformations}><Text style={{ fontWeight: "bold" }}> Telefon : </Text> {currentuser.Telefon ? currentuser.Telefon : "Belirtilmemiş"} </Text><TouchableOpacity onPress={() => navigation.navigate('Phone')}><Text style={styles.inininformations}>Değiştir</Text></TouchableOpacity></View>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" }}><Text style={styles.ininformations}><Text style={{ fontWeight: "bold" }}> Ülke : </Text>Türkiye</Text><TouchableOpacity onPress={() => alert("Sahibinden.com Şu an sadece Türkiye'de Hizmet Vermektedir.")}><Text style={styles.inininformations}>Değiştir</Text></TouchableOpacity></View>
                    </View>

                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>{currentuser.KayitTarihi} Tarihinden Beri Bizimle Birliktesiniz</Text>
                    <View style={styles.button}>

                        <Button
                            title="Çıkış Yap"
                            color="#B7950B"
                            onPress={() => { SignOut() }}
                        />
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default Profiles = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                options={{
                    drawerLabel: "Profil",
                    headerTitle: "",
                    drawerIcon: ({ size }) => (
                        <Ant
                            name="user"
                            size={size}
                            color={'#000'}
                        />
                    ),
                }} name='Profil' component={Profil} />
            <Drawer.Screen
                options={{
                    drawerLabel: "İlanlarım",
                    headerShown: false,
                    drawerIcon: ({ size }) => (
                        <Ant
                            name="save"
                            size={size}
                            color={'#000'}
                        />
                    ),
                }} name='Myilanlar' component={Myilanlar} />
            <Drawer.Screen
                options={{
                    drawerLabel: "Kaydedilen İlanlar",
                    headerShown: false,
                    drawerIcon: ({ size }) => (
                        <Ant
                            name="save"
                            size={size}
                            color={'#000'}
                        />
                    ),
                }} name='Kaydedilenler' component={Kaydedilenler} />
 
        </Drawer.Navigator>
      
    )
}

const styles = StyleSheet.create({

    container: { backgroundColor: "white" },
    button: {


        width: "80%",
        marginTop: 20,
    },
    button2: {


        width: "100%",
        marginTop: 20,
    },
    informations: {
        width: "90%",

    },
    ininformations: {

        width: "90%",
        marginBottom: 30,
        fontSize: 16,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    inininformations:
    {
        color: "blue",
        width: "auto",
        marginBottom: 30,
        marginRight: 10,
        fontSize: 16,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    header: {

        height: 200,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 102
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 10,
    },
    bodyContent: {
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});
