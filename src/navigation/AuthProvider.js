import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import Loading from '../utils/Loading'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Snackbar } from 'react-native-paper';
export const AuthContext = createContext({});
import NetInfo from "@react-native-community/netinfo";
import Routes from '../routes/Routes'
export const AuthProvider = ({ children }) => {
    const [gizle, setGizle] = React.useState(true);
    const onToggleSnackBar = () => setGizle(!visible);
    const onDismissSnackBar = () => setGizle(false);
    const [user, setUser] = useState(null);
    const [arttir, setArttir] = useState(0);
    const [control, setControl] = useState(false);
    const [internetCheck, setinternetCheck] = useState(false);
    const [checkcont, setcheckcont] = useState();
    const userColl = firestore().collection("users");
    useEffect(() => {
        setTimeout(() => {
            setGizle(true);
        },1000);
        NetInfo.addEventListener(state => {
            setinternetCheck(state.isConnected);          
            //console.log(state.isConnected);
        })
    }, [gizle])
    if (control == true) {
        return <Loading />
    }
    return (
        <AuthContext.Provider
            value={{
                user, setUser,internetCheck,
                login: async (email, password) => {

                    setControl(true);
                    try {

                        await auth().signInWithEmailAndPassword(email, password);
                        return setControl(false);

                    }
                    catch (error) {
                        Alert.alert("Uyarı", "E-Mail Adresi veya Şifre Hatalı.", [{ text: "Tamam" }]);
                        return setControl(false);

                    }
                },
                register: async (email, password, name, surname) => {
                    setControl(true);
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(async result => {
                            var uid = result.user.uid;
                            const url = await storage().ref("FirstUser/3.jpg").getDownloadURL();
                            await userColl.doc(uid).set({
                                Name: name,
                                Surname: surname,
                                Email: email,
                                Dtarihi: "",
                                Adres: "",
                                Ulke: "",
                                Telefon: "",
                                Photo: url,
                                Premium: 0,
                                Takip: [],
                                Takipci: [],
                                KayitTarihi: (new Date().getDate() + 1) + "." + (new Date().getMonth() + 1) + "." + new Date().getFullYear()
                            });
                        });
                        return setControl(false);
                    }
                    catch (error) {
                        Alert.alert("Üzgünüz Bu E-Mail Adresine Kayıtlı Bir Kullanıcı Zaten Mevcut.");
                        return setControl(false);

                    }
                },
                forgetpassword: async (email) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        alert("Şifre Sıfırlama Postası Gönderildi.");

                    } catch (error) {
                        alert("Böyle Bir E-Mail Adresi Bulunamaktadır.");
                        console.log(error);

                    }
                },
                SignOut: async () => {
                    try {
                        await auth().signOut();
                    }
                    catch (error) {
                        console.log("sunucuda bir hata oluştu");
                    }
                },
            }}>
            {children}
            {internetCheck==false ?
                <View style={{ position: "absolute", bottom: 60, width: "100%", height: 50 }}>
                    <Snackbar
                        visible={gizle}
                        onDismiss={onDismissSnackBar}
                        action={{
                            label: 'Tamam',
                            onPress: () => {
                                setGizle(false);
                            },
                        }}>
                        İnternet Bağlantısı Yok
                    </Snackbar>
                </View> : ""
            }

        </AuthContext.Provider>


    )
}

