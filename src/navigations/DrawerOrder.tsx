import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View ,Text} from 'react-native';
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
import { useAreaId } from 'src/redux/infoDrawer/hooks';
import { useIdBill } from 'src/redux/cartOrder/hooks';
import SockJS from 'sockjs-client';
import { SOCK_CLIENNT_URL } from 'src/api/config';
import { NoticeCancelItem } from './notiCancelOrder/Notice';
var Stomp = require('stompjs/lib/stomp.js').Stomp;
export const idHotput = 248;
export type RootStackParamList = {
  [key: string]: {id: number}
};
const Drawer = createDrawerNavigator<RootStackParamList>();
const DrawerOrderNavigation = () => {
  const [categoty, setCategory] = React.useState<ICategory[]>([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const IdArea = useAreaId();
  const billId = useIdBill();
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
    if (IdArea && billId) {
      const sockClient = new SockJS(SOCK_CLIENNT_URL);
      let stompClient = Stomp.over(sockClient);

      if (!stompClient.connected) {
        stompClient.connect(
          {},
          function (frame: any) {
            setTimeout(() => {
              stompClient.subscribe(
                `/topic/order/noti/${IdArea}/${billId}`,
                function (messageOutput: any) {
                  const data = JSON.parse(messageOutput.body);
                  console.log('data noti', data);
                },
              );
            });
          },
          500,
        );
      }
    }
  }, [IdArea, billId]);

  React.useEffect(() => {
    if (!isFocused) {
      dispatch(removeCartList());
    }
  }, [isFocused]);

  const [test ,setTest] = React.useState<number[]>([]);

  const PushItem = () => {
    const newTest = [...test];
    newTest.push(1);
    setTest(newTest);
  };


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
      <NoticeCancelItem test={test}  />
      <View style={styles.cartItem}>
        <TouchableOpacity onPress={PushItem}>
          <Text style={{height: 30, width: 30, backgroundColor: 'red'}}>
            pussh
          </Text>
        </TouchableOpacity>
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
