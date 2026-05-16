import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, TextInputArea } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState , useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import api from "../../api/api";


const profile = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const imageUrl = profileImage?.filePath
  ? `${api.defaults.baseURL}/${profileImage.filePath}`
  : null;

const settingsOptions = [
  { icon: 'person-outline', label: 'Personal Information', route: '../personalinfo' },
  { icon: 'code-slash-outline', label: 'Technical Skills', route: 'SkillsStep' }, // Replaced Security
  { icon: 'compass-outline', label: 'Career Interests', route:'InterestsSteps' },   // More relevant for your project
  { icon: 'school-outline', label: 'Change Email' },
  { icon: 'help-circle-outline', label: 'Change Password', route: '../newpassword' },
  { icon: 'log-out-outline', label: 'Log out', isLast: true },
];

const onChange = (event, selectedDate) => {
  setShow(false);

  if (selectedDate) {
    setDate(selectedDate);
  }
};

const handleProfileImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted || !cameraPermission.granted) {
    alert("Permission required");
    return;
  }

  Alert.alert("Choose Option", "Select Image Source", [
    {
      text: "Camera",
      onPress: async () => {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) uploadImage(result.assets[0]);
      },
    },
    {
      text: "Gallery",
      onPress: async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) uploadImage(result.assets[0]);
      },
    },
  ]);
};


const uploadImage = async (file) => {
  try {
    const userId = await AsyncStorage.getItem("userId");

    const formData = new FormData();

    formData.append("profileImage", {
      uri: file.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    const res = await api.put(
      `/api/upload-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPLOAD SUCCESS:", res.data);

    // 🔥 THIS IS WHAT YOU ARE MISSING
    setProfileImage(res.data.data);

    await AsyncStorage.setItem(
      "profileImage",
      JSON.stringify(res.data.data)
    );

  } catch (err) {
    console.log("UPLOAD ERROR:", err?.response?.data || err.message);
  }
};

useEffect(() => {
  const loadImage = async () => {
    const img = await AsyncStorage.getItem("profileImage");
    if (img) {
      setProfileImage(JSON.parse(img));
    }
  };

  loadImage();
}, []);


  return (
   <SafeAreaView style={styles.viewarea}>
   <ScrollView showsVerticalScrollIndicator={false} >
     <TouchableOpacity style={{
          width: 40,
          height: 40,
          backgroundColor: "#022448",
          borderRadius: 20,
          marginRight: 10,
          alignItems: "center",
          justifyContent: "center"
        }} onPress={() => router.push('/Home')}>
          <Ionicons name='arrow-back' color={"#fff"} size={28} />
          
        </TouchableOpacity>
    <Text style={styles.heading}>Profile</Text>
    <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
  <TouchableOpacity onPress={handleProfileImage}>
  {imageUrl ? (
  <Image
    source={{ uri: imageUrl }}
    style={{
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 3,
      borderColor: "#022448",
    }}
  />
) : (
  <View
    style={{
      width: 140,
      height: 140,
      borderRadius: 70,
      borderWidth: 3,
      borderColor: "#022448",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1F3F7",
    }}
  >
    <Ionicons name="person" size={70} color="#022448" />
  </View>
)}
</TouchableOpacity>
</View>

              <View style={styles.settingsContainer}>
      {settingsOptions.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.settingsItem, item.isLast && { borderBottomWidth: 0 }]}
          onPress={() => router.push(item.route)}
        >
          <View style={styles.settingsLeft}>
            <Ionicons name={item.icon} size={22} color="#0061A5" />
            <Text style={styles.settingsLabel}>{item.label}</Text>
          </View>
          {!item.isLast && (
            <Ionicons name="chevron-forward" size={20} color="#43474E" />
          )}
        </TouchableOpacity>
      ))}
    </View>
              


   </ScrollView>
   </SafeAreaView>



  )
}

export default profile

const styles = StyleSheet.create({
    viewarea: {
    padding: 20,
    paddingBottom:0,
    height: 100 + '%',
    backgroundColor: '#F7F9FC'
  },
    heading:{
        textAlign:'center',
        fontSize: 32,
        fontWeight:700,
       color: '#022448',
    },

    settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    marginTop: 20,
    width: '100%',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF4FF', // Light blue divider to match your theme
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#022448', // Your primary dark blue
    marginLeft: 14,
  },
    
}) 
