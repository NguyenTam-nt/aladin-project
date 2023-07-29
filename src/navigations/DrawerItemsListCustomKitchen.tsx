import {
  CommonActions,
  DrawerNavigationState,
  ParamListBase,
  Route,
  useLinkBuilder,
} from '@react-navigation/native';
import * as React from 'react';

import { TextCustom } from '@components';
import { defaultColors } from '@configs';
import { ICDrawerAll } from '@icons';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import { PlatformPressable } from '@react-navigation/elements';
import { LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View } from 'react-native';
import { ICDown } from '../assets/icons/ICDown';
import { DrawerItemCustomKitchen } from './DrawerItemCustomKitchen';
import { routerKitchens } from './DrawerKitchen';

type Props = {
  state: DrawerNavigationState<ParamListBase>
  navigation: DrawerNavigationHelpers
  descriptors: DrawerDescriptorMap
};

/**
 * Component that renders the navigation list in the drawer.
 */
export function DrawerItemListCustomKitchen({
  state,
  navigation,
  descriptors,
}: Props) {
  return state.routes.map((route, i) => {
    const {drawerLabel} = descriptors[route.key].options;

    const focused = i === state.index;

    const color = focused ? defaultColors.c_0000 : defaultColors.c_fff;

    return (
      <DrawerItemWithICArrowDown
        focused={focused}
        state={state}
        navigation={navigation}
        color={color}
        drawerLabel={drawerLabel}
        i={i}
        route={route}
        children={null}
        key={i}

      />
    );
  }) as React.ReactNode as React.ReactElement;
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    justifyContent: 'space-between',
    },
  group_text: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  ml_20: {
    marginLeft: 20,
  },
});

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }


export const DrawerItemWithICArrowDown = React.memo(
  ({
    route,
    href,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    accessibilityRole,
    focused,
    color,
    drawerLabel,
    i,
    navigation,
    state,
    ...rest
  }: Omit<React.ComponentProps<typeof PlatformPressable>, 'style'> & {
    route: Route<string>
    href?: string
    focused?: boolean
    color?: string
    drawerLabel?: any
    i: number
    navigation: any
    state: any
    focusChild?: string
  }) => {
    const buildLink = useLinkBuilder();
    const [isOpen, setIsOpen] = React.useState(true);
    const toggleOpen = () => {
      // onPress?.()
      setIsOpen(value => !value);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    const [initIndexChild, setInitIndexChild] = React.useState<number>(null);
    const [newArrayChild, setNewArrayChild] = React.useState(
      routerKitchens[i].childs.map(child => child.slug),
    );

    const arr = routerKitchens[i].childs.map(child => child.slug);

    if (initIndexChild) {
      for (let i = 0; i < initIndexChild; i++) {
        const element = arr.shift();
        if (element !== undefined) {
          arr.push(element);
        }
      }
    }

    const focusChild = arr[state.routes[i]?.state?.index];

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleOpen}
          style={[
            styles.container,
            {
              backgroundColor: focused ? defaultColors._F1BA42 : 'transparent',
            },
          ]}>
          <View style={styles.group_text}>
            <ICDrawerAll color={color} />
            <TextCustom color={color} fontSize={14} weight="600">
              {drawerLabel}
            </TextCustom>
          </View>
          <View>
            <ICDown color={color} />
          </View>
        </TouchableOpacity>
        <View style={[styles.ml_20, !isOpen ? {height: 0} : undefined]}>
          {routerKitchens[i].childs.map((item, index) => {
            const onPressItem = () => {
              const event = navigation.emit({
                type: 'drawerItemPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                if (!initIndexChild) {
                  console.log('index', index);

                  setInitIndexChild(index);
                }
                if (focused) {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, {
                      screen: item.slug,
                    }),
                    target: state.key,
                  });
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, {
                      screen: item.slug,
                    }),
                    target: state.key,
                  });
                }
              }
            };
            return (
              <DrawerItemCustomKitchen
                key={index}
                route={route}
                href={buildLink(route.name, route.params)}
                label={item.name}
                focused={focused && item.slug === focusChild}
                onPress={onPressItem}
              />
            );
          })}
        </View>
      </View>
    );
  },
);
