import {View, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {categoriesHotpot, defaultColors, isTabletDevice} from '@configs';
import {ListProduct} from './components/ListProduct';
import {GroupHotpot} from './components/GroupHotpot';
import {MultipleScreenView} from '../../components/MultipleScreenView';
import { getValueForDevice } from '../../commons/formatMoney'
import { useGetCartItem } from './hook/useGetCartItem'

const HotPotScreen = () => {
  const [currentCategory, setCurrentCategory] = useState(categoriesHotpot[0].id);
  const {clearMenuCategory} = useGetCartItem(currentCategory)

  const handlePressCategory = useCallback((id: number) => {
    clearMenuCategory()
    setCurrentCategory(id);
  }, [clearMenuCategory]);
  return (
    <View style={styles.container}>
      <MultipleScreenView
        tableVew={
          <GroupHotpot
            currentCategory={currentCategory}
            handlePressCategory={handlePressCategory}
          />
        }
      />
      <View style={styles.container_child}>
        <ListProduct
          currentCategory={currentCategory}
          handlePressCategory={handlePressCategory}
        />
      </View>
    </View>
  );
};

export default HotPotScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.bg_primary,
    flex: 1,
    flexDirection: getValueForDevice('row', 'column'),
    padding: isTabletDevice ? 32 : 19,
    gap: 32,
  },
  container_child: {
    flex: 1,
    position: 'relative',
  },
  imageThumb: {
    position: 'absolute',
    bottom: -32,
    left: 0,
  },
  fastImage: {
    width: 100,
    height: 100,
  },
});
