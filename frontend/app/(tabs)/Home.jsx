import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const { userName } = useLocalSearchParams();
  const actions = [
    { icon: 'list', label: 'Update Skills' },
    { icon: 'map', label: 'View Roadmap', route: '/(tabs)/skillsgap' },
  ]
  const skills = [
    { icon: 'code-slash', label: 'Python', percent: 60 },
    { icon: 'server', label: 'SQL', percent: 40 },
  ]
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.viewarea}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              {/* 3. Logic for Empty vs Uploaded Image */}
              {/* {userImage ? (
                <Image
                  // source={{ uri: userImage }}
                  style={styles.profileImg}
                />
              ) : (
                <View style={[styles.profileImg, styles.placeholderImg]}>
                  <Ionicons name="person" size={24} color="#8AA4CF" />
                </View>
              )} */}
            </TouchableOpacity>
            
            <View style={{ marginLeft: 10 }}>
              {/* 4. Use the dynamic userName from Login */}
              <Text style={styles.nametext}>Hi, {userName || 'User'} 👋</Text>
              <Text style={styles.subtext}>Let’s continue building your career path.</Text>
            </View>
          </View>


          <View style={{ alignItems: 'center' }}>
            <View style={styles.predictbox}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.innerText}>70% Complete</Text>
                <Text style={{ color: '#8AA4CF', fontSize: 14 }}>Finish your profile to unlock matches</Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressFill} />
                </View>
                <TouchableOpacity style={styles.predictbutton} onPress={() => router.push('/personalinfo')}>
                  <Text style={{ fontSize: 18, color: '#001C37', fontWeight: 500 }}>Finish Profile</Text>
                </TouchableOpacity>
              </View>
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

              <Text style={styles.title}>Data Analyst</Text>

              <Text style={styles.desc}>
                Based on your skills in Python and SQL, this role offers the highest growth potential in the current market.
              </Text>
              <Text style={styles.link}>
                View Career Details {'>'}
              </Text>
            </View>

            {actions.map((item, i) => (
              <TouchableOpacity key={i} style={styles.actionRow} onPress={() => router.push(item.route)}>
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon} size={20} color="#0061A5" />
                </View>
                <Text style={styles.actionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.skillCard}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillTitle}>Skill Progress</Text>
                <Ionicons name="trending-up" size={20} color="#022448" />
              </View>
              {skills.map((sk, i) => (
                <View key={i} style={{ marginBottom: 16 }}>
                  <View style={styles.skillRow}>
                    <View style={styles.skillRow}>
                      <Ionicons name={sk.icon} size={16} color="#0061A5" style={{ marginRight: 6 }} />
                      <Text style={styles.skillLabel}>{sk.label}</Text>
                    </View>
                    <Text style={styles.skillPercent}>{sk.percent}%</Text>
                  </View>
                  <View style={styles.skillTrack}>
                    <View style={[styles.skillFill, { width: sk.percent + '%' }]} />
                  </View>
                </View>
              ))}
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  viewarea: {
    padding: 20,
    height: '100%',
    backgroundColor: '#F7F9FC'
  },
  // Add/Replace in styles object
profileImg: {
  width: 40,
  height: 40,
  borderRadius: 20,
},
placeholderImg: {
  backgroundColor: '#D2E4FF', // Light blue from your Finish Profile button
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#8AA4CF',
},
  nametext: {
    fontSize: 20,
    fontWeight: 600,
    color: '#022448'
  },
  subtext: {
    fontSize: 14,
    color: '#43474E'
  },
  predictbox: {
    backgroundColor: '#02305B',
    marginTop: 30,
    borderRadius: 15,
    padding: 20,
    width: 100 + '%',
  },
  innerText: {
    fontSize: 22,
    color: '#fff',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#163B73',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 16,
  },

  progressFill: {
    width: '70%', // change progress here
    height: '100%',
    backgroundColor: '#6CB2FF',
    borderRadius: 10,
  },
  predictbutton: {
    height: 40,
    width: '100%',
    backgroundColor: '#D2E4FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#001C37'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 16,
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

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 16,
  },
  iconBox: {
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#022448',
  },

  skillCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20, marginVertical: 16, width: '100%'
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  skillTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#022448'
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  skillLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#022448'
  },
  skillPercent: {
    fontSize: 15,
    color: '#43474E'

  },
  skillTrack: {
    height: 8,
    backgroundColor: '#EEF4FF',
    borderRadius: 10,
    overflow: 'hidden'

  },
  skillFill: {
    height: '100%',
    backgroundColor: '#0061A5',
    borderRadius: 10
  },

})