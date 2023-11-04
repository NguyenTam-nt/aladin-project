import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextCustom, Thumb} from '@components';
import {
  contactBanner,
  bgContactBanner,
  contactGroupNote,
} from 'src/assets/image';
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
        {/* <Thumb
          source={bgContactBanner}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        /> */}
        {/* <View
          style={{
            width: 289,
            height: 229,
            position: 'relative',
            paddingTop: 15,
            // ...globalStyles.center,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}>
            <Thumb
              source={contactGroupNote}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{rowGap: 12}}>
            <View style={{paddingHorizontal: 15}}>
              <TextTranslate
                fontSize={20}
                weight="700"
                textAlign="center"
                color={defaultColors.text_111213}
                text="home.contact-title"
                textTransform="uppercase"
              />
            </View>
            <TextTranslate
              fontSize={10}
              weight="400"
              textAlign="center"
              color={defaultColors.text_111213}
              text="home.contact_note"
            />
            <View style={styles.container_btn}>
              <View style={globalStyles.center}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://story.kakao.com/marketmoa')
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
                <TextCustom
                  fontSize={14}
                  weight="bold"
                  color={defaultColors.text_111213}>
                  Kakaotalk
                </TextCustom>
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

                <TextCustom
                  fontSize={14}
                  weight="bold"
                  color={defaultColors.text_111213}>
                  Zalo
                </TextCustom>
              </View>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default ContactTopic;

const styles = StyleSheet.create({
  container_btn: {
    ...globalStyles.row,
    // gap: 32,
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
    // marginBottom: 4,
  },
});
