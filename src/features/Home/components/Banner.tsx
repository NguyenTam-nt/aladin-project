import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Thumb } from '@components';
import { DIMENSION } from '@constants';
import { BannerType } from 'src/typeRules/banner';
import { IBanner, getBannerByNameApi } from 'src/api/banner';

const Banner = () => {

  const [banners, setBanners] = useState<IBanner>();
  const getBannerByName = async () => {
    try {
      const res = await getBannerByNameApi(BannerType.homePage);
      if (res) {
        setBanners(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    getBannerByName();
  }, [])
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
