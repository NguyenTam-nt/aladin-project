import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';
import {IBanner, getBannerByNameApi} from 'src/api/banner';
import {Swiper} from 'src/components/rn-swiper/Swiper';

const Banner = (props: {bannerType: string}) => {
  const [banners, setBanners] = useState<IBanner>();
  const getBannerByName = async () => {
    try {
      const res = await getBannerByNameApi(props.bannerType);
      if (res) {
        setBanners(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getBannerByName();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        autoplayLoopKeepAnimation
        // autoplayInvertDirection
        data={banners?.images}
        renderItem={item => {
          return (
            <Thumb
              style={styles.imageBanner}
              source={{uri: item?.item.url}}
              resizeMode="cover"
            />
          );
        }}
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
