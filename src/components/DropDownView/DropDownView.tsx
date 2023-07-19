import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useState } from 'react';
import {   StyleProp, StyleSheet, Text, TouchableOpacity, LayoutAnimation, View, ViewStyle, UIManager, Platform, TextStyle } from 'react-native';
import { ICUp } from '../../assets/icons/ICUp';
import { ICDown } from '../../assets/icons/ICDown';


interface DropDownView {
  containerStyle?: StyleProp<ViewStyle>
  headerButtonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  itemView: JSX.Element
  isOpen : boolean
  textHeader : string
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
    textStyle = {},
    itemView,
    isOpen,
    textHeader,
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
        <Text style={textStyle}>{textHeader}</Text>
        {open ? <ICUp /> : <ICDown color={defaultColors.c_222124} />}
      </TouchableOpacity>
      <View style={[styles.viewItem, !open ? {height: 0} : undefined]}>
        {open && itemView}
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
