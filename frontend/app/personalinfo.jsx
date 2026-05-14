import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter} from 'expo-router';
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../store/profileSlice";

export default function ProfileInfo() {
  const router = useRouter();
  const profile = useSelector((state) => state.profile);
const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const studyLevels = ['Matric', 'Fsc', 'Graduation'];

  const updateField = (field, value) => {
  dispatch(setField({ field, value }));
};
  const isFieldDisabled = (previousValue) => {
    return !previousValue || previousValue.toString().trim().length === 0;
  };

  // Helper to check if a field should be locked
    // If updating, never disable anything. 
    // If onboarding, disable if the previous field is empty.

  const handlePress = () => {
  const { fullName, studyLevel, institute, program, isCompleted } = profile;
  
  // Log data to see what is missing in your console
  console.log("Current Form Data:", profile);

  if (!fullName || !studyLevel || !institute || !program || isCompleted === null) {
    Alert.alert("Required", "Please complete all mandatory fields.");
    return;
  }

  // Ensure the filename matches exactly (Case Sensitive)
  // If your file is 'skillsstep.jsx', use '/skillsstep'
  // If your file is 'SkillsStep.jsx', use '/SkillsStep'
  router.push({
      pathname: '/SkillsStep', 
      params: { userName: fullName } 
  });
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarCircle}><Ionicons name="person" size={25} color="white" /></View>
        </View>
      </View>

      
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.stepIndicator}>Step 1 of 3</Text>
            <Text style={styles.percentText}>33% Completed</Text>
          </View>
          <View style={styles.track}><View style={[styles.fill, { width: '33%' }]} /></View>
        </View>
   

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.mainTitle}>Tell us about yourself</Text>

        {/* 1. Full Name (Always enabled) */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputBox}>
            <TextInput 
              value={profile.fullName}
              onChangeText={(val) => updateField('fullName', val)} 
              placeholder="Full Name" 
              style={styles.textInput} 
            />
          </View>
        </View>

        {/* 2. Study Level (Disabled until Name is filled) */}
        <View style={[styles.inputCard, isFieldDisabled(profile.fullName) && styles.disabledOpacity]}>
          <Text style={styles.label}>Level of Study</Text>
          <TouchableOpacity 
            disabled={isFieldDisabled(profile.fullName)}
            onPress={() => setShowDropdown(!showDropdown)} 
            style={styles.inputBox}
          >
            <Text style={styles.textInput}>{profile.studyLevel || "Select Level"}</Text>
            <Ionicons name="chevron-down" size={20} color="#43474E" />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              {studyLevels.map((lvl) => (
                <TouchableOpacity key={lvl} style={styles.dropdownItem} onPress={() => { updateField('studyLevel', lvl); setShowDropdown(false); }}>
                  <Text style={styles.dropdownText}>{lvl}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 3. Institute (Disabled until Study Level is selected) */}
        <View style={[styles.inputCard, isFieldDisabled(profile.studyLevel) && styles.disabledOpacity]}>
          <Text style={styles.label}>Institute / University</Text>
          <View style={styles.inputBox}>
            <TextInput 
              editable={!isFieldDisabled(profile.studyLevel)}
              value={profile.institute} 
              onChangeText={(val) => updateField('institute', val)} 
              placeholder="e.g. GCUF" 
              style={styles.textInput} 
            />
          </View>
        </View>

        {/* 4. Program (Disabled until Institute is filled) */}
        <View style={[styles.inputCard, isFieldDisabled(profile.institute) && styles.disabledOpacity]}>
          <Text style={styles.label}>Program / Field</Text>
          <View style={styles.inputBox}>
            <TextInput 
              editable={!isFieldDisabled(profile.institute)}
              value={profile.program} 
              onChangeText={(val) => updateField('program', val)} 
              placeholder="e.g. BS IT" 
              style={styles.textInput} 
            />
          </View>
        </View>

        {/* 5. Status (Disabled until Program is filled) */}
        <View style={[styles.inputCard, isFieldDisabled(profile.program) && styles.disabledOpacity]}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              disabled={isFieldDisabled(profile.program)}
              onPress={() => updateField('isCompleted', true)} 
              style={[styles.statusBtn, profile.isCompleted === true && styles.statusActive]}
            >
              <Text style={profile.isCompleted === true && styles.activeBtnText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={isFieldDisabled(profile.program)}
              onPress={() => updateField('isCompleted', false)} 
              style={[styles.statusBtn, profile.isCompleted === false && styles.statusActive]}
            >
              <Text style={profile.isCompleted === false && styles.activeBtnText}>In Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Fields (Year, Semester, CGPA) */}
        {profile.isCompleted === true && (
          <View style={styles.inputCard}>
            <Text style={styles.label}>Year of Completion</Text>
            <View style={styles.inputBox}>
              <TextInput value={profile.completionYear} onChangeText={(val) => updateField('completionYear', val)} placeholder="e.g. 2024" keyboardType="numeric" style={styles.textInput} />
            </View>
          </View>
        )}

        {profile.isCompleted === false && profile.studyLevel === 'Graduation' && (
          <View style={styles.row}>
            <View style={[styles.inputCard, { flex: 1 }]}>
              <Text style={styles.label}>Semester</Text>
              <View style={styles.inputBox}>
                <TextInput value={profile.semester} onChangeText={(val) => updateField('semester', val)} placeholder="e.g. 6" keyboardType="numeric" style={styles.textInput} />
              </View>
            </View>
            <View style={[styles.inputCard, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>CGPA</Text>
              <View style={styles.inputBox}>
                <TextInput value={profile.cgpa} onChangeText={(val) => updateField('cgpa', val)} placeholder="e.g. 3.8" keyboardType="numeric" style={styles.textInput} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.mainButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',padding:20 },
  header: { paddingVertical: 15, flexDirection: 'row', alignItems: 'center' },
  profileRow: { flexDirection: 'row', alignItems: 'center',},
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#022448', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  progressContainer: { marginBottom: 15 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepIndicator: { fontSize: 14, fontWeight: '700', color: '#022448' },
  percentText: { fontSize: 14, color: '#43474E' },
  track: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
  fill: { height: '100%', backgroundColor: '#0061A5', borderRadius: 3 },
  mainTitle: { fontSize: 26, fontWeight: '700', color: '#022448', marginTop: 10, textAlign: 'center', marginBottom: 15 },
  inputCard: { marginBottom: 15 },
  disabledOpacity: { opacity: 0.5 }, // Visual feedback for disabled fields
  label: { fontSize: 15, fontWeight: '600', color: '#022448', marginBottom: 8 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F7', borderRadius: 10, paddingHorizontal: 12, height: 52 },
  textInput: { flex: 1, fontSize: 16, color: '#022448' },
  row: { flexDirection: 'row' },
  statusBtn: { flex: 1, height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F3F7', borderRadius: 10, marginHorizontal: 2 },
  statusActive: { backgroundColor: '#D2E4FF', borderWidth: 1, borderColor: '#0061A5' },
  activeBtnText: { color: '#0061A5', fontWeight: '700' },
  dropdown: { backgroundColor: '#fff', borderRadius: 10, marginTop: 5, borderWidth: 1, borderColor: '#E0E0E0', elevation: 3 },
  dropdownItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#F1F3F7' },
  dropdownText: { fontSize: 16, color: '#022448' },
  footer: { paddingVertical: 20 },
  mainButton: { backgroundColor: '#022448', height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});