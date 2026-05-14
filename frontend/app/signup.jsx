import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from "../api/api";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{8,15}$/;
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSignup = async () => {
    let newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8 to 15 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await api.post('/api/signup', {
          name,
          email,
          password,
        });

        Alert.alert('Success', response.data.message || 'Account created');
        router.push('/login');

      } catch (error) {
        console.log('SIGNUP ERROR:', error.response?.data);

        if (error.response) {
          Alert.alert('Error', error.response.data.message || 'Signup failed');
        } else {
          Alert.alert('Network Error', 'Server unreachable');
        }
      }
    }
  };


  return (
    <SafeAreaView >
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
        <Text style={styles.heading}>Create Your Account</Text>
        <Text style={styles.subheading}>Sign in to continue your professional journey.</Text>
        <View>
          <Text style={styles.Label}>Full Name</Text>
          <TextInput style={styles.InputFields}
            placeholder="Enter your full name"
            placeholderTextColor="#74777F99"
            value={name}
            onChangeText={setUsername}
          ></TextInput>
          <Text style={styles.Label}>Email</Text>
          <TextInput style={styles.InputFields}
            placeholder="student@gmail.com"
            placeholderTextColor="#74777F99"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          ></TextInput>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text style={styles.Label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={[styles.InputFields, styles.password]}
              placeholder="Create a password"
              placeholderTextColor="#74777F99"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            ></TextInput>

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
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <Text style={styles.Label}>Conform Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={[styles.InputFields, styles.password]}
              placeholder="Re-enter your password"
              placeholderTextColor="#74777F99"
              secureTextEntry={!showConformPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            ></TextInput>
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
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}
          <TouchableOpacity style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Create Account </Text>
          </TouchableOpacity>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.login}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                          <Text style={styles.loginText}>
                            Login
                          </Text>
                        </TouchableOpacity></View>
         
        </View>
      </View>
    </SafeAreaView>
  )
}

export default signup

const styles = StyleSheet.create({
  viewarea: {
    padding: 20,
    height:100 + '%',
    backgroundColor:"#fff"
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
    color: '#022448',
    textAlign: 'center',
    marginTop: 20,
  },
  subheading:{
    textAlign:'center',
    color:'#43474E',
    fontSize:18,
    marginBottom:16,
  },
  Label: {
    fontSize: 18,
    fontWeight: 500,
    color:'#43474E',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
  password: {
    flex: 1,
    position: 'relative'
  },
  eye: {
    position: 'absolute',
    right: 20
  },
  button: {
    height: 55,
    width: 100 + '%',
    backgroundColor: '#1E3A5F',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 600,
  },

line: {
  height: 1,
  width:'100%',
  backgroundColor: '#C4C6CF',
  marginVertical:16,
},
login: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: 'center',
    color:'#43474E',
  },
  loginText: {
    color: '#0061A5',
    textDecorationLine: 'underline',
    fontWeight: "500",
    fontSize: 17,
  },
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: -5,
    marginBottom: 5,
    paddingLeft: 10,
  },
})

