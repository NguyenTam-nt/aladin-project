import {StyleSheet, View} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import RadialGradient from 'react-native-radial-gradient';
import {Thumb} from '../Thumb/Thumb';
import TextTranslate from '../TextTranslate';

type Props = {
  text: string;
};

const TextTilte = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.gradientButton}>
        <RadialGradient
          style={StyleSheet.absoluteFillObject}
          colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
          stops={[0.0, 0.9]}
          center={[100, 100]}
          radius={250}
        />
      </View>
      <View style={styles.groupText}>
        <RadialGradient
          style={StyleSheet.absoluteFillObject}
          colors={[defaultColors.bg_F9849E, defaultColors.bg_FE7D29]}
          stops={[0.0, 0.9]}
          center={[100, 100]}
          radius={250}
        />
        <TextTranslate
          fontSize={18}
          numberOfLines={2}
          textTransform="uppercase"
          weight="bold"
          color={defaultColors.c_fff}
          text={text}
        />
      </View>
      <View style={styles.icon}>
        <Thumb
          style={styles.style_icon}
          resizeMode="cover"
          source={require('../../assets/image/title_icon.png')}
        />
      </View>
    </View>
  );
};

export default TextTilte;

const styles = StyleSheet.create({
  container: {height: 50, position: 'relative'},
  imageBanner: {
    width: DIMENSION.width,
    height: 230,
  },
  gradientButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -5,
    zIndex: -1,
    borderRadius: 50,
    height: 50,
    overflow: 'hidden',
  },
  groupText: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: defaultColors.c_fff,
  },
  icon: {
    position: 'absolute',
    left: 30,
    top: 25,
    transform: [
      {
        translateY: -34,
      },
    ],
  },
  style_icon: {width: 68, height: 68},
});
