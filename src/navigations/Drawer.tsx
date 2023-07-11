import React, { useMemo } from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../features/home';
import { Header } from '@components';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
    }),
    [],
  );
  return (
    <>
    <Header />
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="setting" component={Home} />
    </Drawer.Navigator>
    </>
  );
};
