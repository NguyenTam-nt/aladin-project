import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useMemo } from 'react';
import { ICAlcohol } from '../assets/icons/ICAlcohol';
import { ICDrinks } from '../assets/icons/ICDrinks';
import { ICHotPot } from '../assets/icons/ICHotPot';
import { ICJunkFood } from '../assets/icons/ICJunkFood';
import { ICSnack } from '../assets/icons/ICSnack';
import { ICSpice } from '../assets/icons/ICSpice';
import { ICVegetable } from '../assets/icons/ICVegetable';
import { HotpotOrder } from '../features/hotpot';
import { SnackOrder } from '../features/snack';
import CustomDrawer from './CustomDrawer';
import { View ,StyleSheet } from 'react-native';
import CartItem from '../components/CartItem';
const Drawer = createDrawerNavigator();
const DrawerOrderNavigation = () => {
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
      drawerStyle: {
        width: 216,
      },
    }),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={screenOptions}
        backBehavior="history">
        <Drawer.Screen
          name="hotpot"
          component={HotpotOrder}
          options={{
            drawerLabel: 'Lẩu',
            drawerIcon: ({color}: {color: string}) => (
              <ICHotPot color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="snacks"
          component={SnackOrder}
          options={{
            drawerLabel: 'Món ăn nhẹ',
            drawerIcon: ({color}: {color: string}) => <ICSnack color={color} />,
          }}
        />
        <Drawer.Screen
          name="vegetable"
          component={SnackOrder}
          options={{
            drawerLabel: 'Món rau',
            drawerIcon: ({color}: {color: string}) => (
              <ICVegetable color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="junkFood"
          component={SnackOrder}
          options={{
            drawerLabel: 'Đồ ăn vặt',
            drawerIcon: ({color}: {color: string}) => (
              <ICJunkFood color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="drinks"
          component={SnackOrder}
          options={{
            drawerLabel: 'Đồ uống',
            drawerIcon: ({color}: {color: string}) => (
              <ICDrinks color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="alcohol"
          component={SnackOrder}
          options={{
            drawerLabel: 'Rượu',
            drawerIcon: ({color}: {color: string}) => (
              <ICAlcohol color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="spice"
          component={SnackOrder}
          options={{
            drawerLabel: 'Gia vị',
            drawerIcon: ({color}: {color: string}) => <ICSpice color={color} />,
          }}
        />
      </Drawer.Navigator>
      <View style={styles.cartItem}>
        <CartItem />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  cartItem : {
    position: 'absolute',
    bottom: 0,
    right: 0,

  },

});

export default DrawerOrderNavigation;
