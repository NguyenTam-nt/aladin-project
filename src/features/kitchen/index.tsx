import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import { HeaderTab} from './components/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {routerKitchens, routerPath} from '../../navigations/DrawerKitchen';
import {categoryKitchenNames, isTabletDevice} from '@configs';
import {HandleTabKitchen} from './components/HandleTabKitchen';
import { globalStyles } from 'src/commons/globalStyles';
import { Header } from '@components';

const KitChenStack = createStackNavigator();

export const Kitchen = React.memo(() => {
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      animationEnabled: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
    }),
    [],
  );
  const [currentCategory, setCurrentCategory] = useState<string>(
    categoryKitchenNames.kitchen,
  );
  const handleChangeCategory = useCallback((category: string) => {
    setCurrentCategory(category);
  }, []);

  const params = useMemo(() => {
    return {
      currentCategory,
    };
  }, [currentCategory]);

  return (
    <View style={{ flex : 1}}>
      {!isTabletDevice && <Header />}
      <HeaderTab
        renderLeft={
          <HandleTabKitchen
            currentCategory={currentCategory}
            onChange={handleChangeCategory}
          />
        }
        showLocattion={isTabletDevice}
      />
      <KitChenStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={routerKitchens[1].childs[0].slug}>
        {routerKitchens
          .find(item => item.name === routerPath.kitchen)
          ?.childs.map(item => {
            return (
              <KitChenStack.Screen
                key={item.slug}
                name={item.slug}
                component={item.element}
                initialParams={params}
              />
            );
          })}
      </KitChenStack.Navigator>
    </View>
  );
});
