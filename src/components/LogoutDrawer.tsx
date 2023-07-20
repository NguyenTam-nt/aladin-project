import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {ICLogout} from '@icons';
import {TextCustom} from './Text';
import {Thumb} from './Thumb/Thumb';

export const LogoutDrawer = () => {
  return (
    <View style={styles.styleAuth}>
      <View style={styles.styleGroupLogout}>
        <View style={styles.styleAvatar}>
          <Thumb
            style={styles.styleAvatarItem}
            source={{
              uri: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
            }}
          />
        </View>
        <View>
          <TextCustom
            fontSize={14}
            weight="600"
            lineHeight={22}
            textAlign="center"
            color={defaultColors.c_fff}>
            Nguyễn Văn Anh
          </TextCustom>
          <TextCustom
            fontSize={10}
            weight="400"
            lineHeight={18}
            textAlign="center"
            color={defaultColors.rgba_225_225_225_064}>
            Tài khoản: Order
          </TextCustom>
        </View>
        <TouchableOpacity style={styles.styleBtn}>
          <View style={styles.styleIcon}>
            <ICLogout />
          </View>
          <TextCustom fontSize={14} weight="600" color={defaultColors.c_fff}>
            Đăng nhập
          </TextCustom>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  styleAuth: {
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    marginTop : 20,
  },
  styleGroupLogout: {
    width: '100%',
    height: 144,
    backgroundColor: defaultColors.bg_primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 14,
    position: 'relative',
  },
  styleBtn: {
    width: '100%',
    height: 42,
    backgroundColor: defaultColors._EA222A,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  styleIcon: {
    marginRight: 8,
  },
  styleAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
    position: 'absolute',
    left: '50%',
    top: -24,
    overflow: 'hidden',
    transform: [
      {
        translateX: -24 + 16,
      },
    ],
  },
  styleAvatarItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
