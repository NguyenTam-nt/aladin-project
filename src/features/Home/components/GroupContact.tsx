import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import RadialGradient from 'react-native-radial-gradient';
import {ICTalk} from 'src/assets/icons/ICTalk';
import {ICZalo} from 'src/assets/icons/ICZalo';
import {globalStyles} from 'src/commons/globalStyles';
import {paddingHorizontalScreen} from '@constants';

const GroupContact = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.groupProduct}>
        <RadialGradient
          style={StyleSheet.absoluteFillObject}
          colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
          stops={[0.3, 0.6]}
          center={[100, 100]}
          radius={250}
        />
        <View>
          <ICTalk />
        </View>
        <TextCustom fontSize={16} weight="bold" color={defaultColors.c_fff}>
          Kakaotalk
        </TextCustom>
      </TouchableOpacity>
      <TouchableOpacity style={styles.groupProduct}>
        <RadialGradient
          style={StyleSheet.absoluteFillObject}
          colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
          stops={[0.3, 0.6]}
          center={[100, 100]}
          radius={250}
        />
        <View>
          <ICZalo />
        </View>
        <TextCustom fontSize={16} weight="bold" color={defaultColors.c_fff}>
          Zalo
        </TextCustom>
      </TouchableOpacity>
    </View>
  );
};

export default GroupContact;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    ...globalStyles.row,
    gap: 15,
    paddingHorizontal: paddingHorizontalScreen,
    marginBottom: 26,
  },
  groupProduct: {
    flex: 1,
    position: 'relative',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
});
