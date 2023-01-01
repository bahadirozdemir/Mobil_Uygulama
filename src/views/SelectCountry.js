import { View, Text, TouchableOpacity, StyleSheet,Button} from 'react-native'
import React, { useState,useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../navigation/AuthProvider'
import SelectList from 'react-native-dropdown-select-list';
import { createStackNavigator } from '@react-navigation/stack';
const cities = ['Ankara', 'İstanbul', 'İzmir', "Adana", "Adıyaman", "Afyon", 'Ağrı', "Aksaray", 'Amasya', 'Antalya', "Ardahan", 'Artvin',
    'Aydın', 'Balıkesir', "Bartın", "Batman", "Bayburt", 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', "Düzce", 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', "Iğdır", 'Isparta', "Kahramanmaraş", "Karabük", "Karaman", "Kars", 'Kastamonu',
    'Kayseri', "Kilis", "Kırıkkale", 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
    'Manisa', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', "Rize", 'Sakarya',
    'Samsun', "ŞanlıUrfa", 'Siirt', 'Sinop', "Şırnak", 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak',
    'Van', 'Yalova', 'Yozgat', 'Zonguldak'];
const countries =
    [

        ["Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Etimesgut", "Haymana", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Şereflikoçhisar", "Sincan", "Yenimahalle"],
        ["Adalar", "Bağcılar", "Bahçelievler", "Bakırköy", "Beşiktaş", "Beykoz", "Beyoğlu", "Büyükçekmece", "Çatalca", "Eminönü", "Esenler", "Eyüp", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sarıyer", "Silivri", "Şile", "Şişli", "Sultanbeyli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
        ["Aliağa", "Balçova", "Bayındır", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Dikili", "Foça", "Güzelbahçe", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
        ["Aladağ", "Ceyhan", "Feke", "Karaisalı", "Kozan", "Pozantı", "Saimbeyli", "Seyhan", "Yumurtalı", "Yüreğir"],
        ["Besni", "Gölbaşı", "Kahta", "Merkez"],
        ["Başmakçı", "Bolvadin", "Çay", "Çobanlar", "Dinar", "Emirdağ", "İhsaniye", "Kızılören", "Merkez", "Sandıklı", "Sincanlı", "Suhut", "Sultandağı"],
        ["Diyadin", "Doğubeyazıt", "Merkez", "Patnos", "Tutak"],
        ["Eskil", "Gülağaç", "Güzelyurt", "Merkez"],
        ["Göynücek", "Gümüşhacıköy", "Merkez", "Merzifon", "Suluova", "Taşova"],
        ["Akseki", "Alanya", "Elmalı", "Finike", "Gazipaşa", "İbradi", "Kale", "Kaş", "Korkuteli", "Kumluca", "Manavgat", "Merkez", "Serik"],
        ["Çıldır", "Göle", "Merkez"],
        ["Ardanuc", "Arhavi", "Hopa", "Merkez", "Murgül", "Savsat", "Yusufeli"],
        ["Bozdoğan", "Buharkent", "Çine", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Merkez", "Nazilli", "Söke", "Sultanhisar", "Yenihisar", "Yenipazar"],
        ["Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Kepsut", "Manyas", "Merkez", "Savaştepe", "Sındırgı", "Susurluk"],
        ["Amasra", "Merkez", "Ulus"],
        ["Hasankeyf", "Merkez"],
        ["Aydıntepe", "Demirözü", "Merkez"],
        ["Bozhüyük", "Gölpazarı", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt"],
        ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
        ["Adilcevaz", "Ahlat", "Güloymak", "Merkez", "Mutki", "Tatvan"],
        ["Dörtdivan", "Gerede", "Göynük", "Mengen", "Merkez", "Mudurnu", "Yeniçağa"],
        ["Ağlasun", "Bucak", "Çavdır", "Gölhisar", "Karamanlı", "Merkez", "Tefenni", "Yeşilova"],
        ["Gemlik", "Gürsu", "İnegöl", "İznik", "Karacabey", "Keleş", "Kestel", "Mudanya", "MustafaKemalPaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
        ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gölbaşı", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
        ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
        ["Alaca", "Boğazkale", "Iskılıp", "Kargı", "Mecitözü", "Merkez", "Oğuzlar", "Osmancık", "Sungurlu", "Uğurludağ"],
        ["Acıpayam", "Babadağ", "Buldan", "Çal", "Çardak", "Çivril", "Güney", "Holaz", "Kale", "Merkez", "Sarayköy", "Tavaş"],
        ["Çermik", "Eğil", "Ergani", "Hani", "Hazro", "Kocaköy", "Lice", "Merkez", "Silvan"],
        ["Akçakoca", "Çilimli", "Merkez", "Yığılca"],
        ["Enes", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Uzunköprü"],
        ["Ağin", "Arıcak", "Baskıl", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
        ["Çayırlı", "Ilıç", "Kemah", "Kemaliye", "Merkez", "Refahiye", "Tercan", "Üzümlü"],
        ["Aşkale", "Hınıs", "Horasan", "Ilıca", "İspir", "Narman", "Oltu", "Olur", "Pasinler", "Tortum"],
        ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Merkez", "Mihalıçcık", "Seyitgazi", "Sivrihisar"],
        ["Araban", "Islahiye", "Nizip", "Nurdağı", "Oğuzeli", "Şahinbey", "Şehitkamil", "Yavuzeli"],
        ["Alucra", "Bulancak", "Dereli", "Espiye", "Eynesil", "Görele", "Keşap", "Merkez", "Şebinkarahisar", "Tirebolu"],
        ["Kelkit", "Kurtun", "Merkez", "Şiran"],
        ["Çukurca", "Merkez", "Şemdilli", "Yüksekova"],
        ["Altınözü", "Belen", "Dörtyol", "Yüksekova", "Erzin", "İskenderun", "Kırıkhan", "Kumlu", "Merkez", "Reyhanlı", "Samandağı", "Yayladağı"],
        ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
        ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Sarkıkaraağaç", "Senirkent", "Sütçüler", "Uluborlu", "Yalvaç"],
        ["Afşın", "Andırın", "Çağlayancerit", "Elbistan", "Göksun", "Merkez", "Pazarcık"],
        ["Eskipazar", "Merkez", "Safranbolu"],
        ["Ayrancı", "Başyayla", "Ermenek", "Merkez"],
        ["Kağızman", "Merkez", "Sarıkamış"],
        ["Abana", "Arac", "Bozkurt", "Çatalzeytin", "Cide", "Daday", "Devrenkanı", "Hanönü", "İhsangazi", "İnebolu", "Küre", "Merkez", "Taşköprü", "Tosya"],
        ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melekgazi", "Özvatan", "Pınarbaşı", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
        ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
        ["Karakeçili", "Keskin", "Merkez", "Sulakyurt"],
        ["Babaski", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
        ["Akpınar", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
        ["Derince", "Gebze", "Gölcük", "Kandıra", "Karamürsel", "Merkez"],
        ["Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Çeltik", "Cihanbeyli", "Çumra", "Derbent", "Doğanhisar", "Emirgazi", "Ereğli", "Hadım", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Yunak"],
        ["Altıntaş", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Merkez", "Pazarlar", "Simav", "Tavşanlı"],
        ["Akçadağ", "Arapkır", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Hekimhan", "Merkez", "Pötürge", "Yazıhan", "Yeşilhan"],
        ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Kula", "Merkez", "Salihli", "Sarıhanlı", "Soma", "Turgutlu"],
        ["Derik", "Kızıltepe", "Mazıdağı", "Merkez", "Midyat", "Nusaybin", "Ömerli", "Savur"],
        ["Anamur", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Merkez", "Mut", "Silifke", "Tarsus"],
        ["Bodrum", "Datça", "Fathiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Merkez", "Milas", "Ortaca", "Ula", "Yatağan"],
        ["Bulanık", "Korkut", "Malazgirt", "Merkez"],
        ["Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
        ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Ulukışla"],
        ["Akkuş", "Fatsa", "Görköy", "Kabadüz", "Merkez", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
        ["Bahçe", "Kadirli", "Merkez"],
        ["Ardeşen", "Çayeli", "Fındıklı", "Merkez", "Pazar", "Çamlıhemşin"],
        ["Akyazı", "Geyve", "Hendek", "Karasu", "Kaynarca", "Merkez", "Sapanca", "Taraklı"],
        ["Alaçam", "Bafra", "Çarşamba", "Havza", "Kavak", "Ladik", "Merkez", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü"],
        ["Akçakale", "Birecik", "Bozova", "Halfeti", "Harran", "Hilvan", "Merkez", "Siverek", "Suruç", "Viranşehir"],
        ["Aydınlar", "Baykan", "Eruh", "Kurtalan", "Merkez"],
        ["Ayancık", "Boyabat", "Durağan", "Elfelek", "Gerze", "Merkez"],
        ["Cizre", "İdil", "Merkez", "Silopi"],
        ["Altınyayla", "Divriği", "Doğansar", "Gemerek", "Hafik", "Kangal", "Merkez", "Şarkışla", "Suşehri", "Yılızeli", "Zara"],
        ["Çerkezköy", "Çorlu", "Hayrabolu", "Malkara", "MarmaraEreğlisi", "Merkez", "Muratlı", "Saray", "Şarköy"],
        ["Almuz", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Zile"],
        ["Akçabat", "Araklı", "Arşin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Maçka", "Merkez", "Of", "Sürmene", "Tonya", "Vakfıkebir", "Yomra"],
        ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazimiye", "Pertek"],
        ["Banaz", "Eşme", "Merkez", "Sivaslı", "Ulubey"],
        ["Başkale", "Çaldıran", "Çatak", "Erciş", "Gevaş", "Gürpınar", "Merkez", "Muradiye", "Özalp"],
        ["Altınova", "Armutlu", "Merkez"],
        ["Boğazlıyan", "Çandır", "Çayıralan", "Merkez", "Sarıkaya", "Sefaatli", "Sorgun", "Yenifakili", "Yerköy"],
        ["Araplı", "Çaycuma", "Devrek", "Ereğli", "Merkez"],
        [],
    ];

export default SelectCountry = ({navigation}) => {

    const [deger, SetDeger] = useState(null);
    const [ilce, Setilce] = useState(null);
    const [sayi, Setsayi] = useState(81);
    const [currentuser, Setcurrentuser] = useState({});
    const {user} = useContext(AuthContext);
    const usercoll =firestore().collection("users");
    const hesapla = () => {

        const a = cities.findIndex(find => find == deger);
        Setsayi(a);
        
    }
    const sehrilcekaydet=()=>{
        if(deger!=null && ilce!=null)
        {
            usercoll.doc(user.uid).update({
                Adres:deger+" / "+ilce
            }).then(()=>{
               
                navigation.goBack();
            })
             
        }
        else
        {
            alert("Lütfen Gerekli Alanları Boş Bırakmayınız.");
        }
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <View style={{ alignItems: "stretch", width: "90%" }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 27 }}>Lütfen Konumunuzu Seçiniz.</Text>
                    <Text style={{ fontSize: 27 }}></Text>
                </View>
                <SelectList
                    data={cities}
                    setSelected={SetDeger}
                    onSelect={hesapla}
                    search={false}
                    placeholder="Lütfen Bir Şehir Seçiniz"
                />
                <Text></Text>
                <SelectList

                    data={countries[sayi]}
                    setSelected={Setilce}
                    search={false}
                    placeholder="Lütfen Bir İlçe Seçiniz"
                    
                />
                <Text style={{ fontSize: 27 }}></Text> 
                <View style={styles.button}>

                    <Button
                        title="Kaydet"
                        color="#B7950B"
                        onPress={sehrilcekaydet}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
})