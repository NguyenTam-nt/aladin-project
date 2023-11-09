import {createStackNavigator} from '@react-navigation/stack';
import Products from 'src/features/Products';
import React from 'react';
import {productRoute} from 'src/constants/routers';
import CategoriesScreen from 'src/features/Categories';
import ProductDetail from 'src/features/Products/ProductDetail';

const ProductStack = createStackNavigator();

export const ProductStackScreen = () => (
  <ProductStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={productRoute.prifex}>
    <ProductStack.Screen name={productRoute.prifex} component={Products} />
    <ProductStack.Screen
      name={productRoute.categories.detail}
      component={CategoriesScreen}
    />
    <ProductStack.Screen name={productRoute.detail} component={ProductDetail} />
  </ProductStack.Navigator>
);
