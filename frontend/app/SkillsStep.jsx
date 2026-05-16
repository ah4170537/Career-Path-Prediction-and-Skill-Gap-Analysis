import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState , useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from "react-redux";
import { addSkill } from "../store/profileSlice";
import { removeSkill } from "../store/profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

const allSkills = ['Python', 'JavaScript', 'SQL', 'Java', 'C++', 'React Native', 'TypeScript']
const levels = ['Beginner', 'Intermediate', 'Advanced']

const SkillsStep = () => {
    const [profileCompleted, setProfileCompleted] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [openSkill, setOpenSkill] = useState(null);

    const selected = profile.skills.reduce((acc, item) => {
        acc[item.skillName] = item.level;
        return acc;
    }, {});

    // filter existing skills
const filteredSkills = allSkills.filter(sk =>
    sk.toLowerCase().includes(search.toLowerCase())
);

// if typed skill does not exist → show typed skill also
const filtered =
    search.trim() &&
    !allSkills.some(
        sk => sk.toLowerCase() === search.trim().toLowerCase()
    )
        ? [...filteredSkills, search.trim()]
        : filteredSkills;

    const handleAction = () => {

        if (profile.skills.length === 0) {
            Alert.alert("Skills Required", "Please select at least one skill to continue.");
            return;
        }

        // --- ADDED THIS CONSOLE LOG ---
        console.log("Redux Skills:", profile.skills);

        // If you want to see them individually in the console:
        Object.entries(selected).forEach(([skills, level]) => {
            console.log(`Skill: ${skills} | Level: ${level}`);
        });

        router.push('/InterestsSteps');
    }

    useEffect(() => {
    
      const loadProfileData = async () => {
    
        try {
    
          const status = await AsyncStorage.getItem("profileCompleted");
    
          if (status !== null) {
    
            const parsedStatus = JSON.parse(status);
    
            setProfileCompleted(parsedStatus);
    
            // ONLY fetch existing profile
            if (parsedStatus) {
    
              const userId = await AsyncStorage.getItem("userId");
    
              console.log("USER ID:", userId);
    
              // FETCH PROFILE
              const response = await api.get(
                `/api/userinformation/${userId}`
              );
    
              const data = response.data;
    
    console.log("USER DATA:", data);
    
           // ✅ LOAD SKILLS

          // LOAD SKILLS ONCE
          if (data.skills && data.skills.length > 0) {
  data.skills.forEach(skill => {
    const exists = profile.skills?.some(
      s => s.skillName === skill.skillName
    );

    if (!exists) {
      dispatch(addSkill(skill));
    }
  });
}
    // INTERESTS ARRAY
    
    // RESUME OBJECT
            }
          }
    
        } catch (error) {
    
          console.log("PROFILE LOAD ERROR:", error);
    
        }
      };
    
      loadProfileData();
    
    }, []);
    
    
    const handleUpdate = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const payload = {
          skills: profile.skills,
        };
    
        const response = await api.put(
          `/api/userinformation/${userId}`,
          payload   // sending redux state directly
        );
    
        console.log("UPDATED:", response.data);
    
        Alert.alert("Success", "Profile updated successfully");
        router.push('/profile')
    
      } catch (error) {
        console.log(error);
    
        Alert.alert(
          "Error",
          error.response?.data?.message || "Update failed"
        );
      }
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER (No back button here now) */}
            <View style={styles.header}>
                <View style={styles.profileRow}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={22} color="white" />
                    </View>
                </View>
            </View>

            {/* PROGRESS BAR */}
{!profileCompleted && (
            <View style={styles.progressContainer}>
                <View style={styles.progressTextRow}>
                    <Text style={styles.stepIndicator}>Step 2 of 3</Text>
                    <Text style={styles.percentText}>66% Completed</Text>
                </View>
                <View style={styles.track}>
                    <View style={[styles.fill, { width: '66%' }]} />
                </View>
            </View>
)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <View style={styles.skillPage}>
                    <Text style={styles.skillHeading}>
                        {!profileCompleted ? "Select Your Skills" : "Update Skills"}
                    </Text>
                    {!profileCompleted && (<Text style={styles.skillSub}>Choose the technical and soft skills you've acquired during your journey.</Text>)}

                    {/* SEARCH BOX */}
                    <View style={styles.skillSearchBox}>
                        <Ionicons name="search" size={18} color="#43474E" style={{ marginRight: 8 }} />
                        <TextInput
                            style={styles.skillSearchInput}
                            placeholder="Search skills..."
                            placeholderTextColor="#43474E"
                            value={search}
                            onChangeText={setSearch}
                        />
                        {search.length > 0 &&
                            <TouchableOpacity onPress={() => setSearch('')}>
                                <Ionicons name="close-circle" size={18} color="#8AA4CF" />
                            </TouchableOpacity>
                        }
                    </View>

                    {/* SKILLS LIST */}
                    {filtered.map((skills, i) => (
                        <View key={i} style={{ marginBottom: 10 }}>
                            <TouchableOpacity
                                style={[styles.skillRow, openSkill === skills && styles.skillRowActive]}
                                onPress={() => setOpenSkill(prev => prev === skills ? null : skills)}
                            >
                                <Text style={[styles.skillRowText, openSkill === skills && styles.skillRowTextActive]}>{skills}</Text>
                                {selected[skills] && (
                                    <View style={styles.skillLevelBadge}>
                                        <Text style={styles.skillLevelBadgeText}>{selected[skills]}</Text>
                                    </View>
                                )}
                                <Ionicons
                                    name={openSkill === skills ? 'chevron-up' : 'chevron-down'}
                                    size={18}
                                    color={openSkill === skills ? '#0061A5' : '#022448'}
                                    style={{ marginLeft: 'auto' }}
                                />
                            </TouchableOpacity>

                            {openSkill === skills && (
                                <View style={styles.skillDropdown}>
                                    {levels.map(level => (
                                        <TouchableOpacity
                                            key={level}
                                            style={styles.skillLevelOption}
                                            onPress={() => {
                                                dispatch(addSkill({
    skillName: skills.trim(),
    level: level
}));

// add custom skill permanently in array UI
if (!allSkills.includes(skills.trim())) {
    allSkills.push(skills.trim());
}

setOpenSkill(null);
setSearch('');
                                            }}
                                        >
                                            <View style={[styles.skillRadio, selected[skills] === level && styles.skillRadioActive]}>
                                                {selected[skills] === level && <View style={styles.skillRadioDot} />}
                                            </View>
                                            <Text style={[styles.skillLevelText, selected[skills] === level && styles.skillLevelTextActive]}>{level}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}

                    {/* SUMMARY TAGS */}
                    {Object.keys(selected).length > 0 && (
                        <View style={styles.skillSummary}>
                            <Text style={styles.skillSummaryTitle}>Selected Skills</Text>
                            <View style={styles.skillTagsWrap}>
                                {profile.skills.map((item) => (
                                    <View key={item.skillName} style={styles.skillTag}>
                                        <Text style={styles.skillTagText}>
                                            {item.skillName} · {item.level}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                dispatch({
                                                    type: "profile/removeSkill",
                                                    payload: item.skillName
                                                });
                                            }}
                                        >
                                            <Ionicons name="close" size={13} color="#0061A5" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* FOOTER NAVIGATION (Back + Continue/Update) */}
            <View style={styles.footer}>
                <View style={styles.footerActionRow}>
                    {!profileCompleted && (
                              <TouchableOpacity 
                                style={styles.backButton} 
                                onPress={() => router.push('SkillsStep')}
                              >
                                <Text style={styles.backButtonText}>Back</Text>
                              </TouchableOpacity>
                            )}
                              <TouchableOpacity
                                  style={styles.mainButton}
                                  onPress={profileCompleted ? handleUpdate : handleAction}
                                >
                                  <Text style={styles.buttonText}>
                                    {profileCompleted ? "Update" : "Continue"}
                                  </Text>
                                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};
export default SkillsStep

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },
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

    skillPage: { paddingHorizontal: 20, flex: 1 },
    skillHeading: { fontSize: 26, fontWeight: '700', color: '#022448', marginBottom: 4, textAlign: 'center', marginTop: 10, marginBottom:15 },
    skillSub: { fontSize: 15, color: '#43474E', marginBottom: 20, textAlign: 'center' },
    skillSearchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F3F7', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 },
    skillSearchInput: { flex: 1, fontSize: 15, color: '#022448' },
    skillRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E6EF', borderRadius: 12, padding: 16, backgroundColor: '#fff' },
    skillRowActive: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
    skillRowText: { fontSize: 15, fontWeight: '500', color: '#022448' },
    skillRowTextActive: { color: '#022448' },
    skillLevelBadge: { backgroundColor: '#D2E4FF', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 10 },
    skillLevelBadgeText: { fontSize: 11, fontWeight: '600', color: '#0061A5' },
    skillDropdown: { borderColor: '#E0E6EF', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, paddingHorizontal: 16, paddingVertical: 8 },
    skillLevelOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
    skillRadio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#022448', justifyContent: 'center', alignItems: 'center' },
    skillRadioActive: { borderColor: '#0061A5', backgroundColor: '#0061A5' },
    skillRadioDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#fff' },
    skillLevelText: { fontSize: 14, color: '#43474E' },
    skillLevelTextActive: { color: '#022448', fontWeight: '600' },
    skillSummary: { marginTop: 24, backgroundColor: '#022448', borderRadius: 12, padding: 16 },
    skillSummaryTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 10 },
    skillTagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    skillTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#D2E4FF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
    skillTagText: { fontSize: 12, fontWeight: '500', color: '#0061A5' },

    // FOOTER STYLES
    footer: { bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderTopColor: '#F1F3F7' },
    footerActionRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    backButton: { flex: 1, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#022448' },
    backButtonText: { color: '#022448', fontSize: 18, fontWeight: '700' },
    mainButton: { flex: 2, backgroundColor: '#022448', height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
})