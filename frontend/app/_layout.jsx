import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"


const _layout = () => {
  return (
    <Stack
      // Point to the name of the folder group, not the file path
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}

export default _layout