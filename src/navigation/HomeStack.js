import { View, Text,TouchableOpacity,Alert } from 'react-native'
import {React} from 'react'
import {useContext, useEffect,useState}from 'react'
import { AuthContext, AuthProvider } from './AuthProvider';
import Loading from '../utils/Loading';
import { BottomNavigation } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { TabActions } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Properties from '../views/Properties'
import Profiles from '../views/Profiles'
import Kesfet from '../views/Kesfet'
import MyDocs from '../views/MyDocs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather'
import Icones from 'react-native-vector-icons/MaterialIcons'
import UserProfile from '../views/UserProfile';
import PostPage from '../views/PostPage';

const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();
export default  HomeStack = () => {
  return (
  
    <Tab.Navigator initialRouteName='AnaSayfa'>
    {/* <Tab.Screen 
       name="ilanlar"
       component={Properties}
       options={{
        headerShown:false,
        tabBarLabel:"İlanlar",
        tabBarIcon:({color,size})=>(
          <Ionicons name="document-text-outline" size={size} color={color} />
         )
       }}/> */}
      {/* <Tab.Screen 
       name="Ara"
       component={Properties}
       options={{
        headerShown:false,
        tabBarLabel:"Ara",
        tabBarIcon:({color,size})=>(
          <Icon name="search" size={size} color={color} />
         )
       }}/> */}
       <Tab.Screen 
       name="AnaSayfa"
       component={MyDocs}
       options={{
        headerShown:false,
        tabBarLabel:"Ana Sayfa",
        tabBarIcon:({color,size})=>(
          <Icones name="home" size={size} color={color} />
         )
       }}/>   
       <Tab.Screen 
       name="PostPage"
       component={PostPage}
       options={{
        headerShown:false,
        tabBarLabel:"Postlar",
        tabBarIcon:({color,size})=>(
          <Icones name="home" size={size} color={color} />
         )
       }}/>   
       { <Tab.Screen  
       name="Kesfet"
       component={Kesfet}
       options={{
        headerShown:false,
        tabBarLabel:"İlanları Keşfet",
        tabBarIcon:({color,size})=>(
          <Icon name="play" size={size} color={color} />
         )
       }}/>}
       <Tab.Screen 
       name="Profile"
       component={Profiles}
       options={{
        headerShown:false,
        tabBarLabel:"Profil",
        tabBarIcon:({color,size})=>(
          <Icon name="user" size={size} color={color} />
         )
       }}/>
         
    </Tab.Navigator>
    
    )
}

 