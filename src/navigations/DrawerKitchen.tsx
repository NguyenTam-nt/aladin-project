import {View} from 'react-native';
import React, {useMemo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerKitchen from './CustomDrawerKitchen';
import {WaitProcees} from '../features/kitchen/WaitProcess.tsx';
import {Kitchen} from '../features/kitchen';
import {History} from '../features/kitchen/History';
import OrderTabView from '../features/orderTab/index';

export const routerPath = {
  order : 'Phần mềm order',
  kitchen: 'Bếp/Bar',
  report: 'Báo cáo',

};

export const routerKitchens = [
  {
    name: routerPath.order,
    element: OrderTabView,
    slug: 'order-app',
    childs: [
      {
        name: 'Quản lý hàng hoá',
        slug: 'commodity-management',
        element: WaitProcees,
      },
    ],
  },
  {
    name: routerPath.kitchen,
    element: Kitchen,
    slug: 'bar-kitchen',
    childs: [
      {
        name: 'Chờ chế biến',
        slug: 'wait-progressing',
        element: WaitProcees,
      },
      {
        name: 'Lịch sử',
        slug: 'history',
        element: History,
      },
      {
        name: 'Tách/Ghép bàn',
        slug: 'split-table',
        element: WaitProcees,
      },
    ],
  },
  {
    name: routerPath.report,
    element: Kitchen,
    slug: 'report',
    childs: [
      {
        name: 'Báo cáo món ăn',
        slug: 'report-product',
        element: WaitProcees,
      },
    ],
  },
];

const Drawer = createDrawerNavigator();

const DrawerKitchen = () => {
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
        drawerContent={props => <CustomDrawerKitchen {...props} />}
        screenOptions={screenOptions}>
        {routerKitchens.map(item => {
          return (
            <Drawer.Screen
              key={item.slug}
              name={item.slug}
              component={item.element}
              options={{
                drawerLabel: item.name,
              }}
            />
          );
        })}
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerKitchen;
