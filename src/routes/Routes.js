import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../navigation/AuthProvider'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Loading from '../utils/Loading'
import AuthStack from '../navigation/AuthStack'
import HomeStack from '../navigation/HomeStack'
import Myilanlar from '../views/Myilanlar'
import Para from '../views/Para'
import Profiles from '../views/Profiles'
import Addilan from '../views/Addilan'
import IlanYukleniyor from '../utils/IlanYukleniyor'
import SelectCountry from '../views/SelectCountry'
import Phone from '../views/Phone'
import Dtarihi from '../views/Dtarihi'
import Tumilanlar from '../views/Tumilanlar'
import About from '../views/About'
import UserProfile from '../views/UserProfile'
import Detail from '../views/Detail'
export default Routes = () => {
  const Stack = createStackNavigator();
  const { SignOut } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true);
  const [isInitial, setisInitial] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (isInitial) {
      setisInitial(false);
    }
    setisLoading(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;

  }, []);
  if (isLoading == true) {
    return <Loading />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ?
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          :
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />}
        <Stack.Screen
          name="Profiles"
          component={Profiles}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Myİlanlar'
          component={Myilanlar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UserProfile'
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Addilan'
          component={Addilan}
          options={{ title: 'İlan Ekle' }}
        />
         <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ title: 'İlan Detayları' }}
        />
          <Stack.Screen
          name='Tumilanlar'
          component={Tumilanlar}
          options={{ title: 'Tüm İlanlar' }}
        />
          <Stack.Screen
          name='About'
          component={About}
          options={{ title: 'Bilgilendirme' }}
        />
        <Stack.Screen
          name='Loadingilan'
          component={IlanYukleniyor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectCountry"
          component={SelectCountry}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Phone"
          component={Phone}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dtarihi"
          component={Dtarihi}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

