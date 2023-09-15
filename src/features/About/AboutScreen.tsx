import {defaultColors} from '@configs';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import HeaderHome from '../Home/components/HeaderHome';
import React from 'react';
import Banner from '../Home/components/Banner';
import Introdcution from './components/Introduction';
import SpaceBottom from 'src/components/SpaceBottom';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <View style={{}}>
        <Introdcution />
        </View>
        <SpaceBottom />
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.bg_EFEFEF,
    position: 'relative',
    flex: 1,
  },
});
