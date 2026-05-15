import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const _layout = () => {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const rememberMe = await AsyncStorage.getItem("rememberMe");

        if (userId && rememberMe === "true") {
          router.push("/(tabs)/Home");
        } 
      } catch (error) {
        console.log(error);
        router.push("/login");
      } 
    };

    checkLogin();
  }, []);

  // 🔥 IMPORTANT: block UI until check is done
  

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
};

export default _layout;