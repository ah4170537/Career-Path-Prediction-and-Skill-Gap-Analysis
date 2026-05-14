import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, TextInputArea } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react'
import { useRouter } from 'expo-router';

function careersuggested() {
    const router = useRouter();
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
        <Text style={styles.mainTitle}>Career Prediction</Text>
              <Text style={styles.subTitle}>Your career suggestions are based on your skills, interests, and profile data.</Text>
             <View style={styles.card}>
                          <View style={styles.row}>
            
                            <View style={styles.badge}>
                              <Text style={styles.badgeText}>Top Match</Text>
                            </View>
            
                            <View>
                              <Text style={styles.score}>85%</Text>
                              <Text style={styles.scoreLabel}>AI Score</Text>
                            </View>
            
                          </View>
            
                          <Text style={styles.title}>Data Analyst</Text>
            
                          <Text style={styles.desc}>
                            Based on your skills in Python and SQL, this role offers the highest growth potential in the current market.
                          </Text>
                          <TouchableOpacity onPress={() => router.push('skillsgap')}>
                            <Text style={styles.link}>
                            View Career Details {'>'}
                          </Text>
                          </TouchableOpacity>
                        </View>
             <View style={styles.card}>
                          <View style={styles.row}>
            
                            <View style={styles.badge}>
                              <Text style={styles.badgeText}>Top Match</Text>
                            </View>
            
                            <View>
                              <Text style={styles.score}>85%</Text>
                              <Text style={styles.scoreLabel}>AI Score</Text>
                            </View>
            
                          </View>
            
                          <Text style={styles.title}>Web Developement</Text>
            
                          <Text style={styles.desc}>
                            Based on your skills in Python and SQL, this role offers the highest growth potential in the current market.
                          </Text>
                          <TouchableOpacity onPress={() => router.push('skillsgap')}>
                            <Text style={styles.link}>
                            View Career Details {'>'}
                          </Text>
                          </TouchableOpacity>
                        </View>



        </ScrollView>


    </SafeAreaView>
  )
}

export default careersuggested

const styles = StyleSheet.create({
    viewarea: {
    padding: 20,
    paddingBottom:0,
    height: 100 + '%',
    backgroundColor: '#F7F9FC'
  },
    mainTitle: { fontSize: 28, fontWeight: '700', color: '#022448', textAlign: 'center',marginTop:10 },
  subTitle: { fontSize: 18, color: '#43474E', textAlign: 'center', marginBottom: 25, lineHeight: 20 },
   card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },

  badge: {
    backgroundColor: '#D2E4FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 27,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#001C37'
  },

  score: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0061A5'
  },

  scoreLabel: {
    fontSize: 11,
    color: '#43474E'
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#022448',
    marginBottom: 6
  },

  desc: {
    fontSize: 16,
    color: '#43474E',
    lineHeight: 19,
    marginBottom: 14
  },


  link: {
    color: '#0061A5',
    fontSize: 16,
    fontWeight: '500'
  },

})