import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {defaultColors, isTabletDevice} from '@configs';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';
import {getValueForDevice} from '../../../commons/formatMoney';

const widthHotPot = isTabletDevice ? 436 : DIMENSION.width - 19 * 2;
const sizeImageCategory =
  (widthHotPot -
    getValueForDevice(18, 14) * 2 -
    getValueForDevice(45.64, 35.18) * 2 -
    2) /
  2;

type Props = {
  currentCategory: number
};

export const HotPot = ({currentCategory}: Props) => {
  const source = useMemo(() => {
    return {
      uri: 'https://cdn.tgdd.vn/2021/06/CookProduct/Lau-cay-tu-xuyen.-1200x675.jpg',
    };
  }, []);
  return (
    <View style={styles.styleHotpot}>
      <View style={styles.styleViewHotPot}>
        {currentCategory === 123 ? (
          <View style={styles.styleLineVertical} />
        ) : null}
        {currentCategory !== 345 ? (
          <View style={styles.styleLineHorizontal} />
        ) : null}

        <FastImage
          style={styles.styleImage}
          source={require('../../../assets/image/hot_pot.jpg')}
        />
        <View style={styles.styleImageOne}>
          <Thumb style={styles.styleImageCategory} source={source} />
        </View>
        <View style={styles.styleImageTwo}>
          <Thumb style={styles.styleImageCategory} source={source} />
        </View>
        <View style={styles.styleImageThree}>
          <Thumb style={styles.styleImageCategory} source={source} />
        </View>
        <View style={styles.styleImageFour}>
          <Thumb style={styles.styleImageCategory} source={source} />
        </View>
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
    backgroundColor: 'red',
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
    backgroundColor: 'blue',
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
    backgroundColor: 'red',
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
    backgroundColor: 'red',
    width: sizeImageCategory,
    height: sizeImageCategory,
    zIndex: 2,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  styleImageCategory: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
