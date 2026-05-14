import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SkillRoadmapPage = ({ skillName = "Git & Version Control" }) => {
    const router = useRouter();
  // Static steps for the specific skill roadmap
  const [steps, setSteps] = useState([
    { id: 1, title: 'Basics of Version Control', resource: 'YouTube: Git for Beginners', time: '2 Days', completed: true },
    { id: 2, title: 'Branching and Merging', resource: 'Documentation: Git Branching', time: '3 Days', completed: false },
    { id: 3, title: 'Remote Repositories (GitHub)', resource: 'FreeCodeCamp Git Tutorial', time: '2 Days', completed: false },
  ]);

  // Calculate progress based on completed steps
  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = (completedCount / steps.length) * 100;

  const toggleStep = (id) => {
    setSteps(prevSteps => prevSteps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView  showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#022448",
                  borderRadius: 20,
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }} onPress={() => router.push('/(tabs)/skillsgap')}>
                  <Ionicons name='arrow-back' color={"#fff"} size={28} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Your Personalized Learning Roadmap</Text>
                      <Text style={styles.subTitle}>Follow this step-by-step plan to acquire the skills needed for your predicted career.</Text>
      
      {/* 1. Skill Specific Header & Progress */}
      <View style={styles.skillHeaderCard}>
        <Text style={styles.label}>Learning Roadmap for:</Text>
        <Text style={styles.skillTitle}>{skillName}</Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Skill Mastery</Text>
            <Text style={styles.progressPercentText}>{Math.round(progressPercent)}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.stepCounter}>{completedCount} of {steps.length} Milestones Reached</Text>
        </View>
      </View>

      {/* 2. Interactive Roadmap Layout */}
      <View style={styles.roadmapContainer}>
        <Text style={styles.sectionTitle}>Step-by-Step Plan</Text>
        
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepWrapper}>
            {/* Connecting Line Logic */}
            {index !== steps.length - 1 && <View style={styles.verticalLine} />}
            
            <View style={[styles.stepCard, step.completed && styles.stepCardDone]}>
              <View style={styles.stepHeader}>
                <View style={styles.titleGroup}>
                  <View style={[styles.numberCircle, step.completed && styles.numberCircleDone]}>
                    {step.completed ? (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    ) : (
                      <Text style={styles.numberText}>{index + 1}</Text>
                    )}
                  </View>
                  <Text style={[styles.stepTitle, step.completed && styles.stepTitleDone]}>
                    {step.title}
                  </Text>
                </View>
                
                <TouchableOpacity onPress={() => toggleStep(step.id)}>
                  <Ionicons 
                    name={step.completed ? "checkbox" : "square-outline"} 
                    size={28} 
                    color={step.completed ? "#0061A5" : "#022448"} 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.detailsBox}>
                <View style={styles.detailRow}>
                  <Ionicons name="library-outline" size={16} color="#43474E" />
                  <Text style={styles.detailText}>Resource: {step.resource}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#43474E" />
                  <Text style={styles.detailText}>Estimated: {step.time}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
   mainTitle: { fontSize: 28, fontWeight: '700', color: '#022448', textAlign: 'center',marginTop:10 },
  subTitle: { fontSize: 18, color: '#43474E', textAlign: 'center', marginBottom: 25, lineHeight: 20 },
  
  // Header Card Styles
  skillHeaderCard: { 
    backgroundColor: '#022448', 
    padding: 25, 
    borderRadius: 20, 
    marginBottom: 30,
    elevation: 5 
  },
  label: { color: '#B0BEC5', fontSize: 13, fontWeight: '600', marginBottom: 5 },
  skillTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  
  // Progress Bar Styles
  progressSection: { marginTop: 5 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { color: '#fff', fontSize: 14 },
  progressPercentText: { color: '#fff', fontWeight: '700' },
  track: { height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5 },
  fill: { height: '100%', backgroundColor: '#0061A5', borderRadius: 5 },
  stepCounter: { color: '#B0BEC5', fontSize: 12, marginTop: 10, textAlign: 'right' },

  // Roadmap Styling
  roadmapContainer: { paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#022448', marginBottom: 20 },
  
  stepWrapper: { position: 'relative', marginBottom: 20 },
  verticalLine: { 
    position: 'absolute', 
    left: 20, 
    top: 40, 
    bottom: -30, 
    width: 2, 
    backgroundColor: '#E0E0E0', 
    zIndex: -1 
  },
  
  stepCard: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 15, 
    borderWidth: 1, 
    borderColor: '#E0E0E0',
    marginLeft: 5,
    elevation: 2 
  },
  stepCardDone: { borderColor: '#0061A5', backgroundColor: '#F0F7FF' },
  
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  titleGroup: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  
  numberCircle: { 
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    backgroundColor: '#022448', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  numberCircleDone: { backgroundColor: '#0061A5' },
  numberText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  
  stepTitle: { fontSize: 16, fontWeight: '700', color: '#022448', flex: 1 },
  stepTitleDone: { color: '#0061A5', textDecorationLine: 'line-through' },
  
  detailsBox: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  detailText: { marginLeft: 8, fontSize: 13, color: '#43474E' },
});

export default SkillRoadmapPage;