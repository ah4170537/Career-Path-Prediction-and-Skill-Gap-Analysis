import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api'

const newpassword = () => {
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const params = useLocalSearchParams();
  const [id, setId] = useState(null);
const [email, setEmail] = useState('');

  useEffect(() => {
  const loadStatus = async () => {
    try {
      const status = await AsyncStorage.getItem("profileCompleted");
      const userId = await AsyncStorage.getItem("userId");
      const userEmail = await AsyncStorage.getItem("userEmail");
       const parsedStatus = status === "true";

      setProfileCompleted(parsedStatus);
      setId(userId);
      setEmail(userEmail || '');
      console.log("STATUS:", parsedStatus);
      console.log("ID:", userId);
      console.log("EMAIL:", userEmail);


      const email = '';

      if (userId && userEmail) {
        email = userEmail;
      } else {
        email = params?.email || '';
      }

      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  loadStatus();
}, []);



  const handleResetPassword = async () => {
    setError('');

    if (!password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password.length < 8 || password.length > 15) {
      setError('Password must be 8–15 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/api/reset-password', {
        email: email.trim(),
        password,
      });

       if (id) {
      router.push('/profile');   // or '/(tabs)/profile'
      Alert.alert('Success', 'Password updated');
    } else {
      router.push('/login');
      Alert.alert('Success', 'Password updated');
    }

    } catch (error) {
      console.log('RESET PASSWORD ERROR:', error.response?.data);

      if (error.response) {

        setError(error.response.data.message || 'Failed to reset password');
      } else {
        Alert.alert('Network Error', 'Server unreachable');
      }
    }
  };

  useEffect(() => {
    console.log('EMAIL FROM PARAMS:', email);
  }, [email]);

  return (
    <SafeAreaView>
      <View style={styles.viewarea}>
        {(!profileCompleted &&
        <TouchableOpacity style={{
          width: 40,
          height: 40,
          backgroundColor: "#022448",
          borderRadius: 20,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center"
        }} onPress={() => router.push('/Otppage')}>
          <Ionicons name='arrow-back' color={"#fff"} size={28} />
        </TouchableOpacity>
        )}
        <Text style={styles.heading}>Create a New Password</Text>
        <Text style={styles.subheading}>Enter your new password</Text>
        <Text style={styles.Label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.InputFields, styles.password]}
            placeholder="Enter your password"
            placeholderTextColor="#74777F99"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eye}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#74777F99"
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 500, }}>Conform Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.InputFields, styles.password]}
            placeholder="Enter your password"
            placeholderTextColor="#74777F99"
            secureTextEntry={!showConformPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConformPassword(!showConformPassword)}
            style={styles.eye}>
            <Ionicons
              name={showConformPassword ? 'eye' : 'eye-off'}
              size={22}
              color="#74777F99"
            />
          </TouchableOpacity>
        </View>
        {error ? (
          <Text style={{ color: 'red', marginLeft: 10 }}>{error}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default newpassword

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
    backgroundColor:'#F2F4F7',
    height: 60,
    borderRadius: 15,
    marginVertical: 10,
   color: '#74777F99',
    fontSize: 17,
    paddingHorizontal: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  password: {
    flex: 1,
    position: 'relative'
  },
  eye: {
    position: 'absolute',
    right: 20
  },
})