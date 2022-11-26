import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import CurrencyInput from 'react-native-currency-input';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import uuid from 'react-native-uuid';
import ilanYukleniyor from '../utils/IlanYukleniyor';
import Ant from 'react-native-vector-icons/AntDesign'
import { Dropdown } from 'react-native-element-dropdown';
import { Formik } from 'formik';
import * as yup from 'yup';
const ImagePicker = require('react-native-image-picker');
let cities = ["Benzin", "Dizel"];

const registerSchema = yup.object().shape(
  {
    ilanbasligi: yup.string().required("İsim Boş Geçilemez"),
    marka: yup.string().required("Lütfen Bu Alanı Doldurun"),
    model: yup.string().required("Lütfen Bu Alanı Doldurun"),
    modelyil: yup.string().required("Lütfen Bu Alanı Doldurun"),
    yakitipi: yup.string().required("Lütfen Bu Alanı Doldurun"),
    vites: yup.string().required("Lütfen Bu Alanı Doldurun"),
    kasatipi: yup.string().required("Lütfen Bu Alanı Doldurun"),
    cekis: yup.string().required("Lütfen Bu Alanı Doldurun"),
    motorgucu: yup.string().required("Lütfen Bu Alanı Doldurun"),
    kilometre: yup.string().required("Lütfen Bu Alanı Doldurun"),
    takas: yup.string().required("Lütfen Bu Alanı Doldurun"),
    fiyat: yup.string().required("Lütfen Bu Alanı Doldurun"),
    ilanresim1: yup.string().required("Lütfen Bu Alanı Doldurun"),
    ilanresim2: yup.string().required("Lütfen Bu Alanı Doldurun"),
    ilanresim3: yup.string().required("Lütfen Bu Alanı Doldurun"),
    ilanresim4: yup.string().required("Lütfen Bu Alanı Doldurun")
  }
)
let arabalar = [
  {
    "Marka": 'Audi', "Modeller": [
      'A1',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'R8',
      'RS',
      'S',
      'TT'
    ]
  },
  {
    "Marka": 'Bentley', "Modeller": [
      'Arnage',
      'Azure',
      'Brooklands',
      'Continental',
      'Mulsanne',
    ]
  },
  {
    "Marka": 'BMW', "Modeller": [
      '118d',
      '120d',
      '116i',
      '120i',
      '130i',
      '316i',
      '320d',
      '320d xDrive',
      '320i',
      '325i',
      '325xi',
      '328i xDrive',
      '330d',
      '330i',
      '330i xDrive',
      '330xd',
      '335i',
      '335xi',
      '520i',
      '5.25d'
    ]
  },
  {
    "Marka": 'Chevrolet', "Modeller": [
      'Aveo',
      'Camaro',
      'Corvette',
      'Cruze',
      'Epica',
      'Lacetti',
      'Spark',
    ]
  },
  {
    "Marka": 'Chrysler', "Modeller": [
      '300 C',
      'Sebring'
    ]
  },
  {
    "Marka": 'Citroen', "Modeller": [
      'C1',
      'C3',
      'C3 Picasso',
      'C4',
      'C4 Grand Picasso',
      'C4 Picasso',
      'C5',
      'C6',
    ]
  },

  {
    "Marka": 'Dodge', "Modeller": [
      'Challenger',
      'Charger',
      'Magnum',
    ]
  },
  {
    "Marka": 'Fiat', "Modeller": [
      '500 Ailesi',
      'Albea',
      'Bravo',
      'Linea',
      'Palio',
      'Panda',
      'Punto',
      'Ulysse',
      'Egea',
    ]
  },
  {
    "Marka": 'Ford', "Modeller": [
      'C-Max',
      'Fiesta',
      'Focus',
      'Fusion',
      'Galaxy',
      'Grand C-Max',
      'Ka',
      'Mondeo',
      'Mustang',
      'S-Max',
    ]
  },
  {
    "Marka": 'Honda', "Modeller": [
      'Accord',
      'City',
      'Civic',
      'Jazz',
    ]
  },
  {
    "Marka": 'Hyundai', "Modeller": [
      'Accent Era',
      'Genesis',
      'Getz',
      'Grandeur',
      'i10',
      'i20',
      'i20 Troy',
      'i30',
      'iX20',
      'Matrix',
      'Sonata',
    ]
  },
  {
    "Marka": 'Kia', "Modeller": [
      'Carens',
      'Carnival',
      'Ceed',
      'Cerato',
      'Magentis',
      'Opirus',
      'Picanto',
      'Pro Ceed',
      'Rio',
      'Rondo',
      'Venga',
    ]
  },
  {
    "Marka": 'Mercedes', "Modeller": [
      'A180',
      'C180',
      'C200',
      'CLA200',
      'E250',
      'SLS AMG',
    ]
  },
  {
    "Marka": 'Mini', "Modeller": [
      'Cooper',
      'Cooper Clubman',
      'Cooper S',
      'John Cooper',
      'One'
    ]
  },
  {
    "Marka": 'Mitsubishi', "Modeller": [
      'Colt',
      'Lancer',
      'Lancer Evolution'
    ]
  },

  {
    "Marka": 'Opel', "Modeller": [
      'Astra',
      'Corsa',
      'Insignia',
      'Meriva',
      'Zafira',
    ]
  },
  {
    "Marka": 'Peugeot', "Modeller": [
      '107',
      '206',
      '206 +',
      '207',
      '308',
      '407',
      '508',
      'RCZ',
    ]
  },
  {
    "Marka": 'Porsche', "Modeller": [
      '911',
      'Boxster',
      'Cayman',
      'Panamera',
    ]
  },
  {
    "Marka": 'Renault', "Modeller": [
      'Clio',
      'Espace',
      'Fluence',
      'Grand Scenic',
      'Laguna',
      'Megane',
      'Symbol',
    ]
  },
  {
    "Marka": 'Seat', "Modeller": [
      'Alhambra',
      'Altea',
      'Exeo',
      'Ibiza',
      'Leon',
    ]
  },
  {
    "Marka": 'Skoda', "Modeller": [
      'Fabia',
      'Octavia',
      'Roomster',
      'Superb',
    ]
  },
  {
    "Marka": 'Subaru', "Modeller": [
      'Impreza',
      'Legacy'
    ]
  },
  {
    "Marka": 'Suzuki', "Modeller": [
      'Alto',
      'Splash',
      'Swift',
      'SX4'
    ]
  },
  {
    "Marka": 'Tata', "Modeller": [
      'Indica',
      'Indigo',
      'Marina'
    ]
  },
  {
    "Marka": 'Tesla', "Modeller": [
      'Indica',
      'Indigo',
      'Marina'
    ]
  },
  {
    "Marka": 'Toyota', "Modeller": [
      'Auris',
      'Avensis',
      'Camry',
      'Corolla',
      'Prius',
      'Urban Cruiser',
      'Verso',
      'Yaris',
    ]
  },
  {
    "Marka": 'Volkswagen', "Modeller": [
      'EOS',
      'Golf',
      'Jetta',
      'Passat',
      'Passat Variant',
      'Polo',
      'Scirocco',
      'Sharan',
      'Touran',
      'VW CC',
    ]
  },
  {
    "Marka": 'Volvo', "Modeller": [
      'C30',
      'C70',
      'S40',
      'S60',
      'S80',
      'V50',
      'V60',
      'V70'
    ]
  },
];







