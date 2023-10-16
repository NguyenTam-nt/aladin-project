import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {defaultColors} from '@configs';
import HeaderHome from './components/HeaderHome';
import {DIMENSION, paddingHorizontalScreen} from '@constants';
import Banner from './components/Banner';
import SpaceBottom from 'src/components/SpaceBottom';
import GroupContact from './components/GroupContact';
import CategoryOutStandingList from './components/CategoryOutStandingList';
import ProductNewList from './components/ProductNewList';
import ProductSaleList from './components/ProductSaleList';
import ContactTopic from './components/ContactTopic';
import {TextCustom} from '@components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import InputSearch from 'src/components/InputSearch';
import {ICClose} from 'src/assets/icons/ICClose';
import PROVICE from '../../assets/provice/province_date.json';
import TextTranslate from 'src/components/TextTranslate';
import {useHandleAddProvice} from 'src/redux/provices/hooks';

const HomeScren = () => {
  const {top: statusBarHeight} = useSafeAreaInsets();
  const height = DIMENSION.height;
  const [showProvice, setShowProvice] = useState<boolean>(false);
  const handleAddProvice = useHandleAddProvice();

  return (
    <View style={styles().container}>
      <HeaderHome setShowProvice={setShowProvice} showProvice={showProvice} />
      {showProvice && (
        <View style={styles(statusBarHeight, height).styleBackgroudOpacity}>
          <View style={styles().groupStyleButton}>
            <TouchableOpacity
              onPress={() => setShowProvice(prev => !prev)}
              style={styles().buttonClose}>
              <ICClose />
            </TouchableOpacity>
            <InputSearch style={styles().inputSearch} />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingHorizontal: 14,
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: defaultColors.br_E9E9E9,
            }}>
            <TextTranslate
              fontSize={14}
              weight="700"
              color={defaultColors.text_626262}
              text="common.choose-provice"
            />
          </View>
          <ScrollView>
            <View style={styles().proviceContainer}>
              {PROVICE.map((it, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleAddProvice({Id: it.Id, Name: it.Name});
                      setShowProvice(prev => !prev);
                    }}
                    key={idx}
                    style={{
                      width:
                        (DIMENSION.width - paddingHorizontalScreen * 2 - 15) /
                        2,
                      height: 50,
                      borderBottomWidth: 1,
                      borderBottomColor: defaultColors.br_E9E9E9,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <TextCustom>{it.Name}</TextCustom>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Banner />
        <View style={styles().styleBody}>
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
const styles = (statusBarHeight?: number, height?: number) =>
  StyleSheet.create({
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
      top: (statusBarHeight ?? 0) + 64,
      left: 0,
      // alignItems: 'center',
      margin: 0,
      zIndex: 1,
      backgroundColor: defaultColors.bg_EFEFEF,
      height: (height ?? 0) - (statusBarHeight ?? 0) - 300,
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
  });
