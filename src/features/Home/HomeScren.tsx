import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import HeaderHome from './components/HeaderHome';
import {DIMENSION} from '@constants';
import Banner from './components/Banner';
import SpaceBottom from 'src/components/SpaceBottom';
import GroupContact from './components/GroupContact';
import CategoryOutStandingList from './components/CategoryOutStandingList';
import ProductNewList from './components/ProductNewList';
import ProductSaleList from './components/ProductSaleList';
import ContactTopic from './components/ContactTopic'
const HomeScren = () => {
  return (
    <View style={styles.container}>
      <HeaderHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <View style={styles.styleBody}>
          <ProductSaleList />
          <GroupContact />
          <CategoryOutStandingList />
          <ProductNewList />
        </View>
        <ContactTopic />
        <SpaceBottom />
      </ScrollView>
    </View>
  );
};

export default HomeScren;
const styles = StyleSheet.create({
  container: {
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.bg_EFEFEF,
    position: 'relative',
    flex: 1,
  },
  imageBanner: {
    width: DIMENSION.width,
    height: 230,
  },
  styleBody: {
    marginTop: 24,
  },
  gradientButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -5,
    zIndex: -1,
    borderRadius: 50,
    height: 50,
    overflow: 'hidden',
  },
  groupProduct: {
    flexWrap: 'wrap',
    gap: 15,
    flexDirection: 'row',
    marginTop: 28,
  },
});
