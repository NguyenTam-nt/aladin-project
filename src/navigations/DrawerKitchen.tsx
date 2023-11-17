import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import {Report} from 'src/features/Report';
import CompoundTabKitChen from 'src/features/kitchen/Compound/CompoundTabKitChen';
import {Kitchen} from '../features/kitchen';
import {History} from '../features/kitchen/History';
import {WaitProcees} from '../features/kitchen/WaitProcess';
import OrderTabView from '../features/orderTab/index';
import CustomDrawerKitchen from './CustomDrawerKitchen';
import {useDispatch} from 'react-redux';
import {getFloor} from 'src/api/table';
import {setAreaId} from 'src/redux/infoDrawer/slice';
import {isTabletDevice} from '@configs';

export const routerPath = {
  order: 'Phần mềm order',
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
        element: CompoundTabKitChen,
      },
    ],
  },
  {
    name: routerPath.report,
    element: Report,
    slug: 'report',
    childs: [
      {
        name: 'Báo cáo món ăn',
        slug: 'general',
        element: Report,
      },
    ],
  },
];

const Drawer = createDrawerNavigator();

const DrawerKitchen = () => {
  const screenOptions = useMemo<DrawerNavigationOptions>(
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

  const dispatch = useDispatch();
  const getDataFloor = async () => {
    const floor = await getFloor();
    if (floor.success) {
      dispatch(setAreaId({id: floor.data[0].infrastructure.id, name: floor.data[0].infrastructure.name}));
    }
  };
  React.useLayoutEffect(() => {
    getDataFloor();
  }, []);

  return (
    <View style={globalStyles.fullFill}>
      <Drawer.Navigator
        initialRouteName="bar-kitchen"
        drawerContent={props => <CustomDrawerKitchen {...props} />}
        screenOptions={screenOptions}>
        {routerKitchens.map((item, index) => {
          return (
            <Drawer.Screen
              key={index}
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