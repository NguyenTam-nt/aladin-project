import {StyleSheet, View} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import RadialGradient from 'react-native-radial-gradient';
import CartButton from 'src/components/CartButton';
import CityFilter from 'src/components/CityFilter';
import InputSearch from 'src/components/InputSearch';
import {globalStyles} from 'src/commons/globalStyles';
import {Header} from 'src/components/Header';

const HeaderHome = () => {
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
        <InputSearch containerStyle={styles.styleInput} />
        <CityFilter />
        <CartButton />
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
    columnGap: 12,
  },
  styleInput: {
    flex: 1,
    height: '100%',
  },
});
