import { View, Text, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

import OnBoardngUI from '../components/OnBoardngUI';
import CustomDot from '../components/CustomDot';
import CustomDoneComponent from '../components/CustomDoneComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


const onboarding = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Onboarding
        bottomBarHighlight={false}
        DotComponent={CustomDot}
        DoneButtonComponent={CustomDoneComponent}
        onSkip={() => router.push('/welcome')}
        containerStyles={{
          padding: 0,
          // backgroundColor: "red"
        }}
        pages={[
          {
            backgroundColor: '#fff',
            image: <OnBoardngUI title={"Career Path Prediction"} subtitle={"AI analyzes your skills and interests to predict suitable career paths."} img={0} />,
          },
          {
            backgroundColor: '#fff',
            image: <OnBoardngUI title={"Skill Gap Analysis"} subtitle={"Identifies missing skills required to succeed in a chosen career."} img={1} />,
          },
          {
            backgroundColor: '#fff',
            image: <OnBoardngUI title={"Personalized Career Roadmap"} subtitle={"Provides step-by-step guidance to build skills and achieve career goals."} img={2} />,
          },
        ]}
      />
    </SafeAreaView>
  )
}

export default onboarding