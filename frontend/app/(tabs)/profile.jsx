import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, TextInputArea } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react'
import { useRouter } from 'expo-router';

const profile = () => {
  const router = useRouter();

const settingsOptions = [
  { icon: 'person-outline', label: 'Personal Information', route: '../personalinfo' },
  { icon: 'code-slash-outline', label: 'Technical Skills', route: 'SkillsStep' }, // Replaced Security
  { icon: 'compass-outline', label: 'Career Interests', route:'InterestsSteps' },   // More relevant for your project
  { icon: 'school-outline', label: 'Change Email' },
  { icon: 'help-circle-outline', label: 'Change Password' },
  { icon: 'log-out-outline', label: 'Log out', isLast: true },
];

const onChange = (event, selectedDate) => {
  setShow(false);

  if (selectedDate) {
    setDate(selectedDate);
  }
};


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
    <View style={{alignItems:'center', marginTop:10, marginBottom:10}}><Image
                source={require('../../assets/images/profile.jpg')}
                style={{width: 140,height: 140,borderRadius: 70,borderWidth:3, color:'#022448'}}
              /></View>

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
