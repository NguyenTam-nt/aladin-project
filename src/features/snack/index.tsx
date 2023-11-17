import { Header } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SnackScreen from './SnackScreen';
import { RootStackParamList } from 'src/navigations/DrawerOrder';
import { isTabletDevice } from '@configs';

const SnackStack = createStackNavigator();

export const SnackOrder = () => {
  const route = useRoute<RouteProp<RootStackParamList>>();
  return (
    <>
      <Header goBack  isOrder={isTabletDevice}   table={route.params.item} tableId={route.params.tableId}/>
      <SnackStack.Navigator
        initialRouteName="snackSreen"
        screenOptions={{headerShown: false}}>
        <SnackStack.Screen
          name="snackSreen"
          component={SnackScreen}
          initialParams={{id: route.params.id}}
        />
      </SnackStack.Navigator>
    </>
  );
};