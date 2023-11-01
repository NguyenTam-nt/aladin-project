import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { defaultColors } from '@configs';
import RadialGradient from 'react-native-radial-gradient';
import CartButton from 'src/components/CartButton';
import CityFilter from 'src/components/CityFilter';
import InputSearch from 'src/components/InputSearch';
import { globalStyles } from 'src/commons/globalStyles';
import { Header } from 'src/components/Header';

interface HeaderProps {
  headerBase?: boolean;
}
const HeaderHome = (props: PropsWithChildren<HeaderProps>) => {
  const { headerBase = true, children } = props;
  return (
    <Header>
      <RadialGradient
        style={styles.gradientButton}
        colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
        stops={[0.0, 0.9]}
        center={[100, 100]}
        radius={250}
      />
      <View style={styles.groupButton}>
        {headerBase && (
          <>
            <InputSearch containerStyle={styles.styleInput} />
            <CityFilter />
            <CartButton />
          </>
        )}

        {children && children}
      </View>
    </Header>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.bg_EFEFEF,
    position: 'relative',
  },
  gradientButton: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  groupButton: {
    ...globalStyles.row,
    columnGap: 8,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  styleInput: {
    flex: 1,
    // height: '100%',
  },
  showProvice: {
    // position: 'absolute',
    // flex: 1,
    // top: 10,
    // // left: 0,
    // right: -10,
    width: '100%',
    backgroundColor: defaultColors._FFDB9E,
    zIndex: 3,
    elevation: 3,
  },
  styleBackgroudOpacity: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 100,
    left: 0,
    // opacity: 0.99,
    // zIndex: 100,
    // justifyContent: getValueForDevice('center','flex-end') ,
    alignItems: 'center',
    margin: 0,
    zIndex: 1,
  },
});
