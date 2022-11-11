import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const OnbordingScreen = ({}) => {
  const navigation = useNavigation();

  const Next = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{color: 'black', marginEnd: 18}}>Next</Text>
    </TouchableOpacity>
  );
  const Done = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{color: 'black', marginEnd: 18}}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: <Image source={require('../assets/find.png')} />,
          title: 'Find recipes',
          subtitle: 'Find all food recipes easily...',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/cook.png')} />,
          title: 'Cook',
          subtitle: 'Learn to cook',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/serve.png')} />,
          title: 'Serve',
          subtitle: 'Serve',
        },
      ]}
    />
  );
};

export default OnbordingScreen;
