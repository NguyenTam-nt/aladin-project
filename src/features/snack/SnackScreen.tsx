import { defaultColors, isTabletDevice } from '@configs';
import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import SpaceBottom from '../../components/SpaceBottom';
import DishItem from './components/DishItem';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigations/DrawerOrder';
import { useProductFlatList } from './components/hooks/useProductFlatList';
import { IMenuItem } from 'src/api/products';

const SnackScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  const {keyExtractor, dataProducts, onRefresh} = useProductFlatList(
    route.params.id,
  );


    const renderItem = (item: ListRenderItemInfo<IMenuItem>) => {
      return (
         <DishItem item={item.item}/>
      );
    };
    useEffect(() => {} , []);

  return (
    <View
      style={{backgroundColor: defaultColors.bg_primary, flex: 1, height: 500}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataProducts.data}
        renderItem={renderItem}
        numColumns={isTabletDevice ? 3 : 1}
        ListFooterComponent={<SpaceBottom />}
      />
    </View>
  );
};

export default SnackScreen;
