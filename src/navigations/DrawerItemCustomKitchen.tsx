import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {PlatformPressable} from '@react-navigation/elements';
import {Route} from '@react-navigation/native';
import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  /**
   * The route object which should be specified by the drawer item.
   */
  route: Route<string>
  /**
   * The `href` to use for the anchor tag on web
   */
  href?: string
  /**
   * The label text of the item.
   */
  label:
    | string
    | ((props: {focused: boolean; color: string}) => React.ReactNode)
  /**
   * Icon to display for the `DrawerItem`.
   */
  icon?: (props: {
    focused: boolean
    size: number
    color: string
  }) => React.ReactNode
  /**
   * Whether to highlight the drawer item as active.
   */
  focused?: boolean
  /**
   * Function to execute on press.
   */
  onPress: () => void
  /**
   * Color for the icon and label when the item is active.
   */
  activeTintColor?: string
  /**
   * Color for the icon and label when the item is inactive.
   */
  inactiveTintColor?: string
  /**
   * Background color for item when its active.
   */
  activeBackgroundColor?: string
  /**
   * Background color for item when its inactive.
   */
  inactiveBackgroundColor?: string
  /**
   * Color of the touchable effect on press.
   * Only supported on Android.
   *
   * @platform android
   */
  pressColor?: string
  /**
   * Opacity of the touchable effect on press.
   * Only supported on iOS.
   *
   * @platform ios
   */
  pressOpacity?: number
  /**
   * Style object for the label element.
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Style object for the wrapper element.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Whether label font should scale to respect Text Size accessibility settings.
   */
  allowFontScaling?: boolean

  /**
   * Accessibility label for drawer item.
   */
  accessibilityLabel?: string
  /**
   * ID to locate this drawer item in tests.
   */
  testID?: string
};

const LinkPressable = ({
  route,
  href,
  children,
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  accessibilityRole,
  ...rest
}: Omit<React.ComponentProps<typeof PlatformPressable>, 'style'> & {
  style: StyleProp<ViewStyle>
} & {
  route: Route<string>
  href?: string
  children: React.ReactNode
  onPress?: () => void
}) => {
  return (
    <PlatformPressable
      {...rest}
      accessibilityRole={accessibilityRole}
      onPress={onPress}>
      <View style={style}>{children}</View>
    </PlatformPressable>
  );
};

/**
 * A component used to show an action item with an icon and a label in a navigation drawer.
 */
export function DrawerItemCustomKitchen(props: Props) {
  const {
    route,
    href,
    icon,
    label,
    labelStyle,
    focused = false,
    allowFontScaling,
    activeTintColor = defaultColors.c_fff,
    inactiveTintColor = defaultColors.c_fff,
    activeBackgroundColor = defaultColors._F1BA42,
    inactiveBackgroundColor = 'transparent',
    style,
    onPress,
    pressColor,
    pressOpacity,
    testID,
    accessibilityLabel,
    ...rest
  } = props;

  const color = focused ? activeTintColor : inactiveTintColor;
  const iconNode = icon ? icon({size: 24, focused, color}) : null;

  return (
    <View collapsable={false} {...rest} style={[styles.container, style]}>
      <LinkPressable
        testID={testID}
        onPress={onPress}
        style={styles.wrapper}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{selected: focused}}
        pressColor={pressColor}
        pressOpacity={pressOpacity}
        route={route}
        href={href}>
        <React.Fragment>
          <View style={styles.icon}>{iconNode}</View>
          <View style={[styles.label, {marginLeft: 8, marginVertical: 5}]}>
            {typeof label === 'string' ? (
              <TextCustom
                numberOfLines={1}
                // allowFontScaling={allowFontScaling}
                weight="600"
                color={defaultColors.c_fff}>
                {label}
              </TextCustom>
            ) : (
              label({color, focused})
            )}
          </View>
        </React.Fragment>
      </LinkPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    overflow: 'hidden',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 8,
    height: 56,
  },
  label: {
    marginRight: 32,
    flex: 1,
  },
  button: {
    display: 'flex',
  },
  icon: {
    marginLeft: 24,
  },
});
