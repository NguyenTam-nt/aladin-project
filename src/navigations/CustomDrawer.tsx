import * as React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {View, StyleSheet} from 'react-native';
import {DrawerItemListCustom} from './DrawerItemListCustom';
import { ICLogo } from '@icons';
import { defaultColors } from '@configs';


const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
         contentContainerStyle={{backgroundColor: 'transparent'}}>
        <View >
            <View  style={{ alignItems : 'center'}}>
          <ICLogo color={defaultColors.c_fff} height={168} width={168} />
          </View>
          <DrawerItemListCustom {...props} />

        </View>
      </DrawerContentScrollView>

    </View>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : defaultColors.c_222124,
    width : 216,
  },
});
