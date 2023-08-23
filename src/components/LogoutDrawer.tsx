import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {ICLogout} from '@icons';
import {TextCustom} from './Text';
import {Thumb} from './Thumb/Thumb';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { initUserInfo, setRefreshToken, setToken, setUserInfo } from 'src/redux/reducers/AuthSlice';
import { useUserInfo } from 'src/redux/reducers/hook';
import { setFloorActiveRedux } from 'src/redux/infoDrawer/slice';

export const LogoutDrawer = () => {
  const navigation = useNavigation();
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setToken(''));
    dispatch(setRefreshToken(''));
    dispatch(setUserInfo(initUserInfo));
    dispatch(setFloorActiveRedux('Tất cả'));
    //@ts-ignore
    navigation.replace('login');
  };

  return (
    <View style={styles.styleAuth}>
      <View style={styles.styleGroupLogout}>
        <View style={styles.styleAvatar}>
          <Thumb
            style={styles.styleAvatarItem}
            source={{
              uri: userInfo.imageUrl,
            }}
            avatarType
          />
        </View>
        <View>
          <TextCustom
            fontSize={14}
            weight="600"
            lineHeight={22}
            textAlign="center"
            color={defaultColors.c_fff}>
            {userInfo.fullname}
          </TextCustom>
          <TextCustom
            fontSize={10}
            weight="400"
            lineHeight={18}
            textAlign="center"
            color={defaultColors.rgba_225_225_225_064}>
            Tài khoản: {userInfo.phone}
          </TextCustom>
        </View>
        <TouchableOpacity style={styles.styleBtn} onPress={logout}>
          <View style={styles.styleIcon}>
            <ICLogout />
          </View>
          <TextCustom fontSize={14} weight="600" color={defaultColors.c_fff}>
            Đăng xuất
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
