import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, { memo } from 'react';
import {defaultColors, heightHeader, paddingHorizontal} from '@configs';
import {ICMenubar} from '../../assets/icons/ICMenubar';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ICLogo} from '../../assets/icons/ICLogo';

export const Header = () => {
  const navigation = useNavigation();
  const onDraw = async () => {
    await Keyboard.dismiss();
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <SafeAreaView style={styles.bg_fff}>
      <View style={styles.container}>
        <TouchableOpacity>
          <ICLogo />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDraw}>
          <ICMenubar />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg_fff: {
    backgroundColor: defaultColors.c_fff,
  },
  container: {
    height: heightHeader,
    backgroundColor: defaultColors.c_fff,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontal,
  },
});
