import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AboutScreen from './AboutScreen';

const AboutRoute = createStackNavigator();

export const About = () => {
  return (
    <AboutRoute.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="about">
      <AboutRoute.Screen name="about" component={AboutScreen} />
    </AboutRoute.Navigator>
  );
};

const styles = StyleSheet.create({});
