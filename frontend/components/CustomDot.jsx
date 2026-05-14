import { View, Text } from 'react-native'
import React from 'react'

const CustomDot = ({ selected }) => {
  return (
   <View
      style={{
        width: selected ? 25 : 8,
        height: 8,
        borderRadius: 8,
        marginHorizontal: 4,
        backgroundColor: selected ? '#A92589' : 'gray',
      }}
    />
  )
}

export default CustomDot