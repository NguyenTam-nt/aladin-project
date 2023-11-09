import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Thumb} from '@components';
import {contactBanner} from 'src/assets/image';
import {globalStyles} from 'src/commons/globalStyles';
import TextTranslate from 'src/components/TextTranslate';
import {defaultColors} from '@configs';
import RadialGradient from 'react-native-radial-gradient';
import {ICTalk} from 'src/assets/icons/ICTalk';
import {ICZalo} from 'src/assets/icons/ICZalo';

const ContactTopic = () => {
  return (
    <View style={{marginTop: 25}}>
      <Thumb source={contactBanner} style={{width: '100%', height: 229}} />
      <View
        style={{position: 'relative', ...globalStyles.center, height: 'auto'}}>
        <View
          style={{
            width: '100%',
            height: 113,
            backgroundColor: defaultColors.bg_00C3AB,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextTranslate
            fontSize={14}
            weight="700"
            textAlign="center"
            color={defaultColors.c_fff}
            text="home.contact-title"
            textTransform="uppercase"
          />
          <View style={styles.container_btn}>
            <View style={globalStyles.center}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://open.kakao.com/o/sKf07UIc')
                }
                style={styles.groupProduct}>
                <RadialGradient
                  style={StyleSheet.absoluteFillObject}
                  colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
                  stops={[0.3, 0.6]}
                  center={[100, 100]}
                  radius={250}
                />
                <View>
                  <ICTalk width={38} height={40} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={globalStyles.center}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://zalo.me/0337101004')}
                style={styles.groupProduct}>
                <RadialGradient
                  style={StyleSheet.absoluteFillObject}
                  colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
                  stops={[0.3, 0.6]}
                  center={[100, 100]}
                  radius={250}
                />
                <View>
                  <ICZalo width={40} height={18} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactTopic;

const styles = StyleSheet.create({
  container_btn: {
    ...globalStyles.row,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    columnGap: 24,
  },
  groupProduct: {
    width: 55,
    position: 'relative',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
