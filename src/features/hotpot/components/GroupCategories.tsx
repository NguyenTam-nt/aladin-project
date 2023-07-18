import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {ButtonCategory} from './ButtonCategory';

const categories = [
  {
    name: 'Lẩu 4 ngăn',
    id: 123,
  },
  {
    name: 'Lẩu 2 ngăn',
    id: 234,
  },
  {
    name: 'Nồi đơn',
    id: 345,
  },
];

type Props = {
  onPress: (id: number) => void
  currentCategory: number
};

export const GroupCategories = memo(({onPress, currentCategory}: Props) => {
  return (
    <View style={styles.group_btn}>
      {categories.map(item => {
        return (
          <ButtonCategory
            onPress={onPress}
            id={item.id}
            isActive={currentCategory === item.id}
            text={item.name}
            key={item.id}
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  group_btn: {
    flexDirection: 'row',
    gap: 16,
  },
});
