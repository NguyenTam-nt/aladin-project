import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {formatNumberDotSlice, getValueForDevice} from '../../../commons/formatMoney';
import QuantityUpdate from '../../../components/QuantityUpdate';

export const ProductItem = memo(() => {
  const source = useMemo(() => {
    return {
      uri: 'https://cdn.tgdd.vn/2021/06/CookProduct/Lau-cay-tu-xuyen.-1200x675.jpg',
    };
  }, []);
  return (
    <View style={styles.styleGroupImage}>
      <View style={styles.styleContainerImage}>
        <Thumb style={styles.styleImageCategory} source={source} />
      </View>
      <View style={styles.styleGroupView}>
        <TextCustom
          numberOfLines={2}
          fontSize={18}
          weight="500"
          color={defaultColors.c_fff}>
          Combo 2 Người lớn ăn thả ga....
        </TextCustom>
        <TextCustom
          numberOfLines={2}
          fontSize={18}
          weight="700"
          color={defaultColors.c_fff}>
          {formatNumberDotSlice(600000)}
        </TextCustom>
        <View style={styles.styleGroupBtn}>
          <QuantityUpdate value={1} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  styleGroupImage: {
    flexDirection: 'row',
    width: '100%',
    height: 180,
  },
  styleContainerImage: {
    width: getValueForDevice('55%', '45%'),
    height: '100%',
  },
  styleImageCategory: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  styleGroupView: {
    padding: 24,
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
    backgroundColor: defaultColors._26272C,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  styleGroupBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
