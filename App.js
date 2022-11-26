import React from 'react'
import Routes from './src/routes/Routes'
import {AuthProvider} from './src/navigation/AuthProvider'
import { View ,Text} from 'react-native'
export default App = () => {
  return (
      <AuthProvider>
        <Routes/>
      </AuthProvider> 
        
     
  )
    
 
}

