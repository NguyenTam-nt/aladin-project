import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Header} from './components/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {routerKitchens, routerPath} from '../../navigations/DrawerKitchen';
import {categoryKitchenNames} from '@configs';
import {HandleTabKitchen} from './components/HandleTabKitchen';
import { globalStyles } from 'src/commons/globalStyles';

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
    <SafeAreaView style={globalStyles.fullFill}>
      <StatusBar hidden />
      <Header
        renderLeft={
          <HandleTabKitchen
            currentCategory={currentCategory}
            onChange={handleChangeCategory}
          />
        }
      />
      <KitChenStack.Navigator screenOptions={screenOptions}
      initialRouteName={routerKitchens[1].childs[0].slug}
      >
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
    </SafeAreaView>
  );
});
