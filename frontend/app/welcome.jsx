import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '@react-navigation/elements'
import { useRouter } from 'expo-router';
const welcome = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ImageBackground source={require('../assets/images/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.TextView}>
          <Text style={styles.SubTitle}>Welcome to</Text>
          <Text style={styles.Title}>Career Path Prediction</Text>
          <Text style={styles.SubTitle}>Discover Your Ideal Career Path</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.Register}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.registerText}>
                Register
              </Text>
            </TouchableOpacity></View>
        </View>
      </ImageBackground>

    </SafeAreaView>
  )
}

export default welcome

const styles = StyleSheet.create({
  background: {
    height: 100 + '%',
    width: 100 + '%',
  },
  TextView: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    height: 306,
    width: 100 + '%',
    gap: 15
  },
  Title: {
    fontWeight: "700",
    fontSize: 32,
    color: '#fff'
  },
  SubTitle: {
    fontWeight: "500",
    fontSize: 19,
    color: '#fff'
  },
  Register: {
    fontWeight: "500",
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
  registerText: {
    color: '#A92589',
    textDecorationLine: 'underline',
    fontWeight: "500",
    fontSize: 17,
  },
  button: {
    height: 50,
    width: 100 + '%',
    backgroundColor: '#A92589',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
  }
})