import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {contactBanner, introductionImage} from 'src/assets/image';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';

import TextTranslate from 'src/components/TextTranslate';
import useI18n from 'src/hooks/useI18n';
import ProductOutStanding from './ProductOutStanding';
import CategoryOutStandingList from 'src/features/Home/components/CategoryOutStandingList';
import { IAbout, getAboutApi } from 'src/api/about';

const Introdcution = () => {
  const [abouts, setAbouts] = useState<IAbout[]>([]);
  const {isVn} = useI18n();
  const getAbouts = async () => {
    const res = await getAboutApi();
    if (res.success) {
      setAbouts(res.data);
    }
  };

  useEffect(() => {
    getAbouts();
  }, []);

  return (
    <View>
      <View
        style={{
          position: 'relative',
          ...globalStyles.center,
          width: '100%',
          height: 410,
        }}>
        <Thumb
          source={introductionImage}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={{
            width: '80%',
            height: '80%',
            position: 'relative',
            borderRadius: 10,
            ...globalStyles.center,
          }}>
          <View style={StyleSheet.absoluteFillObject}>
            <Thumb
              source={contactBanner}
              resizeMode="cover"
              style={{width: '100%', height: '100%', borderRadius: 10}}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <TextTranslate
          color={defaultColors.primary}
          fontSize={18}
          textTransform="uppercase"
          weight="700"
          text="about.title"
        />
        <View>
          <Text style={styles.title}>
            {abouts.length > 0 &&
              (isVn ? abouts[0].titleVn : abouts[0].titleKr)}
          </Text>
          <Text>
            {abouts.length > 0 &&
              (isVn ? abouts[0].content1Vn : abouts[0].content1Kr)}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 36, ...styles.content}}>
        <TextTilte text="home.product_outstanding" />
        <View style={{}}>
          <ProductOutStanding />
          <CategoryOutStandingList />
        </View>
      </View>
    </View>
  );
};

export default Introdcution;
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
