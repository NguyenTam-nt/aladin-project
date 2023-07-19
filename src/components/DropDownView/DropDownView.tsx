import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useState } from 'react';
import {   StyleProp, StyleSheet, Text, TouchableOpacity, LayoutAnimation, View, ViewStyle, UIManager, Platform } from 'react-native';
import { ICUp } from '../../assets/icons/ICUp';
import { ICDown } from '../../assets/icons/ICDown';


interface DropDownView {
  containerStyle?: StyleProp<ViewStyle>
  headerButtonStyle?: StyleProp<ViewStyle>
  texStyle?: StyleProp<ViewStyle>
  itemView: JSX.Element
  isOpen : boolean
}
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
const DropDownView = React.memo((props: DropDownView) => {
  const {
    containerStyle = {},
    headerButtonStyle = {},
    texStyle = {},
    itemView,
    isOpen,
  } = props;
  const [open, setOpen] = useState<boolean>(true);

  const changeOpen = useCallback(() => {
    setOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  useEffect(() => {
    if (isOpen !== undefined) {
    setOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[styles.headerButton, headerButtonStyle]}
        activeOpacity={0.9}
        onPress={changeOpen}>
        <Text style={texStyle}>Test</Text>
        {open ? <ICUp /> : <ICDown color={defaultColors.c_222124} />}
      </TouchableOpacity>
      <View style={[styles.viewItem, !open ? {height: 0} : undefined]}>
        {itemView}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({

  headerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  styleView: {
    height: 50,
    backgroundColor: 'red',
  },
  viewItem: {overflow: 'hidden'},
});

export default DropDownView;
