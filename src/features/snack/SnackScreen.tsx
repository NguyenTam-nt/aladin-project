import { defaultColors, isTabletDevice } from '@configs';
import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import SpaceBottom from '../../components/SpaceBottom';
import DishItem from './components/DishItem';

const SnackScreen = () => {

    const renderItem = (item: ListRenderItemInfo<any>) => {
      return (
         <DishItem />
      );
    };

  return (
    <View
      style={{backgroundColor: defaultColors.bg_primary, flex: 1, height: 500}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
        renderItem={renderItem}
        numColumns={isTabletDevice ? 3 : 1}
        ListFooterComponent={<SpaceBottom />}
      />
    </View>
  );
};

export default SnackScreen;
