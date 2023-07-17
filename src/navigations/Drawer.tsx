import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, View, Text} from 'react-native';
import * as React from 'react';
import {useMemo} from 'react';
import {Home} from '../features/home';
import CustomDrawer from './CustomDrawer';
import {ICDrawerAll} from '@icons';
import {defaultColors} from '@configs';

const floor = [1, 2, 3, 4, 5];

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
        drawerContent={props => <CustomDrawer {...props} />}
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
        {floor.map((item, index) => {
          return (
            <Drawer.Screen
              name={'floor' + (index + 1)}
              initialParams={{id: item}}
              component={Home}
              options={{
                drawerLabel : 'Tầng ' + (index + 1) ,
                drawerIcon: ({
                  color,
                  size,
                  focused,
                }: {
                  color: string
                  size: number
                  focused: boolean
                }) => <RenderIconFloor index={index} focused={focused} />,
              }}
              key={index}
            />
          );
        })}
      </Drawer.Navigator>
    </>
  );
};

const RenderIconFloor = ({
  index,
  focused,
}: {
  index: number
  focused: boolean
}) => {
  const colorStyle = useMemo(() => {
    return {
      backgroundColor: focused ? defaultColors.c_0000 : defaultColors.c_fff,
    };
  }, [focused]);

  const colorTextStyle = useMemo(() => {
    return {
      color: !focused ? defaultColors.c_0000 : defaultColors.c_fff,
    };
  }, [focused]);

  return (
    <View style={[styles.iconFloor, colorStyle]}>
      <Text style={[styles.textNumber, colorTextStyle]}> {index + 1} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconFloor: {
    height: 20,
    width: 20,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumber: {
    color: defaultColors.c_0000,
    fontWeight: 'bold',
  },
});

export default DrawerNavigation;
