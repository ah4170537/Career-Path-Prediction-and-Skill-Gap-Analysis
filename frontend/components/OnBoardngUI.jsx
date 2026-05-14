import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width, height } = Dimensions.get("window")
const OnBoardngUI = ({ title, subtitle, img }) => {
  const images = [
    require("../assets/images/on-1.png"),
    require("../assets/images/on-2.png"),
    require("../assets/images/on-3.png"),
  ]
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images[img]} resizeMode='cover' />
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{
          subtitle
        }</Text>
      </View>
    </SafeAreaView>
  )
}

export default OnBoardngUI

const styles = StyleSheet.create({
  container: {
    width: width,
    marginTop: 0,
    height: height,
    position: "relative"
  },
  textView: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    bottom: 0,
    height: 306,
    gap: 22
  },
  title: {
    fontWeight: "900",
    fontSize: 32,
    textAlign: "center",
    color: "#1F1F1F"
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#6D6A6A"
  }
})