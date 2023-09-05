import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';

const Banner = () => {
  return (
    <View style={styles.container}>
      <Thumb
        style={styles.imageBanner}
        source={require('../../../assets/image/home/banner_home.png')}
        resizeMode="cover"
      />
    </View>
  );
};

export default Banner;
const styles = StyleSheet.create({
  container: {
    width: DIMENSION.width,
  },
  imageBanner: {
    width: DIMENSION.width,
    height: 230,
  },
});
