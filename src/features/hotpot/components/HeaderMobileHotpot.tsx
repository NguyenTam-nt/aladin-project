import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {MultipleScreenView} from 'src/components/MultipleScreenView';
import {defaultColors} from '@configs';
import {GroupHotpot} from './GroupHotpot';
import { globalStyles } from 'src/commons/globalStyles'

type Props = {
  currentCategory: number
  handlePressCategory: (currentCategory: number) => void
};

export const HeaderMobileHotpot = memo(
  ({currentCategory, handlePressCategory}: Props) => {
    return (
      <MultipleScreenView
        phoneView={
          <>
            <GroupHotpot
              currentCategory={currentCategory}
              handlePressCategory={handlePressCategory}
            />
            <View style={style.mt_25}>
              <Text style={style.text_title}>
                Vui lòng chọn 1 vị nước Lẩu.
              </Text>
            </View>
          </>
        }
      />
    );
  },
);

const style = StyleSheet.create({
  mt_25: {
    marginTop: 25,
    ...globalStyles.alignItemsCenter
  },
  text_title: {
    fontSize: 14,
    fontFamily: "iCielBCCubano-Normal",
    color: defaultColors.c_fff
  }
});
