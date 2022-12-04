import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import Loading from '../utils/Loading'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [arttir, setArttir] = useState(0);
    const [control, setControl] = useState(false);
    const [checkcont, setcheckcont] = useState();
    const userColl = firestore().collection("users");
    if (control == true) {
        return <Loading />
    }
    return (
        <AuthContext.Provider
            value={{
                user, setUser,

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
                                Photo:url,
                                Premium:0,
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
        </AuthContext.Provider>


    )
}

