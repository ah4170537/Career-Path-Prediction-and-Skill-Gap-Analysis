

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Personalinfo from './personalinfo';
import SkillsStep from './SkillsStep';
import InterestsStep from './InterestsSteps';
import { useRouter } from 'expo-router';

function profilecom() {
const router = useRouter();
    const [formData, setFormData] = useState({
  fullName: '',
  studyLevel: '',
  institute: '',
  program: '',
  isCompleted: null,
  completionYear: '', // New
  semester: '',       // New
  cgpa: '',           // New
});
const [selectedSkills, setSelectedSkills] = useState([]);
const handleNext = () => {
  if (currentStep === 1) {
    const { fullName, studyLevel, institute, program, isCompleted } = formData;
    
    // Check if everything is filled
    // if (!fullName || !studyLevel || !institute || !program || isCompleted === null) {
    //   alert("Please complete all sections to build your profile before proceeding.");
    //   return;
    // }
  }
  if (currentStep === 2) {
    // Check if the array exists and has items
    // if (!selectedSkills || selectedSkills.length === 0) {
    //   alert("Please select at least one skill to continue.");
    //   return;
    // }

    // Check if every skill has a 'level' property assigned
    const hasIncompleteSkills = selectedSkills.some(skill => !skill.level);
    if (hasIncompleteSkills) {
      alert("Please assign a proficiency level to all selected skills.");
      return;
    }
  }

  if (currentStep === 3) {
    if (!selectedInterests || selectedInterests.length === 0) {
      alert("Please select at least one interest to finish your profile.");
      return;
    }

    // Redirect to Suggested Careers Page
    console.log("Profile Complete! Redirecting...");
    router.push('/careersuggested'); // Ensure this route exists in your app directory
    return; // Stop here so it doesn't try to increment step
  }

  if (currentStep < steps.length) {
    setCurrentStep(currentStep + 1);
  }
};

const updateFormData = (updates) => {
  setFormData(prev => ({ ...prev, ...updates }));
};
    const [currentStep, setCurrentStep] = useState(1); // Starting at Step 2 as per your image
  const steps = ['Basics', 'Skills', 'Review'];
  const progress = ((currentStep - 1) / steps.length) * 100;

 const renderStep = () => {
  switch (currentStep) {
    case 1: return <Personalinfo data={formData} // Make sure this matches your useState name
      onUpdate={updateFormData}/>;
    case 2: return <SkillsStep selectedSkills={selectedSkills} 
      setSelectedSkills={setSelectedSkills}/>;
    case 3: 
      return (
        <InterestsStep 
          selectedInterests={selectedInterests} 
          onToggleInterest={toggleInterest} // <--- CHECK THIS NAME
          onResumeUpload={() => console.log("Upload")} 
        />
      );
    default: return null;
  }
};

  // Inside your profilecom function
const [selectedInterests, setSelectedInterests] = useState([]);

const toggleInterest = (interest) => {
  if (selectedInterests.includes(interest)) {
    setSelectedInterests(selectedInterests.filter(i => i !== interest));
  } else {
    setSelectedInterests([...selectedInterests, interest]);
  }
};



  return (
  <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarCircle}>
             <Ionicons name="person" size={25} color="white" />
          </View>
          <Text style={styles.headerTitle}>Ahmad Haseeb</Text>
        </View>
      </View>

      {/* Dynamic Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTextRow}>
          <Text style={styles.stepIndicator}>Step {currentStep} of {steps.length}</Text>
          <Text style={styles.percentText}>{Math.round(progress)}% Completed</Text>
        </View>
        
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.nodesRow}>
          {steps.map((label,index) => (
            <View key={index} style={styles.nodeWrapper}>
              <View style={[
                styles.node, 
                currentStep > index + 1 ? styles.nodeDone : (currentStep === index + 1 ? styles.nodeActive : styles.nodeUpcoming)
              ]}>
                {currentStep > index + 1 && <Ionicons name="checkmark" size={12} color="white" />}
              </View>
              <Text style={styles.nodeLabel}>{label}</Text>
              
            </View>
            
          ))}
        </View>
      </View>
      

   <ScrollView showsVerticalScrollIndicator={false}>
        {renderStep()}
        </ScrollView>
        <View style={styles.buttonContainer}>
  {/* Back Button - Only show if not on Step 1 */}
  {currentStep > 1 && (
    <TouchableOpacity 
      style={styles.backButton} 
      onPress={() => setCurrentStep(currentStep - 1)}
    >
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  )}

  <TouchableOpacity 
    style={[styles.nextButton, { flex: 1 }]} 
    onPress={handleNext}
  >
    <Text style={styles.nextButtonText}>
      {currentStep === 3 ? 'Finish' : 'Continue'}
    </Text>
  </TouchableOpacity>
</View>
      
      

    </SafeAreaView>
  )
}

export default profilecom

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding:20,},
  header: { paddingVertical: 20, flexDirection: 'row', alignItems: 'center' },
  profileRow:{
    flexDirection:'row',
    alignItems:'center'
  },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#022448', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#022448' },
  
  // Progress Bar Styles
  progressContainer: { paddingHorizontal: 20, marginBottom: 10 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  stepIndicator: { fontSize: 15, fontWeight: '700', color: '#022448' },
  percentText: { fontSize: 15, color: '#43474E' },
  track: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
  fill: { height: '100%', backgroundColor: '#0061A5', borderRadius: 3 },
  nodesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -13 ,},
  nodeWrapper: { alignItems: 'center', },
  node: { width: 20, height: 20, borderRadius: 10, borderWidth: 2,alignItems:'center',justifyContent:'center' },
  nodeActive: { backgroundColor: '#fff', borderColor: '#0061A5' },
  nodeDone: { backgroundColor: '#0061A5', borderColor: '#0061A5' },
  nodeUpcoming: { backgroundColor: '#fff', borderColor: '#E0E0E0' },
  nodeLabel: { fontSize: 14, marginTop: 4, color: '#43474E', fontWeight: '600' },
  buttonContainer: {
  flexDirection: 'row',
  paddingVertical: 15,
  gap: 12, // Space between buttons
  backgroundColor: '#fff',
},
backButton: {
  flex: 0.4, // Back button is smaller than Continue
  height: 56,
  borderRadius: 28,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#1E3A5F',
  backgroundColor: '#fff',
},
nextButton: {
  height: 56,
  borderRadius: 28,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1E3A5F',
},
backButtonText: {
  color: '#1E3A5F',
  fontSize: 20,
  fontWeight: '600',
},
nextButtonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: '700',
},

});