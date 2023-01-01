import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'
export const FilterContext = createContext({});
export const GlobalFilter = ({children}) => {
const [msg, setMsg] = useState("Merhaba Kardeşim");
const [filtermodal, setFilter] = useState(false)
const [MarkaFiltreleri, setMarkaFiltreleri] = useState([])
const [CekisFiltre, setCekisFiltre] = useState([])
const [YakitFiltre, setYakitFiltre] = useState([])
  return (
    <FilterContext.Provider
    value={{
        msg,setMsg,filtermodal,setFilter,MarkaFiltreleri,setMarkaFiltreleri,CekisFiltre,setCekisFiltre,YakitFiltre,setYakitFiltre
    }}>
    {children}
</FilterContext.Provider>
  )
}


const styles = StyleSheet.create({})