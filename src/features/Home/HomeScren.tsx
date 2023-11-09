import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import HeaderHome from './components/HeaderHome';
import {DIMENSION} from '@constants';
import Banner from './components/Banner';
import SpaceBottom from 'src/components/SpaceBottom';
import ProductNewList from './components/ProductNewList';
import ProductSaleList from './components/ProductSaleList';
import ContactTopic from './components/ContactTopic';
import ProductOutStandingList from './components/ProductOutStandingList';
import CategoriesList from './components/CategoriesList';
import {BannerType} from 'src/typeRules/banner';
import ImperativeScrollView, {
  ImperativeScrollViewHandles,
} from 'src/hooks/useImperativeScrollView';
import {useFocusEffect} from '@react-navigation/native';
import {useListItemProvice} from 'src/redux/provices/hooks';

const HomeScren = () => {
  const scrollViewRef = useRef<ImperativeScrollViewHandles>(null);
  const proviceItem = useListItemProvice();

  const onTopScroll = () => {
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onTopScroll();
      };
    }, [proviceItem]),
  );

  return (
    <View style={styles.container}>
      <HeaderHome />
      <ImperativeScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        <Banner bannerType={BannerType.homePage} />
        <View style={styles.styleBody}>
          <CategoriesList />
          <ProductSaleList />
          {/* <GroupContact /> */}
          {/* <CategoryOutStandingList /> */}
          <ProductOutStandingList />
          <ProductNewList />
        </View>
        <ContactTopic />
        <SpaceBottom />
      </ImperativeScrollView>
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
  styleBackgroudOpacity: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 64,
    left: 0,
    margin: 0,
    zIndex: 1,
    backgroundColor: defaultColors.bg_EFEFEF,
    height: 300,
    width: '100%',
  },
  groupStyleButton: {
    width: '100%',
    height: 120,
    paddingHorizontal: 14,
    flexDirection: 'column',
    backgroundColor: defaultColors.bg_00C3AB,
  },
  buttonClose: {
    marginTop: 11,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  inputSearch: {
    flex: 1,
    height: '100%',
  },
  proviceContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  scrollView: {
    flex: 1,
  },
});
