import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextCustom} from './Text';
import {ICCircleArrowRight} from 'src/assets/icons/ICCircleArrowRight';
import {globalStyles} from 'src/commons/globalStyles';
import {Thumb} from './Thumb/Thumb';
import {NavLink} from 'src/constants/links';
import {productRoute} from 'src/constants/routers';

interface IProps {
  index: any;
  name: string;
  imageLink: string;
  // idProduct: any;
}
const FeaturedItem = (props: IProps) => {
  const {index, name, imageLink} = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          ...globalStyles.row,
          ...globalStyles.justifyContentBetween,
          ...globalStyles.alignItemsCenter,
        }}>
        <TextCustom
          fontSize={24}
          color={defaultColors.text_C4C4C4}
          weight="700">
          {index}
        </TextCustom>
        <ICCircleArrowRight />
      </View>
      <View style={{height: 35}}>
        <TextCustom
          fontSize={14}
          weight="700"
          numberOfLines={2}
          color={defaultColors.text_313131}>
          {name}
        </TextCustom>
      </View>
      <View
        style={{
          flex: 1,
          overflow: 'hidden',
          borderRadius: 8,
          width: '100%',
          height: '100%',
        }}>
        <Thumb
          style={styles.styleImage}
          resizeMode="stretch"
          source={{uri: imageLink}}
        />
      </View>
    </View>
  );
};

export default FeaturedItem;
const styles = StyleSheet.create({
  container: {
    width: 132,
    height: 202,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 8,
    padding: 4,
    paddingTop: 24,
    rowGap: 12,
    marginRight: 8,
  },
  styleImage: {width: '100%', height: '100%', borderRadius: 8},
});
