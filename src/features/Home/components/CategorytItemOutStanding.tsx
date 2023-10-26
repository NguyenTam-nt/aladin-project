import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {defaultColors} from '@configs';
import {TextCustom, Thumb} from '@components';
import {ICCircleArrowRight} from 'src/assets/icons/ICCircleArrowRight';
import {globalStyles} from 'src/commons/globalStyles';
import {ICategory} from 'src/api/category';
import useI18n from 'src/hooks/useI18n';

type Props = {
  index: string;
  data: ICategory;
};

const CategoryItemOutStanding = memo(({index, data}: Props) => {
  const {isVn} = useI18n();
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
        <View>
          <ICCircleArrowRight />
        </View>
      </View>
      <View style={{height: 35}}>
        <TextCustom
          fontSize={14}
          weight="700"
          numberOfLines={2}
          color={defaultColors.text_313131}>
          {isVn ? data.categoryNameVn : data.categoryNameKr}
        </TextCustom>
      </View>
      <View style={{flex: 1}}>
        <Thumb
          style={styles.styleImage}
          resizeMode="cover"
          source={{uri: data.imagesCategory[0].url}}
        />
      </View>
    </View>
  );
});

export default CategoryItemOutStanding;

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
