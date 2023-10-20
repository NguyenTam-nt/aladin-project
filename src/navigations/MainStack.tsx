import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BottomTab';
import {createStackNavigator} from '@react-navigation/stack';
import PopupScreen from 'src/features/PopupScreen';
import {productRoute} from 'src/constants/routers';
import ProductDetail from 'src/features/Products/ProductDetail';
const RootStack = createStackNavigator();
const transparentScreen = {
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}} mode="modal">
        <RootStack.Screen name="mains" component={BottomTab} />
        <RootStack.Screen
          name="popup"
          component={PopupScreen}
          options={transparentScreen}
        />
        {/* <RootStack.Screen
          name={productRoute.detail}
          component={ProductDetail}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
