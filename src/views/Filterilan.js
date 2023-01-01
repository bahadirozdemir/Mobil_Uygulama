
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, Dimensions, StatusBar, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Font from 'react-native-vector-icons/FontAwesome'
import Simple from 'react-native-vector-icons/SimpleLineIcons'
import Ant from 'react-native-vector-icons/AntDesign'
import { ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import moment from 'moment'
import { set } from 'react-native-reanimated'
import Lottie from 'lottie-react-native';
import Loading from '../utils/Loading'
import Modal from "react-native-modal";
import { FilterContext } from '../navigation/GlobalFilter'
import { AuthContext } from '../navigation/AuthProvider'
const wwidth = Dimensions.get('window').width;
const hheight = Dimensions.get('window').height;



const Tumilanlar = ({ navigation, route }) => {

    // const loadMore = () => {
    //     if (kontrol != true) {
    //         return (
    //             <View style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 15 }}>
    //                 <ActivityIndicator size="large" color="black" />
    //                 <Text style={{ fontSize: 15, fontWeight: "bold" }}>Daha Fazla İlan Yükleniyor</Text>
    //             </View>
    //         )
    //     }
    //     else {
    //         return (
    //             <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
    //                 <Lottie source={require('../assets/abc.json')} style={{ width: 100, height: 100 }} autoPlay={true} loop={false} />
    //                 <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Tüm İlanları Gördünüz</Text>
    //             </View>
    //         )
    //     }

    //  }
    // const dataekle = async () => {
    //     if (kontrol != true) {
    //         let sayac = 0;
    //         let resim = [];
    //         await firestore().collection("ilanlar").orderBy("ilanTarihiZaman", "desc").startAfter(start).limit(1).get().then(result => {
    //             result.forEach(element => {
    //                 ilanListe.push(element.data());
    //                 const a = { startDate: element.data().ilanTarihiZaman, timeEnd: Date.now() }
    //                 const startDate = moment(a.startDate);
    //                 const timeEnd = moment(a.timeEnd);
    //                 const diff = timeEnd.diff(startDate);
    //                 const diffDuration = moment.duration(diff);
    //                 Gun.push(diffDuration.days());
    //                 resim.push(element.data().Resim1);
    //                 resim.push(element.data().Resim2);
    //                 resim.push(element.data().Resim3);
    //                 resim.push(element.data().Resim4);
    //                 let kopya = Resimler;
    //                 kopya.push(resim);
    //                 sayac++;
    //                 setResimler(kopya);
    //                 setStart(element.data().ilanTarihiZaman)
    //             });
    //             if (sayac == 0) {
    //                 setKontrol(true);
    //             }
    //         })
    //     }
    //     else {
    //         console.log("Döngü Bitti Bütün İlanlar Görüldü");
    //     }

    // }
    const ilanlariListele = ({ item, index }) => {
        let gunsayisi = Gun[index];
        if (gunsayisi == 0) {
            gunsayisi = "Bugün";
        }
        else if (gunsayisi % 7 == 0) {
            gunsayisi = (gunsayisi / 7) + " Hafta Önce";
        }
        else if (gunsayisi % 30 == 0) {
            gunsayisi = (gunsayisi / 30) + " Ay Önce";
        }
        else if (gunsayisi % 1 == 0) {
            gunsayisi = gunsayisi + " Gün Önce"
        }
        return (
            <View style={{ width: wwidth, height: hheight / 1.7 }}>
                <View style={{ marginLeft: 5 }}><TouchableOpacity onPress={() => { navigation.navigate("UserProfile", { ilanyapan: item.ilanyapanid, ilanid: item.ilanid }) }}><Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.ilanyapan} ● {Gun[index] == 0 ? "Bugün" : gunsayisi}</Text></TouchableOpacity></View>
                <View style={{ width: "100%", height: "15%", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <View><Text style={{ fontSize: 17 }}>{item.Marka}  {item.Model}</Text></View>
                    <View><Text style={{ fontSize: 17 }}>{item.Modelyil} Model</Text></View>
                </View>
                <SwiperFlatList
                    index={0}
                    autoplayLoopKeepAnimation={true}
                    data={Resimler[index]}
                    renderItem={({ item, index }) => (
                        <View style={{ width: wwidth, alignItems: "center", justifyContent: "center" }}><Image resizeMode="cover" source={{ uri: item }} style={{ width: "100%", height: "100%" }} /></View>
                    )}
                />
                <View style={{ width: "100%", height: "33%", alignItems: "center", justifyContent: "center", borderBottomColor: "black", borderBottomWidth: 2 }}>
                    <View style={{ flexDirection: "row", height: "35%", flexWrap: "nowrap", justifyContent: "space-around", margin: 6, alignItems: "center", width: "100%" }}>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Material name="gas-station" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.YakitTipi}</Text></View></View>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Font name="gears" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.Vites}</Text></View></View>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Simple name="speedometer" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.Motorgucu}</Text></View></View>
                    </View>
                    <View style={{ flexDirection: "row", height: "35%", flexWrap: "nowrap", justifyContent: "space-around", margin: 6, alignItems: "center", width: "100%" }}>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Font name="calendar" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.ilanTarihi}</Text></View></View>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Material name="run-fast" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.Kilometre} KM</Text></View></View>
                        <View style={{ flexDirection: "row" }}><View style={{ margin: 3 }}><Material name="swap-horizontal" size={25} color="#95b7d0" /></View><View style={{ margin: 3 }}><Text style={{ fontSize: 16 }}>{item.Takas}</Text></View></View>
                    </View>
                    <View style={{ width: "100%", height: "20%", marginRight: 15, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Fiyat : {item.Fiyat}</Text>
                    </View>
                </View>

            </View>
        )
    }
    const [ilanListe, setListe] = useState([])
    const [Resimler, setResimler] = useState([])
    const [Gun, setGun] = useState({})
    const [start, setStart] = useState({})
    const [kontrol, setKontrol] = useState(false)
    const [ilanSayisi, setilanSayisi] = useState(0)
    const [isLoading, setLoading] = useState(false);
    const { filtermodal, setFilter, MarkaFiltreleri, CekisFiltre, YakitFiltre } = useContext(FilterContext);
    useEffect(() => {

        setLoading(true);
        const koleksiyonverileri = route.params;
        //console.log(koleksiyonverileri);
        firestore().collection("ilanlar").where("YakitTipi", "in", [...koleksiyonverileri.FiltreDizisi[1].YakitFiltre]).get().then(result => {
            let dizi = [];
            let resimdizi = [];
            let gunler = [];
            let kopyamdizim = [];
            let ilansay = 0;
            result.forEach((element, index) => {
            koleksiyonverileri.FiltreDizisi[0].MarkaFiltreleri.forEach(markalar => {
                if(markalar==element.data().Marka)
                {
                  koleksiyonverileri.FiltreDizisi[2].CekisFiltre.forEach(cekisler => {
                      if(element.data().Cekis==cekisler)
                      {
                        ilansay++;
                        resimdizi = [];
                        dizi.push(element.data());
                        resimdizi.push(element.data().Resim1);
                        resimdizi.push(element.data().Resim2);
                        resimdizi.push(element.data().Resim3);
                        resimdizi.push(element.data().Resim4);
                        const a = { startDate: element.data().ilanTarihiZaman, timeEnd: Date.now() }
                        const startDate = moment(a.startDate);
                        const timeEnd = moment(a.timeEnd);
                        const diff = timeEnd.diff(startDate);
                        const diffDuration = moment.duration(diff);
                        gunler.push(diffDuration.days());
                        setStart(a.startDate);
                        kopyamdizim[index] = resimdizi     
                      }
                   });            
                }
            });
            });
            kopyamdizim = kopyamdizim.filter(function (element) {
                return element !== undefined;
            })
            setilanSayisi(ilansay);
            console.log(ilansay);
            setResimler(kopyamdizim);
            setGun(gunler);
            setListe(dizi);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        })




    }, [])
    if (isLoading == true) {
        return <Loading />
    }
    return (

        <View style={{ flex: 1, backgroundColor: "white"}}>
        
            <View style={{ backgroundColor: "#32628d", width: "100%", height: 50, alignItems: "center", flexDirection: "row", justifyContent: "space-around", borderBottomWidth: 0.5, borderBottomColor: "black" }}>
                <TouchableOpacity
                    onPress={() => {
                        setFilter(true)
                        navigation.goBack()
                    }}
                ><View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                        <Font name="filter" size={25} color="white" />
                        <Text style={{ color: "white" }}>Filtrele</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                    <Font name="file-text-o" size={25} color="white" />
                    <Text style={{ color: "white" }}>{ilanSayisi} İlan</Text></View>


            </View>

            {ilanListe.length > 0 ? <FlatList data={ilanListe} renderItem={(item, index) => ilanlariListele(item, index)} /> : ""}
            {ilanListe.length==0 ? <View style={{padding:5,justifyContent:"center",alignItems:"center",width:"100%",height:hheight-150}}>
                <Lottie source={require('../assets/68395-data-not-found.json')} style={{ width: 400, height: 400 }} autoPlay loop />
                <Text style={{fontSize:17,fontWeight:"bold"}}>Üzgünüz Bu Filtreye Ait Bir İlan Bulunamadı</Text>
                </View>: ""}
            <View style={styles.flexView}>
                <View style={styles.btnContainer}>
                </View>
                <StatusBar />
                <Modal
                    onBackdropPress={() => setFilter(false)}
                    onBackButtonPress={() => setFilter(false)}
                    isVisible={filtermodal}
                    animationIn="bounceInUp"
                    animationOut="bounceOutDown"
                    animationInTiming={900}
                    animationOutTiming={500}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={500}
                    style={styles.modal}
                >

                    <View style={styles.modalContent}>

                        <View style={styles.center}>
                            <View style={styles.barIcon}><Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Filtreleme Seçenekleri</Text></View>

                            <ScrollView>
                                <TouchableOpacity onPress={() => { setFilter(false), navigation.navigate('FilterMarka') }}>
                                    <View style={{ width: "100%", height: 75, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "90%", flexDirection: "column" }}><Text style={{ fontSize: 17 }}>Marka</Text>
                                            <Text style={{ fontSize: 13, marginTop: 2 }}>{MarkaFiltreleri.length == 0 ? "Tümü" : MarkaFiltreleri.map((element, value) => (
                                                MarkaFiltreleri.length - 1 != value ?
                                                    <Text key={value}>{element} , </Text>
                                                    :
                                                    <Text key={value}>{element}</Text>
                                            ))}</Text>
                                        </View>
                                        <View style={{ width: "10%" }}><Ant name="right" size={25} color="black" /></View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setFilter(false), navigation.navigate('FilterFiyat') }}>
                                    <View style={{ width: "100%", height: 75, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "90%", flexDirection: "column" }}><Text style={{ fontSize: 17 }}>Fiyat</Text>
                                            <Text style={{ fontSize: 13, marginTop: 2 }}>{CekisFiltre.length == 0 ? "Tümü" : CekisFiltre.map((element, value) => (
                                                CekisFiltre.length - 1 != value ?
                                                    <Text key={value}>{element} ₺ - </Text>
                                                    :
                                                    <Text key={value}>{element} ₺</Text>
                                            ))}</Text>
                                        </View>
                                        <View style={{ width: "10%" }}><Ant name="right" size={25} color="black" /></View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setFilter(false), navigation.navigate('FilterYakit') }}>
                                    <View style={{ width: "100%", height: 75, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: "90%", flexDirection: "column" }}><Text style={{ fontSize: 17 }}>Yakıt Tipi</Text>
                                            <Text style={{ fontSize: 13, marginTop: 2 }}>{YakitFiltre.length == 0 ? "Tümü" : YakitFiltre.map((element, value) => (
                                                YakitFiltre.length - 1 != value ?
                                                    <Text key={value}>{element} , </Text>
                                                    :
                                                    <Text key={value}>{element} </Text>
                                            ))}</Text>
                                        </View>
                                        <View style={{ width: "10%" }}><Ant name="right" size={25} color="black" /></View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.button}>
                                    <Button
                                        title="Uygula"
                                        color="#32628d"
                                        onPress={() => {

                                        }}
                                    />
                                </View>
                            </ScrollView>
                        </View>

                    </View>

                </Modal>
            </View>
        </View>

    )

}

export default Tumilanlar


const styles = StyleSheet.create({
    flexView: {
        flex: 1,
        backgroundColor: "white",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,

    },
    modalContent: {
        backgroundColor: "white",
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: 400,
        paddingBottom: 20,
        height: 150
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    barIcon: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#bbb",
        fontSize: 24,
        marginTop: 100,
    },
    btnContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 500,
    },
    button: {


        width: "100%",
        marginTop: 20,
    },
});