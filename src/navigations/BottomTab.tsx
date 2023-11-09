import React, {useCallback, useMemo, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types';
import {BOTTOM_BAR_HEIGHT, defaultColors} from '@configs';
import {Pressable, View, StyleSheet} from 'react-native';
import {DIMENSION, hasBottomNav, isAndroid, isIOS} from '@constants';
import {routers} from 'src/constants/routers';
import {IUserInfo} from 'src/redux/reducers/AuthSlice';
import TextTranslate from 'src/components/TextTranslate';

const BottomTabNavigator = createBottomTabNavigator();

const BottomTab = () => {
  const renderTabbar = useCallback((props: BottomTabBarProps) => {
    return (
      <TabBar
        state={props.state}
        descriptors={props.descriptors}
        navigation={props.navigation}
        userInfo={undefined} //   clickShort={clickShort}
        insets={{bottom: 0, right: 0, left: 0, top: 0}} // insets={undefined}
      />
    );
  }, []);

  return (
    <BottomTabNavigator.Navigator
      tabBar={renderTabbar}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: defaultColors.primary,
        tabBarInactiveTintColor: defaultColors.bg_939393,
        tabBarLabelStyle: {
          color: defaultColors.text_111213,
        },
      }}>
      {routers.map((item, index) => {
        return (
          <BottomTabNavigator.Screen
            key={item.name}
            options={{
              title: item.title,
              tabBarLabel: item.tabBarLabel,
              tabBarIcon: item.tabBarIcon,
            }}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTab;

type PropsTabBar = {
  userInfo?: IUserInfo;
} & BottomTabBarProps;

const TabBar = React.memo(
  ({state, descriptors, navigation, userInfo}: PropsTabBar) => {
    //   useLogRendering('TabBar')
    const nodeRef = useRef<View | null>(null);

    const onPress = useCallback(
      (isFocused: boolean, route: {name: string; key: any}, options: any) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        //   if (isFocused) handleScroll()
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
        //   setOpen404Page(false)
      },
      [userInfo, navigation],
    );

    const onLayout = useCallback(() => {
      requestAnimationFrame(() => {
        nodeRef.current?.measure((_x, _y, _width, height, _pageX, _pageY) => {
          // changeBottomTabHeight(height)
        });
      });
    }, []);

    const renderItem = useCallback(
      (route: any, index: number) => {
        const {options} = descriptors[route.key];
        const {tabBarIcon} = options;
        const isFocused = state.index === index;
        return (
          <BottomTabItemView
            key={index}
            index={index}
            route={route}
            options={options}
            renderTabBarIcon={tabBarIcon}
            isFocused={isFocused}
            onPress={onPress}
          />
        );
      },
      [descriptors, onPress],
    );

    return (
      <View ref={nodeRef} style={styles.container} onLayout={onLayout}>
        {/* <HomeBlurView /> */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginBottom: -5,
          }}>
          {state.routes.map(renderItem)}
        </View>
      </View>
    );
  },
);

interface BottomTabItemViewProps {
  index: number;
  route: any;
  isFocused: boolean;
  options: any;
  onPress: (isFocused: boolean, route: any, options: any) => void;
  renderTabBarIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
}

const BottomTabItemView = React.memo((props: BottomTabItemViewProps) => {
  const {isFocused, route, options, renderTabBarIcon, index, onPress} = props;
  //   const colors = useAppColors();

  const onPressed = useCallback(() => {
    onPress(isFocused, route, options);
  }, [onPress, isFocused, route, options]);

  const color = useMemo(
    () => (isFocused ? defaultColors.text_111213 : defaultColors.bg_939393),
    [isFocused],
  );
  if (index === 5) {
    return null;
  }
  if (!renderTabBarIcon) {
    return null;
  }
  return (
    <Pressable style={styles.tab} onPress={onPressed}>
      {renderTabBarIcon({
        color: isFocused ? defaultColors.primary : defaultColors.bg_939393,
        focused: isFocused,
        size: 10,
      })}

      <TextTranslate
        color={color}
        // size={fontSize.size10}
        fontSize={12}
        weight="400"
        marginTop={4}
        text={options.title}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: DIMENSION.width,
    paddingTop: 12,
    paddingBottom: isAndroid && !hasBottomNav ? 45 : isIOS ? 19 : 19,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_BAR_HEIGHT,
    overflow: isIOS ? 'visible' : 'hidden',
    backgroundColor: defaultColors.c_fff,
  },
  tab: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
