import React, {useCallback, useMemo, useState} from 'react';
import {Header} from './components/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {routerKitchens, routerPath} from '../../navigations/DrawerKitchen';
import {categoryKitchenNames} from '@configs';

const KitChenStack = createStackNavigator();

export const Kitchen = () => {
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
    <>
      <Header
        currentCategory={currentCategory}
        onChange={handleChangeCategory}
      />
      <KitChenStack.Navigator screenOptions={screenOptions}>
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
    </>
  );
};
