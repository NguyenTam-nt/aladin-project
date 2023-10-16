import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {contactRoute} from 'src/constants/routers';
import ContactScrren from 'src/features/Contact';

const ContactStack = createStackNavigator();

export const ContactStackScreen = () => (
  <ContactStack.Navigator screenOptions={{headerShown: false}}>
    <ContactStack.Screen name={contactRoute.prifex} component={ContactScrren} />
    {/* <FeatureStack.Screen name="/noi-bat" component={FeaturedScreen} />
    <FeatureStack.Screen name="/noi-bat/[slug]" component={ArticleScreen} />
    <FeatureStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
    <FeatureStack.Screen name="/bai-hat/[slug]" component={SongScreen} /> */}
  </ContactStack.Navigator>
);
