import {  isTabletDevice } from '@configs';
import { ICDrawerAll } from '@icons';
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useMemo } from 'react';
import { Home } from '../features/home';
import CustomDrawerFloor from './CustomDrawerFloor';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  const screenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      drawerType: isTabletDevice ? 'permanent' : 'slide',
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
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerFloor navigation={props.navigation}  />}
        screenOptions={screenOptions}
        backBehavior="history">
        <Drawer.Screen
          name="all"
          component={Home}
          options={{
            drawerLabel: 'Tất cả',
            drawerIcon: ({color}: {color: string}) => (
              <ICDrawerAll color={color} />
            ),
          }}
        />

      </Drawer.Navigator>
    </>
  );
};




export default DrawerNavigation;
