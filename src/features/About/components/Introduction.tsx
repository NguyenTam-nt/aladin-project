import {Thumb} from '@components';
import {defaultColors} from '@configs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {introductionImage, backgroundAbout} from 'src/assets/image';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from 'src/components/TextTitle';

import TextTranslate from 'src/components/TextTranslate';
import useI18n from 'src/hooks/useI18n';
import ProductOutStanding from './ProductOutStanding';
import CategoryOutStandingList from 'src/features/Home/components/CategoryOutStandingList';
import {IAbout, getAboutApi} from 'src/api/about';

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
            {abouts.length > 0 && (
              <Thumb
                source={{
                  uri: abouts?.length > 0 && abouts?.[0].images?.[0].url,
                }}
                resizeMode="cover"
                style={{width: '100%', height: '100%', borderRadius: 10}}
              />
            )}
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
        <View style={{paddingRight: 16}}>
          <Text style={styles.title}>
            {abouts?.length > 0 &&
              (isVn ? abouts?.[0].titleVn : abouts?.[0].titleKr)}
          </Text>
          <Text style={styles.desc}>
            {abouts?.length > 0 &&
              (isVn ? abouts?.[0].content1Vn : abouts?.[0].content1Kr)}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 36}}>
        <View style={{paddingHorizontal: 16}}>
          <TextTilte text="home.product_outstanding" />
        </View>
        <ProductOutStanding />
        <View style={{paddingLeft: 16}}>
          <CategoryOutStandingList />
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <View style={{paddingHorizontal: 16, marginBottom: 15}}>
          <Text style={styles.title}>
            {abouts?.length > 1 &&
              (isVn ? abouts?.[1].titleVn : abouts?.[1].titleKr)}
          </Text>
          <Text style={styles.desc}>
            {abouts?.length > 1 &&
              (isVn ? abouts?.[1].content1Vn : abouts?.[1].content1Kr)}
          </Text>
        </View>
        <View>
          <View
            style={{
              position: 'relative',
              ...globalStyles.center,
              width: '100%',
              height: 350,
              paddingTop: 10,
            }}>
            <Thumb
              source={backgroundAbout}
              resizeMode="stretch"
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
                {abouts.length > 1 && (
                  <Thumb
                    source={{
                      uri: abouts?.length > 1 && abouts?.[1].images?.[0].url,
                    }}
                    resizeMode="cover"
                    style={{width: 300, height: 300, borderRadius: 150}}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingLeft: '25%',
            paddingRight: 16,
            marginBottom: 2,
            marginTop: 15,
          }}>
          <Text style={styles.desc}>
            {abouts.length > 1 &&
              (isVn ? abouts[1].content1Vn : abouts[1].content1Kr)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Introdcution;
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    // width: DIMENSION.width * 0.8,
  },
  title: {
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '700',
    // marginBottom: 20,
  },
  desc: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    marginTop: 20,
  },
});
