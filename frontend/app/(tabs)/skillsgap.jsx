import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, TextInputArea } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import { useRouter } from 'expo-router';

function skillsgap() {
  const router = useRouter();
    const predictedCareer = "Software Developer";
  const userOwnedSkills = ["Python", "HTML / CSS"];
  const missingSkills = ["Git & Version Control", "Advanced JavaScript", "Problem Solving Practice"];
  return (
    <SafeAreaView style={styles.viewarea}>
        <ScrollView>
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
                    <Text style={styles.mainTitle}>Skill Gap Analysis</Text>
                          <Text style={styles.subTitle}>Here are the skills you need to improve to succeed in your predicted career.</Text>
                        <View style={styles.careerCard}>
        <Text style={styles.label}>Predicted Career Path</Text>
        <Text style={styles.careerTitle}>{predictedCareer}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressText}>Match Score</Text>
            <Text style={styles.progressPercent}>65%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '65%' }]} />
          </View>
        </View>
      </View>

      {/* 2. Your Current Skills - Only showing what the user has [cite: 30] */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Current Skills</Text>
        <View style={styles.skillsList}>
          {userOwnedSkills.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <Ionicons name="checkmark-circle" size={22} color="#0061A5" />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 3. Skill Gaps - Actionable items linking to Roadmap  */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Missing Skills (Gaps)</Text>
        <Text style={styles.subText}>Click a skill to view the roadmap and industry guidance</Text>
        
        <View style={styles.gapContainer}>
          {missingSkills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.gapCard} activeOpacity={0.7} onPress={() => router.push('../SkillRoadmapPage')}>
              <View style={styles.gapInfo}>
                <Ionicons name="school-outline" size={20} color="#022448" />
                <Text style={styles.gapText}>{skill}</Text>
              </View>
              <Ionicons name="arrow-forward-circle" size={22} color="#0061A5" />
            </TouchableOpacity>
          ))}
        </View>
      </View>


        </ScrollView>
    </SafeAreaView>
  )
}

export default skillsgap


const styles = StyleSheet.create({
    viewarea: {
    padding: 20,
    paddingBottom:0,
    height: 100 + '%',
    backgroundColor: '#F7F9FC'
  },
    mainTitle: { fontSize: 28, fontWeight: '700', color: '#022448', textAlign: 'center',marginTop:10 },
  subTitle: { fontSize: 18, color: '#43474E', textAlign: 'center', marginBottom: 25, lineHeight: 20, },

  careerCard: { 
    backgroundColor: '#022448', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 25,
    elevation: 4
  },
  label: { color: '#E0E0E0', fontSize: 13, fontWeight: '600', marginBottom: 5 },
  careerTitle: { color: '#fff', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  
  // Progress Bar in Header
  progressContainer: { marginTop: 10 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressText: { color: '#fff', fontSize: 14 },
  progressPercent: { color: '#fff', fontWeight: '700' },
  track: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  fill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },

  // General Section Styles
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#022448', marginBottom: 15 },
  subText: { fontSize: 13, color: '#43474E', marginTop: -10, marginBottom: 15 },

  // Current Skills List
  skillsList: { backgroundColor: '#fff', borderRadius: 15, padding: 15, elevation: 1 },
  skillRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  skillText: { marginLeft: 12, fontSize: 16, color: '#43474E', fontWeight: '500' },

  // Gap Card Styles (Clickable)
  gapContainer: { marginTop: 5 },
  gapCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 15, 
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#022448',
    elevation: 2
  },
  gapInfo: { flexDirection: 'row', alignItems: 'center' },
  gapText: { marginLeft: 12, fontSize: 16, color: '#022448', fontWeight: '600' }
})