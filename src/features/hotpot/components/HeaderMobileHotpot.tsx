import {View, Text} from 'react-native';
import React, {memo} from 'react';
import {MultipleScreenView} from 'src/components/MultipleScreenView';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {GroupHotpot} from './GroupHotpot';

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
            <View style={{marginTop: 25}}>
              <TextCustom
                textAlign="center"
                fontSize={14}
                weight="700"
                color={defaultColors.c_fff}
                fontiCielBCCubanoNormal="iCielBCCubano-Normal">
                Vui lòng chọn 1 vị nước Lẩu.
              </TextCustom>
            </View>
          </>
        }
      />
    );
  },
);
