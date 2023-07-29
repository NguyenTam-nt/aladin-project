import { defaultColors } from '@configs';
import { ICDrawerAll } from '@icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from '../features/home';
import CustomDrawerFloor from './CustomDrawerFloor';
import { useToken } from 'src/redux/reducers/hook';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
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
