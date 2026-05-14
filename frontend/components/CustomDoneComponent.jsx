import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const CustomDoneComponent = () => {
    const router = useRouter();
  return (
    
    <TouchableOpacity style={{
        width:40,
        height:40,
        backgroundColor:"#A92589",
        borderRadius:20,
        marginRight:10,
        alignItems:"center",
        justifyContent:"center"
    }} onPress={() => router.push('/welcome')}>
      <Ionicons name='arrow-forward' color={"#fff"} size={28}/>
    </TouchableOpacity>
  )
}

export default CustomDoneComponent