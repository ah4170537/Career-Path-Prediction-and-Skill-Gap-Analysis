import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import api from "../api/api";

const forgetpasspage1 = () => {


  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleContinue = async () => {
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      const response = await api.post('/api/forgot-password', {
        email: email.trim(),
      });

      router.push({
        pathname: '/Otppage',
        params: { email: email.trim() },
      });

    } catch (error) {
      console.log('FORGOT ERROR:', error.response?.data);

      if (error.response) {

        setError(error.response.data.message || 'Something went wrong');
      } else {

        alert('Server unreachable. Check your internet or backend.');
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.viewarea}>
        <TouchableOpacity style={{
          width: 40,
          height: 40,
          backgroundColor: "#022448",
          borderRadius: 20,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center"
        }} onPress={() => router.push('/login')}>
          <Ionicons name='arrow-back' color={"#fff"} size={28} />
        </TouchableOpacity>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subheading}>Recover your account password</Text>
        <Text style={styles.Label}>Email</Text>
        <TextInput style={styles.InputFields}
          placeholder="Enter your email address"
          placeholderTextColor="#74777F99"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        ></TextInput>
        {error ? <Text style={{ color: 'red', marginLeft: 10 }}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default forgetpasspage1

const styles = StyleSheet.create({
  viewarea: {
    padding: 20,
    height: 100 + '%',
    backgroundColor:'#fff',
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: '#022448',
    textAlign: 'center',
    marginTop: 20,
  },
  subheading: {
    fontSize: 17,
    textAlign: 'center',
    color:'#43474E',
    marginTop: 5,

  },
  Label: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: 50,
    color:'#43474E',
  },
  InputFields: {
    height: 60,
    borderRadius: 15,
    marginVertical: 10,
    color: '#74777F99',
    fontSize: 17,
    paddingHorizontal: 20,
    backgroundColor:'#F2F4F7',
  },
  button: {
    height: 55,
    width: 100 + '%',
    backgroundColor: '#1E3A5F',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 600,
  },
})