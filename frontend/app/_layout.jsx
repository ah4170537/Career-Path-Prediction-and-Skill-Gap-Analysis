import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"
import { Provider } from "react-redux";
import { store } from "../store/store";


const _layout = () => {
  return (
    <Provider store={store}>
    <Stack
      // Point to the name of the folder group, not the file path
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="personalinfo" />
      <Stack.Screen name="(tabs)" />
    </Stack>
    </Provider>
  )
}

export default _layout