import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ICategory, getCategories } from 'src/api/hotpot';
import { ICHotPot } from '../assets/icons/ICHotPot';
import { ICSnack } from '../assets/icons/ICSnack';
import CartItem from '../components/CartItem';
import { HotpotOrder } from '../features/hotpot';
import { SnackOrder } from '../features/snack';
import CustomDrawer from './CustomDrawer';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeCartList } from 'src/redux/cartOrder/slice';
export const idHotput = 248;
export type RootStackParamList = {
  [key: string]: {id: number}
};
const Drawer = createDrawerNavigator<RootStackParamList>();
const DrawerOrderNavigation = () => {
  const [categoty, setCategory] = React.useState<ICategory[]>([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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

  const getCategoriesData = async () => {
    const category = await getCategories();
    if (category.success) {
      setCategory(
        category.data.filter(
          (categoryValue: ICategory) => categoryValue.id !== idHotput,
        ),
      );
    }
  };

  React.useEffect(() => {
    getCategoriesData();
  }, []);

  React.useEffect(() => {
    if (!isFocused) {
      dispatch(removeCartList());
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={screenOptions}
        backBehavior="history">
        <Drawer.Screen
          name="hotpot"
          component={HotpotOrder}
          initialParams={{id: idHotput}}
          options={{
            drawerLabel: 'Lẩu',
            drawerIcon: ({color}: {color: string}) => (
              <ICHotPot color={color} />
            ),
          }}
        />
        {categoty.map((data, index) => {
          return (
            <Drawer.Screen
              name={data.id.toString()}
              initialParams={{id: data.id}}
              component={SnackOrder}
              key={index}
              options={{
                drawerLabel: data.name,
                drawerIcon: ({color}: {color: string}) => (
                  <ICSnack color={color} />
                ),
              }}
            />
          );
        })}
        {/* <>
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
        </> */}
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
