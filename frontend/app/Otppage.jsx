import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react'
import api from '../api/api'

const Otppage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const params = useLocalSearchParams();
  const email = params?.email || '';

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);


  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 4) {
      Alert.alert('Error', 'Enter complete OTP');
      return;
    }

    try {
      await api.post('/api/verify-otp', {
        email: email.trim(),
        otp: enteredOtp,
      });


      router.push({
        pathname: '/newpassword',
        params: { email: email.trim() },
      });

    } catch (error) {
      console.log('VERIFY OTP ERROR:', error.response?.data);

      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Invalid OTP');
      } else {

        Alert.alert('Network Error', 'Server unreachable');
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post('/api/forgot-password', {
        email: email.trim(),
      });

      setTimer(60);
      setOtp(['', '', '', '']);

      Alert.alert('Success', 'OTP resent to your email');

    } catch (error) {
      console.log('RESEND OTP ERROR:', error.response?.data);

      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Failed to resend OTP');
      } else {
        Alert.alert('Network Error', 'Server unreachable');
      }
    }
  };


  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return '';

    const [name, domain] = email.split('@');

    if (!name) return email;

    const visible = name.slice(0, 4);
    const masked = '*'.repeat(Math.max(name.length - 4, 0));

    return `${visible}${masked}@${domain}`;
  };

  const handleOtpChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index]) {

        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {

        inputRefs.current[index - 1].focus();

        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
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
        }} onPress={() => router.push('/forgetpasspage1')}>
          <Ionicons name='arrow-back' color={"#fff"} size={28} />
        </TouchableOpacity>
        <Text style={styles.heading}>Verify Your Code</Text>
        <Text style={styles.subheading}>
          A verification code has been sent to {maskEmail(email)}.
          Enter it below to continue.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.InputFields}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={styles.waitcontainer}>Didn’t receive the code? </Text>
          {timer > 0 ? (
            <Text style={styles.waitText}>Wait ({timer}s)</Text>
          ) : (
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.waitText}>Resend Code</Text>
            </TouchableOpacity>
          )}</View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Otppage

const styles = StyleSheet.create({
  viewarea: {
    padding: 20,
    height: 100 + '%',
    backgroundColor:'#fff'
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
  InputFields: {
    color: '#74777F99',
    height: 80,
    width: 70,
    borderRadius: 25,
    fontSize: 45,
    textAlign: 'center',
    backgroundColor:'#F2F4F7',
  },
  waitcontainer: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: 'center',
    color:'#43474E',
  },
  waitText: {
    color: '#0061A5',
    fontWeight: "500",
    fontSize: 17,
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