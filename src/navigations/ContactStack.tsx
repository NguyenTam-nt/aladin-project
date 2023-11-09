import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {contactRoute} from 'src/constants/routers';
import ContactScrren from 'src/features/Contact';

const ContactStack = createStackNavigator();

export const ContactStackScreen = () => (
  <ContactStack.Navigator screenOptions={{headerShown: false}}>
    <ContactStack.Screen name={contactRoute.prifex} component={ContactScrren} />
  </ContactStack.Navigator>
);
