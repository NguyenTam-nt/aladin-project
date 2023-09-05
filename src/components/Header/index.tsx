import React, {memo, useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {paddingHorizontalScreen} from '@constants';

interface HeaderProps {
  containerStyle?: ViewStyle[] | ViewStyle;
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = memo(props => {
  const {containerStyle, children} = props;

  const {top: statusBarHeight} = useSafeAreaInsets();

  // const topAreaInsets = useMemo(
  //   () => ({ paddingTop: statusBarHeight + heightLize(30) }),
  //   [statusBarHeight],
  // )

  const topAreaInsets = useMemo(
    () => ({
      paddingTop: statusBarHeight + 16,
      paddingBottom: 16,
    }),
    [statusBarHeight],
  );

  return (
    <View
      style={[
        styles.container,
        topAreaInsets,
        StyleSheet.flatten(containerStyle),
      ]}>
      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen
  },
});
