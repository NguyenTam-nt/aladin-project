import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo, useCallback} from 'react';
import {categoryKitchenNames, defaultColors, headersCategory} from '@configs';
import {TextCustom} from '@components';

type Props = {
  onChange: (category: categoryKitchenNames) => void
  currentCategory?: categoryKitchenNames
};

export const HandleTabKitchen = ({onChange, currentCategory}: Props) => {
  return (
    <View style={styles.groupBtn}>
      {headersCategory.map((item, index) => {
        const isActive = currentCategory === item.slug;
        return (
          <HeaderButton
            onPress={onChange}
            isActive={isActive}
            key={index}
            name={item.name}
            slug={item.slug}
          />
        );
      })}
    </View>
  );
};

type PropsHeaderButton = {
  isActive: boolean
  name: string
  slug: categoryKitchenNames
  onPress: (category: categoryKitchenNames) => void
};

export const HeaderButton = memo(
  ({isActive, name, slug, onPress}: PropsHeaderButton) => {
    const handlePress = useCallback(() => {
      onPress(slug);
    }, [slug]);
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.styleBtn,
          {
            backgroundColor: isActive ? defaultColors.c_fff : 'transparent',
          },
        ]}>
        <TextCustom
          fontSize={16}
          weight="600"
          color={isActive ? defaultColors._EA222A : defaultColors.c_fff}>
          {name}
        </TextCustom>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    backgroundColor: defaultColors.bg_2D2D2D,
    flexDirection: 'row',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  styleBtn: {
    width: 146,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: defaultColors.c_fff,
  },
  styleRight: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
});
