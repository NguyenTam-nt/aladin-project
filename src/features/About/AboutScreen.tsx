import {defaultColors} from '@configs';
import {StyleSheet, View, ScrollView} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import HeaderHome from '../Home/components/HeaderHome';
import React from 'react';
import Banner from '../Home/components/Banner';
import Introdcution from './components/Introduction';
import SpaceBottom from 'src/components/SpaceBottom';
import {BannerType} from 'src/typeRules/banner';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner bannerType={BannerType.about} />
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
