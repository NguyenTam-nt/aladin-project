import {StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {
  defaultColors,
  hotpotId1,
  hotpotId2,
  hotpotId4,
  isTabletDevice,
} from '@configs';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';
import {getValueForDevice} from '../../../commons/formatMoney';
import {getLinkImageUrl} from 'src/commons';
import { useGetCartItem } from '../hook/useGetCartItem';

const widthHotPot = isTabletDevice ? 436 : DIMENSION.width - 19 * 2;
const corePot =
  widthHotPot -
  getValueForDevice(18, 14) * 2 -
  getValueForDevice(45.64, 35.18) * 2;
const sizeImageCategory =
  (widthHotPot -
    getValueForDevice(18, 14) * 2 -
    getValueForDevice(45.64, 35.18) * 2 -
    2) /
  2;

type Props = {
  currentCategory: number
}
export const HotPot = ({currentCategory}: Props) => {

  const {listCategoriesByCategory, isFourBar, isOneBar, isTwoBar} = useGetCartItem(currentCategory);

   useEffect(() => {


   }, [isFourBar, isOneBar, isTwoBar]);


  return (
    <View style={styles.styleHotpot}>
      <View style={styles.styleViewHotPot}>
        {isFourBar ? <View style={styles.styleLineVertical} /> : null}
        {!isOneBar ? <View style={styles.styleLineHorizontal} /> : null}

        <FastImage
          style={styles.styleImage}
          source={require('../../../assets/image/hot_pot.jpg')}
        />
        {listCategoriesByCategory.length > 0 ? (
          <View
            style={[
              isFourBar
                ? styles.styleImageOne
                : isTwoBar
                ? styles.styleTwoBarOne
                : styles.styleOneBarOne,
            ]}>
            <Thumb
              style={styles.styleImageCategory}
              source={{
                uri: getLinkImageUrl(
                  listCategoriesByCategory[0].linkMedia,
                  100,
                  100,
                ),
              }}
            />
          </View>
        ) : null}
        {!isOneBar ? (
          listCategoriesByCategory.length > 1 ? (
            <View
              style={[
                isFourBar ? styles.styleImageThree : styles.styleTwoBarTwo,
              ]}>
              <Thumb
                style={styles.styleImageCategory}
                source={{
                  uri: getLinkImageUrl(
                    listCategoriesByCategory[1].linkMedia,
                    100,
                    100,
                  ),
                }}
              />
            </View>
          ) : null
        ) : null}
        {isFourBar ? (
          <>
            {listCategoriesByCategory.length > 2 ? (
              <View style={styles.styleImageTwo}>
                <Thumb
                  style={styles.styleImageCategory}
                  source={{
                    uri: getLinkImageUrl(
                      listCategoriesByCategory[2].linkMedia,
                      100,
                      100,
                    ),
                  }}
                />
              </View>
            ) : null}
            {listCategoriesByCategory.length > 3 ? (
              <View style={styles.styleImageFour}>
                <Thumb style={styles.styleImageCategory} source={{
                  uri: getLinkImageUrl(
                    listCategoriesByCategory[3].linkMedia,
                    100,
                    100,
                  ),
                }} />
              </View>
            ) : null}
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  styleHotpot: {
    marginTop: getValueForDevice(56, 25),
  },
  styleViewHotPot: {
    width: widthHotPot,
    height: widthHotPot,
    backgroundColor: defaultColors.bg_36383A,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  styleImage: {
    width: widthHotPot - getValueForDevice(18, 14),
    height: widthHotPot - getValueForDevice(18, 14),
    resizeMode: 'cover',
  },
  styleLineVertical: {
    width: 2,
    height: getValueForDevice(374, widthHotPot - 24 * 2),
    backgroundColor: defaultColors.bg_939393,
    position: 'absolute',
    left: widthHotPot / 2 + 1,
    top: getValueForDevice(32, 24),
    zIndex: 1,
  },
  styleLineHorizontal: {
    width: getValueForDevice(374, widthHotPot - 24 * 2),
    height: 2,
    backgroundColor: defaultColors.bg_939393,
    position: 'absolute',
    left: getValueForDevice(32, 24),
    top: widthHotPot / 2 + 1,
    zIndex: 1,
  },
  styleImageOne: {
    position: 'absolute',
    right: widthHotPot / 2 - 1,
    bottom: widthHotPot / 2 - 1,
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderTopLeftRadius: 32,
    overflow: 'hidden',
  },
  styleImageTwo: {
    position: 'absolute',
    left: widthHotPot / 2 + 3,
    bottom: widthHotPot / 2 - 1,
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  styleImageThree: {
    position: 'absolute',
    right: widthHotPot / 2 - 1,
    top: widthHotPot / 2 + 3,
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomLeftRadius: 32,
    overflow: 'hidden',
  },
  styleImageFour: {
    position: 'absolute',
    left: widthHotPot / 2 + 3,
    top: widthHotPot / 2 + 3,
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  styleTwoBarOne: {
    position: 'absolute',
    right: getValueForDevice(45.64, 35.18) + 16,
    bottom: widthHotPot / 2 - 1,
    width: corePot,
    height: sizeImageCategory,
    zIndex: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  styleTwoBarTwo: {
    position: 'absolute',
    right: getValueForDevice(45.64, 35.18) + 16,
    top: widthHotPot / 2 + 3,
    width: corePot,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  styleOneBarOne: {
    position: 'absolute',
    right: getValueForDevice(45.64, 35.18) + 16,
    bottom: getValueForDevice(45.64, 35.18) + 16,
    width: corePot,
    height: corePot,
    zIndex: 2,
    borderRadius: 32,
    overflow: 'hidden',
  },
  styleImageCategory: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
