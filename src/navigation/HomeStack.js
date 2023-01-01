import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'
import { React } from 'react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, AuthProvider } from './AuthProvider';
import Loading from '../utils/Loading';
import { BottomNavigation } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Properties from '../views/Properties'
import Profiles from '../views/Profiles'
import Kesfet from '../views/Kesfet'
import MyDocs from '../views/MyDocs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather'
import Icones from 'react-native-vector-icons/MaterialIcons'
import PostIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ant from 'react-native-vector-icons/AntDesign'
import UserProfile from '../views/UserProfile';
import PostPage from '../views/PostPage';
import Addilan from '../views/Addilan';
import Myilanlar from '../views/Myilanlar';
import Chat from '../views/Chat';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default HomeStack = () => {
  const ayarlar = {
 
  
 
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      //position:"absolute",
      height:50,
      backgroundColor: "white",
    }
  }
  const Butonm = (props) => {
    return (
      <TouchableOpacity onPress={() => props.onPress()} style={styles.customButton}>
        <Ant name="plus" size={25} color="white" />
      </TouchableOpacity>
    )

  }
  return (

    <Tab.Navigator initialRouteName='AnaSayfa'
      screenOptions={ayarlar}
    >

      <Tab.Screen
        name="AnaSayfa"
        component={MyDocs}
        options={{
          headerShown: false,
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Icones name="home" size={size} color={color} />
          )
        }} />

      <Tab.Screen
        name="PostPage"
        component={PostPage}
        options={{
          headerShown: false,
          tabBarLabel: "Postlar",
          tabBarIcon: ({ color, size }) => (
            <PostIcon name="post" size={size} color={color} />
          )
        }} />
      <Tab.Screen
        name="Myilanlar"
        component={Myilanlar}
        options={{
          tabBarButton: (props) => <Butonm {...props} />
        }} />
      {<Tab.Screen
        name="Kesfet"
        component={Kesfet}
        options={{
          headerShown: false,
          tabBarLabel: "İlanları Keşfet",
          tabBarIcon: ({ color, size }) => (
            <Icon name="play" size={size} color={color} />
          )
        }} />}
      <Tab.Screen
        name="Profile"
        component={Profiles}
        options={{
          headerShown: false,
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          )
        }} />
          

    </Tab.Navigator>

  )
}
const styles = StyleSheet.create({
  customButton: {
    backgroundColor: "#D61C4E",
    height: 60,
    width: 60,
    borderRadius: 80,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    bottom: 15,
  }
});
