import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import Icones from 'react-native-vector-icons/SimpleLineIcons'
import Load from '../utils/Loading'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Button, Paragraph, Dialog, Portal, Provider, ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function UserProfile({ route }) {
    const { user } = useContext(AuthContext);
    const [currentuser, Setcurrentuser] = useState([]);
    const [count, setCount] = useState()
    const [Takipikon, setTakipicon] = useState()
    const [TakipCount, setTakipCount] = useState()
    const [TakipciCount, setTakipciCount] = useState()
    const [Currentilanlar, setCurrentilanlar] = useState([])
    const [ilanlarphotoUrl, setilanlarphotourl] = useState([])
    const [Loading, Setloading] = useState(true)
    const veriler = route.params;
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    useEffect(() => {

        firestore().collection("users").doc(veriler).get().then(result => {
            Setcurrentuser(result.data());
            if (result.data().Takipci.indexOf(user.uid) == -1) {
                setTakipicon('user-follow')
            }
            else {
                setTakipicon('user-unfollow')
            }
            setTakipciCount(result.data().Takipci.length);
            setTakipCount(result.data().Takip.length);
        })

        firestore().collection("ilanlar").doc(veriler).get().then(veri => {
            setCount(veri.data().userilan.length);
            let resimler = [];
            veri.data().userilan.forEach(async (element, index) => {
                const url = await storage().ref("Uploads/" + veriler + "/ilanResimleri/" + element.ilanid + "/data0").getDownloadURL();
                resimler.push(url);
                if (index == (veri.data().userilan.length - 1)) {

                    setilanlarphotourl(resimler);
                    setTimeout(() => {
                        Setloading(false);
                    }, 1500);
                }
            })
        })
    }, [])
    const takipet = () => {
        firestore().collection("users").doc(veriler).get().then(result => {
            let takipcidizi = result.data().Takipci;
            if (takipcidizi.indexOf(user.uid) == -1) {
                takipcidizi.push(user.uid);
                firestore().collection("users").doc(veriler).update({
                    Takipci: takipcidizi,
                }).then(() => {
                    console.log("Takipçi Başarıyla Eklendi");
                    firestore().collection("users").doc(user.uid).get().then(Takipdizi=>{
                        let takipekle = Takipdizi.data().Takip;
                        takipekle.push(veriler);
                        firestore().collection("users").doc(user.uid).update({
                            Takip:takipekle,
                        })
                        console.log("Takip Başarıyla Eklendi")
                    })
                    setTakipicon('user-unfollow')
                    setTakipciCount(result.data().Takipci.length);
                })
            }
            else {
                showDialog()

            }
        })
    }
    const TakiptenCikar = () => {
        firestore().collection("users").doc(veriler).get().then(result => {
            let takipcidizi = result.data().Takipci;
            const index = takipcidizi.indexOf(user.uid);
            takipcidizi.splice(index, 1);
            firestore().collection("users").doc(veriler).update({
                Takipci: takipcidizi,
            }).then(() => {
                console.log("Takipçi Başarıyla Kaldırıldı");
                firestore().collection("users").doc(user.uid).get().then(Takipdizi=>{
                    let takipekle = Takipdizi.data().Takip;
                    const index = takipekle.indexOf(user.uid);
                    takipekle.splice(index, 1);
                    firestore().collection("users").doc(user.uid).update({
                        Takip:takipekle,
                    })
                    console.log("Takip Başarıyla Kaldırıldı")
                })
                setTakipicon('user-follow');
                setTakipciCount(result.data().Takipci.length);
                hideDialog();
            })
        })
    }
    return (


        <SafeAreaView style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.titleBar}>

                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: currentuser.Photo }} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    {user.uid==veriler ? "" :  
                    <View style={styles.dm}>
                        <Icon name="message1" size={25} color="white" />
                    </View>
                   }
                    {user.uid==veriler ? "" :  
                     <TouchableOpacity onPress={takipet} style={styles.add}>
                      <Icones name={Takipikon} size={25} color="white" />
                    </TouchableOpacity>} 
                  
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{currentuser.Name=="" ? "" :currentuser.Name} {currentuser.Surname=="" ? "": currentuser.Surname}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Üye</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{count}</Text>
                        <Text style={[styles.text, styles.subText]}>İlan</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{TakipciCount}</Text>
                        <Text style={[styles.text, styles.subText]}>Takipçi</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{TakipCount}</Text>
                        <Text style={[styles.text, styles.subText]}>Takip</Text>
                    </View>
                </View>

                {Loading == true ? (<View style={{ marginTop: 32, width: "100%",justifyContent: "center", alignItems: "center" }}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>) : (<View style={{ marginTop: 32, width: "100%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    {
                        ilanlarphotoUrl.map((element, value) => (
                            <View key={value} style={styles.mediaImageContainer}>
                                <Image source={{ uri: element }} style={styles.image} resizeMode="cover"></Image>
                            </View>
                        ))
                    }


                </View>)}


                <Provider>
                    <View>
                        <Portal>
                            <Dialog style={{backgroundColor:"white"}} visible={visible} onDismiss={hideDialog}>
                                <Dialog.Title>Uyarı</Dialog.Title>
                                <Dialog.Content>
                                    <Paragraph>Bu Kullanıcıyı Takip Etmeyi Bırakmak İstediğinize Emin Misiniz?</Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={TakiptenCikar}>Evet</Button>
                                    <Button onPress={hideDialog}>Hayır</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                </Provider>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: '43%',
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10,
        marginBottom: 20
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
