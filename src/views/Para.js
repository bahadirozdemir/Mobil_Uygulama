import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CurrencyInput from 'react-native-currency-input';

const Para = () => {
    const [value, setValue] = React.useState(2310.458);
    return (
        <CurrencyInput
          value={value}
          onChangeValue={setValue}
          suffix=" ₺"
          precision={0}
          minValue={0}
          onChangeText={(formattedValue) => {
            console.log(formattedValue); // R$ +2.310,46
          }}
        />
      );
    
}

export default Para

const styles = StyleSheet.create({})