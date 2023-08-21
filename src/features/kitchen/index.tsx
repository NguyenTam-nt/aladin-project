import React, {createContext, useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import { HeaderTab} from './components/Header';
import {createStackNavigator} from '@react-navigation/stack';
import {routerKitchens, routerPath} from '../../navigations/DrawerKitchen';
import {categoryKitchenNames, isTabletDevice} from '@configs';
import {HandleTabKitchen} from './components/HandleTabKitchen';
import { Header } from '@components';
import { CategoryMenuType } from 'src/typeRules/category'

type KitchenType = {
  currentType: categoryKitchenNames
}

export const KitchenContext = createContext<KitchenType>({
  currentType: categoryKitchenNames.kitchen
})

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
  const [currentCategory, setCurrentCategory] = useState<categoryKitchenNames>(
    categoryKitchenNames.kitchen,
  );
  const handleChangeCategory = useCallback((category: categoryKitchenNames) => {
    setCurrentCategory(category);
  }, []);

  const valueContext = useMemo(() => {
    return {
      currentType: currentCategory
    }
  }, [currentCategory])

  return (
    <KitchenContext.Provider value={valueContext} >
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
        initialRouteName={"wait-progressing"}>
        {routerKitchens
          .find(item => item.name === routerPath.kitchen)
          ?.childs.map(item => {
            return (
              <KitChenStack.Screen
                key={item.slug}
                name={item.slug}
                component={item.element}
              />
            );
          })}
      </KitChenStack.Navigator>
    </View>

    </KitchenContext.Provider>
  );
});
