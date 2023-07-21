import {  Text ,StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { ICTabBarMobile } from 'src/assets/icons/ICTabBarMobile';
import { defaultColors, isTabletDevice } from '@configs';

const ButtonMenuTabBar = ({
  onPress,
}: {
  onPress: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
     isTabletDevice ? <></> :
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(value => !value);
      }}>
      <Text style={styles.textMenu}>Menu</Text>
      <ICTabBarMobile />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textMenu : {
    color : defaultColors._EA222A,
    fontSize : 16 ,
    fontWeight : '600',
  },
});

export default ButtonMenuTabBar;
