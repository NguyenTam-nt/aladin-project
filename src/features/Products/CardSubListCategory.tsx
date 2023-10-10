import {TextCustom, Thumb} from '@components';
import { defaultColors } from '@configs';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ISubCategoryList} from 'src/api/category';
import {globalStyles} from 'src/commons/globalStyles';
import useI18n from 'src/hooks/useI18n';
interface IProps {
  subCatewgoryItem: ISubCategoryList;
}

const CardSubListCategory = memo((props: IProps) => {
  const {subCatewgoryItem} = props;
  const {isVn} = useI18n();
  return (
    <View style={stytles.container}>
      <Thumb
        source={{uri: subCatewgoryItem.imagesSubcategory[0].url}}
        resizeMode="cover"
        style={{width: 110, height: 75, borderRadius: 10}}
      />
      <TextCustom fontSize={14} weight="400" color={defaultColors.c_0000}>
        {isVn
          ? subCatewgoryItem.subCategoryNameVn
          : subCatewgoryItem.subCategoryNameKr}
      </TextCustom>
    </View>
  );
});

export default CardSubListCategory;
const stytles = StyleSheet.create({
  container: {
    ...globalStyles.col,
    rowGap: 4,
  },
});
