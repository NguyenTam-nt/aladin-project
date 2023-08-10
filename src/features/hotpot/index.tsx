import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Header} from '@components';
import HotPotScreen from './HotPotScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/navigations/DrawerOrder';
import { isTabletDevice } from '@configs';

const FloorStack = createStackNavigator();
export const HotpotOrder = () => {
  const route = useRoute<RouteProp<RootStackParamList>>();

  return (
    <>
      <Header  goBack isOrder={isTabletDevice} table={route.params.item}/>
      <FloorStack.Navigator
        initialRouteName="hotpotScreen"
        screenOptions={{headerShown: false}}>
        <FloorStack.Screen name="hotpotScreen" component={HotPotScreen} />
      </FloorStack.Navigator>
    </>
  );
};

