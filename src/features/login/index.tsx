import { ROLE_LIST, defaultColors } from '@configs';
import { DIMENSION } from '@constants';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { login } from 'src/api/login';
import { getUserInfo } from 'src/api/user';
import { ICEye } from 'src/assets/icons/ICEye';
import { ICEyeOff } from 'src/assets/icons/ICEyeOff';
import { IAuthorize, setRefreshToken, setToken, setUserInfo } from 'src/redux/reducers/AuthSlice';

const LoginScreen = () => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showPass , setShowPass] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSingIn = async () => {
    const res = await login(account, password);
    if (res.success) {
      await dispatch(setRefreshToken(res.data.refresh_token));
      await dispatch(setToken(res.data.access_token));
      const userInfo = await getUserInfo(res.data.access_token);
      if (userInfo.data) {
        dispatch(setUserInfo(userInfo.data));
        userInfo.data.authorities.some((role: IAuthorize) => {
          switch (role.name) {
            case ROLE_LIST.guest:
              //@ts-ignore
              navigation.replace('main', {screen: 'mainDrawer'});
              break;
            case ROLE_LIST.chef:
              //@ts-ignore
              navigation.replace('main', {screen: 'kitchen'});
              break;
              case ROLE_LIST.order:
                //@ts-ignore
                navigation.replace('main', {screen: 'mainDrawer'});
                break;
            default:
              Toast.show({
                type: 'tomatoToast',
                props: {
                  status: res.success ? 'success' : 'error',
                  uuid: 'Đã có lỗi xảy ra',
                },
              });
              break;
          }
        });
      } else {
        Toast.show({
          type: 'tomatoToast',
          props: {
            status: userInfo.success ? 'success' : 'error',
            uuid: userInfo?.message,
          },
        });
      }
    } else {
      Toast.show({
        type: 'tomatoToast',
        props: {status: res.success ? 'success' : 'error', uuid: res?.message},
      });
    }
  };
  return (
    <View>
      <StatusBar />
      <KeyboardAwareScrollView>
        <View style={styles.contanter}>
          <Image
            source={require('src/assets/image/bg_login.webp')}
            style={styles.image}
          />
          <Text style={styles.textTitle}>Đăng nhập vào hệ thống</Text>
          <Text style={styles.textNoti}>
            Vui lòng nhập thông tin để đăng nhập
          </Text>
          <View style={styles.contentTextInput}>
            <Text style={styles.textInput}>Tài khoản</Text>
            <View style={styles.inputViewPass}>
              <TextInput
                style={styles.input}
                placeholder="Nhập tải khoản"
                value={account}
                onChangeText={setAccount}
                onFocus={() => {
                  setError(false);
                }}
              />
            </View>
            {error && (
              <Text style={styles.textError}>
                Tài khoản hoặc mật khẩu không đúng.
              </Text>
            )}
          </View>
          <View style={styles.contentTextInputPass}>
            <Text style={styles.textInput}>Mật khẩu</Text>
            <View style={styles.inputViewPass}>
              <TextInput
                secureTextEntry={!showPass}
                style={styles.inputPassword}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                onFocus={() => {
                  setError(false);
                }}
              />
              <TouchableOpacity
                style={styles.buttonEye}
                activeOpacity={0.9}
                onPress={() => {
                  setShowPass(value => !value);
                }}>
                {!showPass ? <ICEye /> : <ICEyeOff />}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.7}
            onPress={handleSingIn}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contanter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: DIMENSION.height,
    width: DIMENSION.width,
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textTitle: {
    fontFamily: 'iCielBCCubano-Normal',
    fontSize: 24,
    color: defaultColors._074A20,
  },
  textNoti: {
    marginTop: 24,
    fontSize: 16,
    color: defaultColors.c_0000,
  },
  contentTextInput: {
    width: '90%',
    marginTop: 64,
  },
  contentTextInputPass: {
    width: '90%',
    marginTop: 20,
  },
  textInput: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_222124,
  },
  textError: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors._E73F3F,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 5,
  },
  inputViewPass: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputPassword: {
    height: 48,
    paddingHorizontal: 5,
    flex: 1,
  },
  buttonEye: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonLogin: {
    backgroundColor: defaultColors._074A20,
    width: '90%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  textLogin: {
    color: defaultColors.c_fff,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
