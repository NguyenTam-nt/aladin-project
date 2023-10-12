import {createStackNavigator} from '@react-navigation/stack';
import Products from 'src/features/Products';
import React from 'react';
import {productRoute} from 'src/constants/routers';
import CategoriesScreen from 'src/features/Categories';
import ProductDetail from 'src/features/Products/ProductDetail';

const ProductStack = createStackNavigator();

export const ProductStackScreen = () => (
  <ProductStack.Navigator screenOptions={{headerShown: false}}>
    <ProductStack.Screen name={productRoute.prifex} component={Products} />
    <ProductStack.Screen
      name={productRoute.categories.detail}
      component={CategoriesScreen}
    />
    <ProductStack.Screen name={productRoute.detail} component={ProductDetail} />
    {/* <FeatureStack.Screen name="/noi-bat" component={FeaturedScreen} />
    <FeatureStack.Screen name="/noi-bat/[slug]" component={ArticleScreen} />
    <FeatureStack.Screen name="/nha-cung-cap/[group]" component={ContentProviderScreen} />
    <FeatureStack.Screen name="/bai-hat/[slug]" component={SongScreen} /> */}
  </ProductStack.Navigator>
);
