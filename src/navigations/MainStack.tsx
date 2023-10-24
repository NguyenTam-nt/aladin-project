import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BottomTab';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import PopupScreen from 'src/features/PopupScreen';
import {accountRoute, productRoute} from 'src/constants/routers';
import ProductDetail from 'src/features/Products/ProductDetail';
import CartsScreen from 'src/features/Carts';
import {Animated} from 'react-native';
import PaymentScreen from 'src/features/Carts/Payment';
import LoginScreen from 'src/features/Account/Login';
const RootStack = createStackNavigator();
const transparentScreen = {
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MainStack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="mains">
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name="mains" component={BottomTab} />
        </RootStack.Group>
        {/* <RootStack.Group screenOptions={{presentation: 'transparentModal'}}> */}
        <RootStack.Group
          screenOptions={{
            // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerShown: false,
          }}>
          <RootStack.Screen
            name="popup"
            component={PopupScreen}
            options={transparentScreen}
          />
          {/* <RootStack.Screen
          name={productRoute.detail}
          component={ProductDetail}
        /> */}
          <RootStack.Screen
            name={productRoute.cart}
            component={CartsScreen}
            options={{cardStyleInterpolator: forFade}}
            // options={transparentScreen}
          />
          <RootStack.Screen
            name={productRoute.payment}
            component={PaymentScreen}
            options={{cardStyleInterpolator: forFade}}
            // options={transparentScreen}
          />
          <RootStack.Screen name={accountRoute.login} component={LoginScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
