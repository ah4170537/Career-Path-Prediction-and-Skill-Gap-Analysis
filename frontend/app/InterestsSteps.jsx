import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from "react-redux";

const InterestsStep = () => {
  const router = useRouter();
  const { userName } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  
  // State for interests (initialized empty)
  const [selectedInterests, setSelectedInterests] = useState([]);

  const availableInterests = [
    'Web Development', 'Mobile Apps', 'Data Science', 
    'Artificial Intelligence', 'Cyber Security', 'Marketing', 
    'Cloud Computing', 'UI/UX Design', 'Software Engineering'
  ];

  const filteredInterests = availableInterests.filter(i => 
    i.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAction = () => {
   
      if (selectedInterests.length === 0) {
        Alert.alert("Interests Required", "Please select at least one interest to finish your profile.");
        return;
      }
      console.log("--- Final Onboarding Data ---");
      console.log("User:", userName);
      console.log("Selected Interests:", selectedInterests);
      
      if (resumeFile) {
        console.log("Resume Local Path:", resumeFile.uri);
        console.log("Resume Filename:", resumeFile.name);
        console.log("Target Server Folder: backend/uploads/resume/");
      } else {
        console.log("Resume: No resume uploaded (Optional)");
      }
      console.log("-----------------------------");
      // Final step - Navigate to Home or Dashboard
      router.replace('/Home'); 
    }

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        // Allows PDF, Word (.doc, .docx), and general text files
        type: [
          "application/pdf", 
          "application/msword", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain"
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setResumeFile(file);
        
        // Log the details for your backend/uploads/resume folder
        console.log("--- File Selection ---");
        console.log("Local URI:", file.uri);
        console.log("Filename:", file.name);
        console.log("MIME Type:", file.mimeType); // Will show if it's pdf or docx
        console.log("File Size:", file.size);
      }
    } catch (err) {
      console.log("Error picking document:", err);
      Alert.alert("Error", "Could not access the file picker.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={22} color="white" />
          </View>
          <Text style={styles.headerTitle}>{userName || "User Profile"}</Text>
        </View>
      </View>

      {/* 2. PROGRESS BAR (Step 3 - 100%) */}
      
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.stepIndicator}>Step 3 of 3</Text>
            <Text style={styles.percentText}>100% Completed</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '100%' }]} />
          </View>
        </View>
  

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.stepContainer}>
          <Text style={styles.mainTitle}>
            Your Interests
          </Text>
          <Text style={styles.subTitle}>Select the fields that excite you the most for your future career.</Text>

          {/* Search / Add Bar */}
          <View style={styles.searchSection}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#43474E" style={{ marginRight: 10 }} />
              <TextInput 
                placeholder="Search or add interests..." 
                style={styles.textInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#43474E"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => { toggleInterest(searchQuery); setSearchQuery(''); }}>
                  <Ionicons name="add-circle" size={24} color="#0061A5" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Interests Grid */}
          <View style={styles.interestsGrid}>
            {filteredInterests.map((interest) => (
              <TouchableOpacity 
                key={interest} 
                style={[
                  styles.chip, 
                  selectedInterests.includes(interest) && styles.chipActive 
                ]} 
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[styles.chipText, selectedInterests.includes(interest) && styles.chipTextActive]}>
                  {interest}
                </Text>
                {selectedInterests.includes(interest) && (
                  <Ionicons name="close-circle" size={16} color="white" style={{ marginLeft: 8 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Resume Upload Section (Optional) */}
          <View style={styles.resumeSection}>
            <Text style={styles.resumeTitle}>Upload Resume (Optional)</Text>
            
            <TouchableOpacity 
              style={[styles.uploadBox, resumeFile && { borderColor: '#0061A5', backgroundColor: '#E3F2FD' }]} 
              onPress={handleResumeUpload}
            >
              <Ionicons 
                name={resumeFile ? "document-text-outline" : "cloud-upload-outline"} 
                size={32} 
                color={resumeFile ? "#0061A5" : "#022448"} 
              />
              {resumeFile && <Text style={{fontSize: 12, marginTop: 5}} numberOfLines={1}>{resumeFile.name}</Text>}
            </TouchableOpacity>
            
            <Text style={styles.uploadLinkText}>
               {resumeFile ? "Change Resume" : "Upload Your Resume"}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 3. FOOTER NAVIGATION */}
      <View style={styles.footer}>
        <View style={styles.footerActionRow}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.push('SkillsStep')}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={handleAction}
          >
            <Text style={styles.buttonText}>
              Finish
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
  };

export default InterestsStep;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',},
  
  // Header & Progress
  header: { paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', alignItems: 'center' },
  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#022448', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#022448' },
  
  progressContainer: { paddingHorizontal: 20, marginBottom: 10 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepIndicator: { fontSize: 13, fontWeight: '700', color: '#022448' },
  percentText: { fontSize: 13, color: '#43474E' },
  track: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
  fill: { height: '100%', backgroundColor: '#0061A5', borderRadius: 3 },

  stepContainer: { paddingHorizontal: 20 },
  mainTitle: { fontSize: 26, fontWeight: '700', color: '#022448', textAlign: 'center', marginTop: 10 },
  subTitle: { fontSize: 15, color: '#43474E', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  
  searchSection: { marginBottom: 20 },
  searchBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F1F3F7', 
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10,
  },
  textInput: { flex: 1, fontSize: 16, color: '#022448' },

  interestsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 25, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    marginRight: 8, 
    marginBottom: 10 
  },
  chipActive: { backgroundColor: '#001C37', borderColor: '#001C37' },
  chipText: { fontSize: 14, color: '#022448' },
  chipTextActive: { color: '#fff', fontWeight: '600' },

  resumeSection: { marginTop: 30, alignItems: 'center' },
  resumeTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 8 },
  resumeSub: { fontSize: 13, color: '#43474E', textAlign: 'center', marginBottom: 15, paddingHorizontal: 10 },
  uploadBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#F1F3F7',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed', // Making it look like an upload zone
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  uploadLinkText: { color: '#022448', fontWeight: '700', fontSize: 15 },

  // Footer Navigation
  footer: {bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#F1F3F7' },
  footerActionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { flex: 1, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#022448' },
  backButtonText: { color: '#022448', fontSize: 18, fontWeight: '700' },
  mainButton: { flex: 2, backgroundColor: '#022448', height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});