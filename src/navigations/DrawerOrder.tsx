import { idHotpot, isTabletDevice } from '@configs';
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ICategory, getCategories } from 'src/api/hotpot';
import { removeCartList } from 'src/redux/cartOrder/slice';
import { ICHotPot } from '../assets/icons/ICHotPot';
import { ICSnack } from '../assets/icons/ICSnack';
import CartItem from '../components/CartItem';
import { HotpotOrder } from '../features/hotpot';
import { SnackOrder } from '../features/snack';
import CustomDrawer from './CustomDrawer';
import { NoticeCancelItem } from './notiCancelOrder/Notice';


export type RootStackParamList = {
  [key: string]: {id: number ; item :string  ; tableId : number }
};

export type RootStackramDrawe = {
  [key: string]: {item: string ;tableId : number }
};
const Drawer = createDrawerNavigator<RootStackParamList>();
const DrawerOrderNavigation = () => {
  const route = useRoute<RouteProp<RootStackramDrawe>>();


  const [categoty, setCategory] = React.useState<ICategory[]>([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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
      unmountOnBlur : true,
    }),
    [isTabletDevice],
  );

  const getCategoriesData = async () => {
    const category = await getCategories();
    if (category.success) {
      setCategory(
        category.data.filter(
          (categoryValue: ICategory) => categoryValue.id !== idHotpot,
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
          initialParams={{id: idHotpot ,item : route.params.item , tableId : route.params.tableId}}
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
              initialParams={{id: data.id ,item : route.params.item , tableId : route.params.tableId}}
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
      </Drawer.Navigator>
      <View style={styles.cartItem}>
        <CartItem />
      </View>
      <NoticeCancelItem />
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
