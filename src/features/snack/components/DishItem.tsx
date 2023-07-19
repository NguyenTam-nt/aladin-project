import { defaultColors, isTabletDevice } from '@configs';
import { DIMENSION } from '@constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import QuantityUpdate from '../../../components/QuantityUpdate';

const DishItem = () => {


  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: 'https://images.unsplash.com/photo-1602253057119-44d745d9b860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        }}
        style={{height: 168, width: 168}}
      />
      <View style={{margin: 16, flex: 1}}>
        <Text style={styles.textTitle} numberOfLines={2}>
          Combo 2 Người lớn ăn thả ga....
        </Text>
        <Text style={styles.textPrice} numberOfLines={2}>
          600.000
        </Text>
        <View style={styles.quantityUpdate}>
          <QuantityUpdate />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: isTabletDevice ?  DIMENSION.width / 3 : DIMENSION.width  ,
    height: 168,
    backgroundColor: defaultColors._26272C,
    flexDirection: 'row',
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
