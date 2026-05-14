import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import api from "../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    let newErrors = {};

    if (!email || !password) {
      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';
      setErrors(newErrors);
      return;
    }

    try {
      const response = await api.post('/api/login', {
        email,
        password,
      });
      
      const userData = response.data.user; 
      const id = userData.Userid; // फर्ज करें backend ID bhej raha hai
console.log("----------------------------");
      console.log("USER LOGGED IN SUCCESSFULLY!");
      console.log("USER ID:", id);
      console.log("----------------------------");
      // ✅ UserId ko phone ki memory mein save karein
    

    
// ✅ await lagana lazmi hai
await AsyncStorage.setItem('userId', id);
      console.log('LOGIN SUCCESS:', response.data);

      const nameValue = response.data.user?.name || 'User'; 
// const imageValue = response.data.profileImage || null;

      router.push({
  pathname: '/(tabs)/Home',
  params: {
    userName: nameValue, 
    // userImage: imageValue
  }
});

    } catch (error) {
      console.log('LOGIN ERROR:', error.response?.data);

      if (error.response) {
        setErrors({ form: error.response.data.message || 'Login failed' });
      } else {
        setErrors({ form: 'Network error' });
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
        }} onPress={() => router.push('/welcome')}>
          <Ionicons name='arrow-back' color={"#fff"} size={28} />
        </TouchableOpacity>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>Sign in to continue your professional journey.</Text>
        <View>
          <Text style={styles.Label}>Email</Text>
          <TextInput style={styles.InputFields}
            placeholder="Enter your email address"
            placeholderTextColor="#74777F99"
            value={email}          // ✅ value must be state variable
            onChangeText={setEmail} // ✅ updates the state
            autoCapitalize="none"
          ></TextInput>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text style={styles.Label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput style={[styles.InputFields, styles.password]}
              placeholder="Enter your password"
              placeholderTextColor="#74777F99"
              secureTextEntry={!showPassword}
              value={password}         // ✅ value must be state variable
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

          {errors.form && <Text style={styles.error}>{errors.form}</Text>}
          <TouchableOpacity onPress={() => router.push('/forgetpasspage1')}>
            <Text style={styles.forgot}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
  <View style={styles.line} />

  <Text style={styles.dividerText}>
    OR
  </Text>

  <View style={styles.line} />
</View>
<TouchableOpacity style={styles.googleButton}>
  <Image
    source={require('../assets/images/google.jpg')}
    style={styles.googleIcon}
  />

  <Text style={styles.googleText}>
    Continue with Google
  </Text>
</TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.Register}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.registerText}>
                Register
              </Text>
            </TouchableOpacity></View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
  viewarea: {
    padding: 20,
    height:100 + '%',
    backgroundColor:'#fff'
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
  forgot: {
    fontSize: 16,
    color: '#0061A5',
    textAlign: 'right',
    paddingRight: 5,

  },
  button: {
    height: 60,
    width: 100 + '%',
    backgroundColor: '#1E3A5F',
    borderRadius: 30,
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
  dividerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
},

line: {
  flex: 1,
  height: 1,
  backgroundColor: '#C4C6CF',
},

dividerText: {
  marginHorizontal: 12,
  fontSize: 14,
  color: '#666',
  fontWeight: '500',
  letterSpacing: 0.5,
},
googleButton: {
  height: 60,
  borderWidth: 1,
  borderColor: '#C4C6CF',
  borderRadius: 30,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  marginBottom:16,
},
googleIcon: {
  width: 32,
  height: 32,
  resizeMode: 'contain',
},

googleText: {
  fontSize: 18,
  fontWeight: '500',
  color: '#191C1E',
},
  Register: {
    fontWeight: "500",
    fontSize: 17,
    textAlign: 'center',
    color:'#43474E',
  },
  registerText: {
    color: '#0061A5',
    textDecorationLine: 'underline',
    fontWeight: "500",
    fontSize: 17,
  },
  error: { color: 'red', fontSize: 13, marginTop: -5, marginBottom: 5, paddingLeft: 10 },
})