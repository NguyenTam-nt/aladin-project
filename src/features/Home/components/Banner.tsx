import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Thumb} from '@components';
import {DIMENSION} from '@constants';
import {BannerType} from 'src/typeRules/banner';
import {IBanner, getBannerByNameApi} from 'src/api/banner';
import {Swiper} from 'src/components/rn-swiper/Swiper';

const Banner = () => {
  const [banners, setBanners] = useState<IBanner>();
  const getBannerByName = async () => {
    try {
      const res = await getBannerByNameApi(BannerType.homePage);
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

  // const data = [
  //   {
  //     url: 'https://cdn.pixabay.com/photo/2023/10/20/20/53/pears-8330221_640.jpg',
  //   },
  //   {
  //     url: 'https://cdn.pixabay.com/photo/2023/10/15/13/59/walnuts-8316999_1280.jpg',
  //   },
  //   {
  //     url: 'https://cdn.pixabay.com/photo/2023/10/18/19/30/pastries-8324971_640.jpg',
  //   },
  // ];
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
