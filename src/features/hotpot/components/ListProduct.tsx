import {FlatList, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {ProductItem} from './ProductItem';
import SpaceBottom from '../../../components/SpaceBottom';
import {defaultColors} from '@configs';
import {GroupHotpot} from './GroupHotpot';
import {TextCustom} from '@components';
import {MultipleScreenView} from '../../../components/MultipleScreenView';
import {getValueForDevice} from '../../../commons/formatMoney';

type Props = {
  currentCategory: number
  handlePressCategory: (id: number) => void
};

export const ListProduct = memo(
  ({currentCategory, handlePressCategory}: Props) => {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({}) => {
          return <ProductItem />;
        }}
        keyExtractor={item => item.toString()}
        ListFooterComponent={<SpaceBottom />}
        ListHeaderComponent={
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
        }
        ListHeaderComponentStyle={styles.styleHeader}
        showsVerticalScrollIndicator={false}
      />
    );
  },
);

const styles = StyleSheet.create({
  styleHeader: {
    marginBottom: getValueForDevice(0, 25),
  },
});
