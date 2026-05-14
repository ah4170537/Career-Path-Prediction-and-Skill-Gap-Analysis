import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#43474E',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      {/* 1. HOME SCREEN */}
      <Tabs.Screen
        name="Home" // Matches Home.jsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* 2. CAREER SUGGESTIONS */}
      <Tabs.Screen
        name="careersuggested" // Matches careersuggest...jsx (ensure name is exact)
        options={{
          title: 'Career',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "briefcase" : "briefcase-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* 3. SKILLS GAP / ROADMAP */}
      <Tabs.Screen
        name="skillsgap" // Matches skillsgap.jsx
        options={{
          title: 'Roadmap',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <MaterialCommunityIcons name="source-branch" size={22} color={color} />
            </View>
          ),
        }}
      />

      {/* 4. PROFILE */}
      <Tabs.Screen
      
        name="profile" // Matches profile.jsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      {/* <Tabs.Screen
      name="tabs" 
    options={{
      href: null, // This hides the tab from the bottom bar
    }}
      
      /> */}
    </Tabs>
  );
}

// Keep your existing styles below...

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    Bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  iconContainer: {
    width: 60,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  activeIconBg: {
    backgroundColor: '#022448', // Dark Navy background from your image
  },
});