const data = [
  { label: "A", value: "1" }
];
export default Addilan = ({ navigation }) => {
  //Gerekli State Değişkenleri
  const { user } = useContext(AuthContext);
  const [currentuser, Setcurrentuser] = useState([]);
  const [modeller, setModel] = useState([])
  const [markalar, setMarka] = useState([])
  const [yillar, setYillar] = useState([])
  const [YakitTip, setYakitTipi] = useState([])
  const [VitesTuru, setVitesTuru] = useState([])
  const [KasaTipi, setKasatipi] = useState([])
  const [CekisTipi, setCekisTipi] = useState([])
  const [MotorGucu, setMotorGucu] = useState([])
  const [Takas, setTakas] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [value, setValue] = useState();
  const [AracFiyat, setAracFiyat] = useState();
  const [yuklenenresim1, setYuklenenResim1] = useState(false);
  const [yuklenenresim2, setYuklenenResim2] = useState(false);
  const [yuklenenresim3, setYuklenenResim3] = useState(false);
  const [yuklenenresim4, setYuklenenResim4] = useState(false);


  useEffect(() => {
    //Kullanıcıyı Al
    firestore().collection("users").doc(user.uid).get().then(response=>{
      Setcurrentuser(response.data())
    })
    // Yıl Dizisini Ayarlamak
    let yilbasla = new Date().getFullYear();
    let yillardizisi = [];
    const guncelyil = 1949;
    for (let index = yilbasla; index > guncelyil; index--) {
      let yilverisi = { label: index.toString(), key: 2022 - index }
      yillardizisi.push(yilverisi);
    }
    setYillar(yillardizisi);
    ///Yakıt Tipi Ayarlaması
    let yakitipi = [{ label: "Benzin", key: 0 }, { label: "Dizel", key: 1 }, { label: "Elektrik", key: 2 }];
    setYakitTipi(yakitipi);
    //Araç Markalarını Ayarlamak
    let dizi = [];
    arabalar.forEach((element, index) => {
      let veri = { label: element.Marka, key: index }
      dizi.push(veri);
    });
    setMarka(dizi);
    //Vites Türü Ayarlamak
    let vitesdizi = [{ label: "Otomatik", key: 0 }, { label: "Manuel", key: 1 }, { label: "Yarı Otomatik", key: 2 }];
    setVitesTuru(vitesdizi);
    //Kasa Tipi
    let kasatipidizi = [{ label: "Sedan", key: 0 }, { label: "Hatcback", key: 1 }];
    setKasatipi(kasatipidizi);
    //Çekiş
    let cekistipidizi = [{ label: "Önden Çekiş", key: 0 }, { label: "Arkadan İtiş", key: 1 }];
    setCekisTipi(cekistipidizi);
    //Motor Gücü
    let motorgucudizi = [];
    let arttir = 0;
    for (let index = 60; index < 1000; index = index + 10) {
      let motorgucuverisi = { label: index.toString() + "hp", key: arttir }
      arttir++;
      motorgucudizi.push(motorgucuverisi);
    }
    setMotorGucu(motorgucudizi);
    //Takas
    let TakasDizi = [{ label: "Evet", key: 0 }, { label: "Hayır", key: 1 }];
    setTakas(TakasDizi);
    setTimeout(() => {
      setisLoading(false);
    }, 1500);


  }, [])
  //İlan Ekleme Fonksiyonu
  const İlaniEkle = (values) => {
    let whilecheck = true;
    let check = 0;
    let x = [{

      ilanBaslik: values.ilanbasligi,
      Cekis: values.cekis,
      Marka: values.marka,
      Model: values.model,
      Fiyat: values.fiyat,
      KasaTipi: values.kasatipi,
      Kilometre: values.kilometre,
      Modelyil: values.modelyil,
      Motorgucu: values.motorgucu,
      Takas: values.takas,
      Vites: values.vites,
      YakitTipi: values.yakitipi,
      ilanid: "",
      ilanTarihi:(new Date().getDate())+"."+(new Date().getMonth()+1)+"."+new Date().getFullYear(),
      ilanyapan: "",
      ilanyapanid: "",
      Begenenler: [],
      Yorumlar: [],
    }]
    let unique = uuid.v4();
    let ilandizisi = [];
    firestore().collection("ilanlar").get().then(result => {
      result.forEach(element => {
        ilandizisi = element.data().userilan;
      });
    })
    while (whilecheck) {
      ilandizisi.forEach(dizim => {
        if (dizim.ilanid == unique) {
          check++;
          unique = uuid.v4();
        }

      })
      if (check == 0) {
        x[0].ilanid = unique;
        x[0].ilanyapan = currentuser.Name + " " + currentuser.Surname;
        x[0].ilanyapanid = user.uid;
        whilecheck = false;
      }
      check = 0;
    }

    let checkuser = false;

    const veritabaninaekle = async () => {
      await firestore().collection("ilanlar").get().then(async (veriler) => {
        veriler.forEach(element => {
          if (user.uid == element.id) {
            checkuser = true;
            firestore().doc("ilanlar/" + user.uid).update({
              userilan: firestore.FieldValue.arrayUnion(...x)
            }).then(result => {
              console.log("Update Edildi")
              for(let index=0;index < 4;index++)
              {
              resimlerigonder(index).then(q => {           
              })
            } 
            })
          }
        })
        if (checkuser == false) {
          firestore().doc("ilanlar/" + user.uid).set({
            userilan: firestore.FieldValue.arrayUnion(...x)
          }).then(result => {
            console.log("Sıfırdan Eklendi")
            for(let index=0;index < 4;index++)
            {
              resimlerigonder(index).then(q => {           
            })
          } 
          })
        }
      })
    }
    veritabaninaekle();
    resimleradi = ["Resim1", "Resim2", "Resim3", "Resim4"];
    resimlerindizisi = [values.ilanresim1, values.ilanresim2, values.ilanresim3, values.ilanresim4]
    const resimlerigonder = (index) => {
      return new Promise((resolve, reject) => {
        const ref = storage().ref("Uploads/" + user.uid + "/ilanResimleri/" + unique + "/data" + index);
        const task = ref.putFile(resimlerindizisi[index]);
        task.then(() => {
          const url = storage().ref("Uploads/" + user.uid + "/ilanResimleri/" + unique + "/data" + index).getDownloadURL();
          if (url) {
            resolve(url);
          }
          else {
            reject("Url Boş Döndü")
          }
        })
       
      })




    }
    whilecheck = true;
    navigation.navigate('Loadingilan');
  }
  const ModelDegistir = (model) => {

    arabalar.forEach(element => {
      if (element.Marka == model) {
        let arr = [];
        element.Modeller.forEach((x, index) => {
          let degerler = { label: x, key: index }
          arr.push(degerler);
        });
        setModel(arr);
      }
    });
  }


  if (isLoading == true) {
    return <Loading />
  }
  return (

    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "white", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Formik
          initialValues={{ ilanbasligi: "", marka: "", model: "", modelyil: "", yakitipi: "", vites: "", kasatipi: "", cekis: "", motorgucu: "", kilometre: "", takas: "", fiyat: "", ilanresim1: "", ilanresim2: "", ilanresim3: "", ilanresim4: "" }}
          validationSchema={registerSchema}
          onSubmit={(values) => İlaniEkle(values)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
            <>
              <View style={{ position: "relative", width: "100%", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>İlan Resimleri</Text>
                <View style={styles.resimkutusu}>
                  <TouchableOpacity onPress={() => {
                    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
                      if (!response.didCancel) {
                        console.log(response.assets[0]);
                        setYuklenenResim1(response.assets[0].uri);
                        values.ilanresim1 = response.assets[0].uri;
                      }
                    });
                  }}><View style={errors.ilanresim1 && touched.ilanresim1 ? styles.resimkutularierror : styles.resimkutulari}>{yuklenenresim1 == false ? <Ant name="plus" size={55} color="gray" /> : <ImageBackground source={{ uri: yuklenenresim1 }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center" }} />}</View></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
                      if (!response.didCancel) {
                        setYuklenenResim2(response.assets[0].uri);
                        values.ilanresim2 = response.assets[0].uri;
                      }
                    });
                  }}><View style={errors.ilanresim2 && touched.ilanresim2 ? styles.resimkutularierror : styles.resimkutulari}>{yuklenenresim2 == false ? <Ant name="plus" size={55} color="gray" /> : <ImageBackground source={{ uri: yuklenenresim2 }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center" }} />}</View></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
                      if (!response.didCancel) {
                        setYuklenenResim3(response.assets[0].uri);
                        values.ilanresim3 = response.assets[0].uri;
                      }
                    });
                  }}><View style={errors.ilanresim4 && touched.ilanresim4 ? styles.resimkutularierror : styles.resimkutulari}>{yuklenenresim3 == false ? <Ant name="plus" size={55} color="gray" /> : <ImageBackground source={{ uri: yuklenenresim3 }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center" }} />}</View></TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
                      if (!response.didCancel) {
                        setYuklenenResim4(response.assets[0].uri);
                        values.ilanresim4 = response.assets[0].uri;
                      }
                    });
                  }}><View style={errors.ilanresim4 && touched.ilanresim4 ? styles.resimkutularierror : styles.resimkutulari}>{yuklenenresim4 == false ? <Ant name="plus" size={55} color="gray" /> : <ImageBackground source={{ uri: yuklenenresim4 }} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center" }} />}</View></TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "90%", margin: 12, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>İlan Başlığı</Text>
                <TextInput
                  name="ilanbasligi"
                  style={errors.ilanbasligi && touched.ilanbasligi ? styles.input2 : styles.input}
                  onChangeText={handleChange('ilanbasligi')}
                  onBlur={handleBlur('ilanbasligi')}
                  placeholder=" İlan Başlığını Giriniz."
                  value={values.ilanbasligi}
                />
              </View>

              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Marka</Text>
                <Dropdown
                  name="marka"
                  style={errors.marka && touched.marka ? styles.dropdownerror : styles.dropdown}
                  data={markalar}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.marka = item.label;
                    ModelDegistir(values.marka);
                    values.model = "";
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Model</Text>
                <Dropdown
                  name="model"
                  style={errors.model && touched.model ? styles.dropdownerror : styles.dropdown}
                  data={modeller}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.model = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Model Yılı</Text>
                <Dropdown
                  name="modelyil"
                  style={errors.modelyil && touched.modelyil ? styles.dropdownerror : styles.dropdown}
                  data={yillar}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.modelyil = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Yakıt Tipi</Text>
                <Dropdown
                  name="yakitipi"
                  style={errors.yakitipi && touched.yakitipi ? styles.dropdownerror : styles.dropdown}
                  data={YakitTip}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.yakitipi = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Vites</Text>
                <Dropdown
                  name="vites"
                  style={errors.vites && touched.vites ? styles.dropdownerror : styles.dropdown}
                  data={VitesTuru}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.vites = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Kasa Tipi</Text>
                <Dropdown
                  name="kasatipi"
                  style={errors.kasatipi && touched.kasatipi ? styles.dropdownerror : styles.dropdown}
                  data={KasaTipi}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.kasatipi = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Çekiş</Text>
                <Dropdown
                  name="cekis"
                  style={errors.cekis && touched.cekis ? styles.dropdownerror : styles.dropdown}
                  data={CekisTipi}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.cekis = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Motor Gücü</Text>
                <Dropdown
                  name="motorgucu"
                  style={errors.motorgucu && touched.motorgucu ? styles.dropdownerror : styles.dropdown}
                  data={MotorGucu}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder='Lütfen Seçiniz'
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    values.motorgucu = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Takas</Text>
                <Dropdown
                  name="takas"
                  style={errors.takas && touched.takas ? styles.dropdownerror : styles.dropdown}
                  data={Takas}
                  maxHeight={300}
                  labelField="label"
                  valueField="key"
                  placeholder={"Lütfen Seçiniz"}
                  onChange={(item) => {
                    values.takas = item.label;
                  }}
                />
              </View>
              <View style={{ width: "43%", margin: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Kilometre</Text>
                <CurrencyInput
                  name="kilometre"
                  style={errors.kilometre && touched.kilometre ? styles.input2 : styles.input}
                  value={value}
                  onChangeValue={setValue}
                  precision={0}
                  minValue={0}
                  onChangeText={(formattedValue) => {
                    values.kilometre = formattedValue;
                  }}
                />

              </View>
              <View style={{ width: "90%", margin: 12, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 7 }}>Fiyat</Text>
                <CurrencyInput
                  name="fiyat"
                  style={errors.fiyat && touched.fiyat ? styles.input2 : styles.input}
                  value={AracFiyat}
                  suffix=" ₺"
                  onChangeValue={setAracFiyat}
                  precision={0}
                  minValue={0}
                  onChangeText={(formattedValue) => {
                    values.fiyat = formattedValue;
                  }}
                />
              </View>

              <View style={{ width: "100%", alignItems: "center" }}>
                <View style={styles.button}>
                  <Button
                    title="İlanı Oluştur"
                    color="#B7950B"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 0.5,
    width: "100%",
    borderRadius: 10,
    textAlign: "center"
  },
  input2: {
    height: 45,
    borderWidth: 0.5,
    width: "100%",
    borderRadius: 10,
    borderColor: "red",
    textAlign: "center"
  },
  button:
  {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,


  },
  baslik:
  {
    fontSize: 25,
    fontWeight: 'bold',
    color: "black"

  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlign: "center"
  },
  dropdownerror: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: "red"
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  resimkutusu: {
    width: "90%", borderWidth: 1, borderColor: "gray", flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center"
  },
  resimkutulari:
  {
    width: 100, height: 100, borderWidth: 1, borderColor: "gray", margin: 10, alignItems: "center", justifyContent: "center"
  },
  resimkutularierror: {
    width: 100, height: 100, borderWidth: 1, borderColor: "red", margin: 10, alignItems: "center", justifyContent: "center"
  }
});