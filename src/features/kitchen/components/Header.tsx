import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {memo, useCallback} from 'react';
import { defaultColors, headersCategory} from '@configs';
import {TextCustom} from '@components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ICMenubar} from '../../../assets/icons/ICMenubar';

type Props = {
  currentCategory: string
  onChange: (category: string) => void
};

export const Header = memo(({currentCategory, onChange}: Props) => {
  const navigation = useNavigation();
  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.groupBtn}>
        {headersCategory.map((item, index) => {
          const isActive = currentCategory === item.slug;
          return (
           <HeaderButton onPress={onChange} isActive={isActive}  key={index} name={item.name} slug={item.slug}/>
          );
        })}
      </View>
      <TouchableOpacity onPress={onDraw}>
        <ICMenubar color={defaultColors.c_fff} />
      </TouchableOpacity>
    </View>
  );
});

type PropsHeaderButton = {
  isActive: boolean
  name: string
  slug: string
  onPress: (category: string) => void
};

export const HeaderButton = memo(({isActive, name, slug ,onPress}: PropsHeaderButton) => {
    const handlePress = useCallback(() => {
        onPress(slug)
    }, [slug])
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
});

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
});
