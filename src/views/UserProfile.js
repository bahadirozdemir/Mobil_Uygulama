import React,{useState,useEffect,useContext} from "react";
import { AuthContext } from '../navigation/AuthProvider';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import Icones from 'react-native-vector-icons/SimpleLineIcons'
import Load from '../utils/Loading'
import firestore from '@react-native-firebase/firestore'
export default function UserProfile({route}) {
    const [currentuser, Setcurrentuser] = useState([]);
    const [count, setCount] = useState()
    const veriler = route.params;
    useEffect(() => {
      firestore().collection("users").doc(veriler).get().then(result=>{
         Setcurrentuser(result.data());
      })
      firestore().collection("ilanlar").doc(veriler).get().then(veri=>{
        setCount(veri.data().userilan.length);
      })
    }, [])
    return (


        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>

                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri:currentuser.Photo}} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.dm}>
                        <Icon name="message1" size={25} color="white" />
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Icones name="user-follow" size={25} color="white" />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{currentuser.Name +" "+ currentuser.Surname}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Üye</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{count}</Text>
                        <Text style={[styles.text, styles.subText]}>İlan</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{currentuser.Takipci}</Text>
                        <Text style={[styles.text, styles.subText]}>Takipçi</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{currentuser.Takip}</Text>
                        <Text style={[styles.text, styles.subText]}>Takip</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32, width: "100%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/profiles/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/profiles/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/profiles/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </View>

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
        width: 176,
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