import React,{useEffect}from 'react'
import Routes from './src/routes/Routes'
import {AuthProvider} from './src/navigation/AuthProvider'
import { View ,Text} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
export default App = () => {
useEffect(() => {
  SplashScreen.hide();
}, [])

 
  return (
      <AuthProvider>
        <Routes/>
      </AuthProvider> 
        
     
  )
    
 
}

