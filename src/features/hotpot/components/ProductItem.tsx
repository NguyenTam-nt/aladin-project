import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  formatNumberDotSlice,
  getValueForDevice,
} from '../../../commons/formatMoney';
import QuantityUpdate from '../../../components/QuantityUpdate';
import {getLinkImageUrl} from 'src/commons';
import {IMenuItem} from 'src/api/products';

type PropsProductItem = {
  data: IMenuItem
  isPushCategory?: boolean
};

export const ProductItem = memo(({data, isPushCategory}: PropsProductItem) => {
  const source = useMemo(() => {
    return {
      uri: getLinkImageUrl(data?.linkMedia ?? '', 200, 180),
    };
  }, [data]);
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
          {data.name}
        </TextCustom>
        <TextCustom
          numberOfLines={2}
          fontSize={18}
          weight="700"
          color={defaultColors.c_fff}>
          {formatNumberDotSlice(Number(data.pricePromotion))}
        </TextCustom>
        <View style={styles.styleGroupBtn}>
          <QuantityUpdate  hotpotType  isUnAddList={!isPushCategory} data={data} />
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
