import { defaultColors, isTabletDevice } from '@configs';
import { DIMENSION } from '@constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import QuantityUpdate from '../../../components/QuantityUpdate';
import { IMenuItem } from 'src/api/products';
import { formatNumberDotSlice } from 'src/commons/formatMoney';

const DishItem = React.memo(({item}: {item: IMenuItem}) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: item.linkMedia,
        }}
        style={{height: 168, width: 168}}
      />
      <View style={{margin: 16, flex: 1}}>
        <Text style={styles.textTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.textPrice} numberOfLines={2}>
          {formatNumberDotSlice(item.price)}
        </Text>
        <View style={styles.quantityUpdate}>
          <QuantityUpdate data={item} />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: isTabletDevice ?  DIMENSION.width / 3 : DIMENSION.width  ,
    height: 168,
    backgroundColor: defaultColors._26272C,
    flexDirection: 'row',
    borderBottomWidth : 1,
    borderColor : 'rgba(0, 0, 0, 0.2  )',
  },
  textTitle: {
    color: defaultColors.c_fff,
    fontSize: 18,
    fontWeight : '500',
  },
  textPrice: {
    color: defaultColors.c_fff,
    fontSize: 18,
    fontWeight :'bold',
    marginTop : 16,
  },
  quantityUpdate : {
    position : 'absolute' ,
    bottom : 0 ,
    right : 0,
  },
});

export default DishItem;
