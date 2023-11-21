import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {
  defaultColors,
  isTabletDevice,
} from '@configs';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';
import {getValueForDevice} from '../../../commons/formatMoney';
import {getLinkImageUrl} from 'src/commons';
import { useGetCartItem } from '../hook/useGetCartItem';

// 216

const widthHotPot = isTabletDevice ? (DIMENSION.height - 72 - 64 - 40 - 40 - 32 - DIMENSION.topPadding - DIMENSION.bottomPadding) >= 436 ?  436 : 260 : DIMENSION.width - 19 * 2;
const percent = widthHotPot / 436;

const corePot =
  widthHotPot -
  getValueForDevice(18, 14) * 2 -
  getValueForDevice(45.64 * percent, 35.18) * 2;
const sizeImageCategory =
  (widthHotPot -
    getValueForDevice(18, 14) * 2 -
    getValueForDevice(45.64 * percent, 35.18) * 2 -
    2) /
  2;

type Props = {
  currentCategory: number
}
export const HotPot = ({currentCategory}: Props) => {

  const {listCategoriesByCategory, isFourBar, isOneBar, isTwoBar} = useGetCartItem(currentCategory);

   useEffect(() => {


   } , [isFourBar ,isOneBar ,isTwoBar]);


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
                  300,
                  300,
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
    marginTop: getValueForDevice(40, 25),
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
    width: getValueForDevice(2, 0.5),
    height: getValueForDevice(widthHotPot - 18 * 2 - 13 * 2, widthHotPot - 24 * 2),
    backgroundColor: defaultColors.bg_939393,
    position: 'absolute',
    left: widthHotPot / 2 + 1,
    top: getValueForDevice(32, 24),
    zIndex: 1,
  },
  styleLineHorizontal: {
    width: getValueForDevice(widthHotPot - 18 * 2 - 13 * 2, widthHotPot - 24 * 2),
    height: getValueForDevice(2, 0.5),
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
    borderTopLeftRadius: 32 * percent,
    overflow: 'hidden',
  },
  styleImageTwo: {
    position: 'absolute',
    left: widthHotPot / 2 + getValueForDevice(3, 2),
    bottom: widthHotPot / 2 - 1,
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderTopRightRadius: Math.round(32 * percent),
    overflow: 'hidden',
  },
  styleImageThree: {
    position: 'absolute',
    right: widthHotPot / 2 - 1,
    top: widthHotPot / 2 + getValueForDevice(3, 2),
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomLeftRadius: 32 * percent,
    overflow: 'hidden',
  },
  styleImageFour: {
    position: 'absolute',
    left: widthHotPot / 2 + getValueForDevice(3, 2),
    top: widthHotPot / 2 + getValueForDevice(3, 2),
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomRightRadius: Math.round(32 * percent),
    overflow: 'hidden',
  },
  styleTwoBarOne: {
    position: 'absolute',
    right: getValueForDevice(45.64 * percent, 35.18) + 16,
    bottom: widthHotPot / 2 - 1,
    width: corePot,
    height: sizeImageCategory,
    zIndex: 2,
    borderTopLeftRadius:  Math.round(32 * percent),
    borderTopRightRadius:  Math.round(32 * percent),
    overflow: 'hidden',
  },
  styleTwoBarTwo: {
    position: 'absolute',
    right: getValueForDevice(45.64 * percent, 35.18) + 16,
    top: widthHotPot / 2 + 3,
    width: corePot,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomLeftRadius:  Math.round(32 * percent),
    borderBottomRightRadius:  Math.round(32 * percent),
    overflow: 'hidden',
  },
  styleOneBarOne: {
    position: 'absolute',
    right: getValueForDevice(45.64 * percent, 35.18) + 16,
    bottom: getValueForDevice(45.64 * percent, 35.18) + 16,
    width: corePot,
    height: corePot,
    zIndex: 2,
    borderRadius:  Math.round(32 * percent),
    overflow: 'hidden',
  },
  styleImageCategory: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
