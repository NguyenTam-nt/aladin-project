import {Thumb} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {login} from 'src/api/login';
import {getUserInfo} from 'src/api/user';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICFacebook} from 'src/assets/icons/ICFacebook';
import {ICGoogle} from 'src/assets/icons/ICGoogle';
import {ICLogo} from 'src/assets/icons/ICLogo';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useGoBack} from 'src/hooks/useGoBack';
import {
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import * as Yup from 'yup';
import {AuthServices} from 'src/api/authService';
import {useToken, useUserInfo} from 'src/redux/reducers/hook';

const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dismiss = useGoBack();
  const navigation = useNavigation();
  const {doLoginGoogle, doLoginFacebook} = AuthServices();
  const token = useToken();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required('messages.username.requied')
        .max(40, 'messages.max'),
      password: Yup.string()
        .trim()
        .required('messages.password.requied')
        .max(40, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      handleLogin(value.username, value.password);
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: handleChangeInput,
    handleSubmit,
  } = formik;

  const handleLogin = async (username: string, pass: string) => {
    try {
      const res = await login(username, pass);
      if (res.success) {
        await dispatch(setToken(res.data.access_token));
        await dispatch(setRefreshToken(res.data.refresh_token));
        const userInfo = await getUserInfo(res.data.access_token);
        if (userInfo) {
          await dispatch(setUserInfo(userInfo.data));
          dismiss();
        }
      } else {
        if (res.code === 401) {
          Toast.show({
            type: 'tomatoToast',
            props: {
              status: res.success ? 'success' : 'error',
              uuid: 'messages.error.wrong-user-or-pass',
            },
          });
        } else {
          Toast.show({
            type: 'tomatoToast',
            props: {
              status: res.success ? 'success' : 'error',
              uuid: res?.message,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGGWithKeyclock = () => {
    doLoginGoogle();
  };

  const handleLoginFBWithKeyclock = () => {
    doLoginFacebook();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        dismiss();
        return;
      }
    }, [token]),
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView>
        <Pressable
          onPress={dismiss}
          style={{
            position: 'absolute',
            right: 20,
            top: 50,
            zIndex: 10,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ICClose width={20} height={20} />
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 60}}>
          <ICLogo />
          <View style={{marginTop: 27}}>
            <TextTranslate
              fontSize={20}
              weight="700"
              color={defaultColors.c_0000}
              text="account.login"
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 45}}>
          <View style={{rowGap: 20}}>
            <TextInputComponent
              textTitle="account.form-login.account"
              textPlanholder="account.form-login.planhoder-account"
              value={values.username}
              onChangeText={handleChangeInput('username')}
              //@ts-ignore
              message={
                touched.username && errors.username ? errors.username : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="account.form-register.pass"
              textPlanholder="account.form-register.planhoder-pass"
              value={values.password}
              onChangeText={handleChangeInput('password')}
              secureTextEntry={true}
              //@ts-ignore
              message={
                touched.password && errors.password ? errors.password : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
          </View>
          <View style={{flexDirection: 'row', columnGap: 5, marginTop: 20}}>
            <TextTranslate
              color={defaultColors.text_264659}
              fontSize={12}
              weight="400"
              text="account.form-login.forgot-pass"
            />
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate(accountRoute.forgotPass)}>
              <TextTranslate
                color={defaultColors.text_018193}
                fontSize={12}
                weight="700"
                text="account.form-login.pass-retrieval"
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', rowGap: 14, marginTop: 18}}>
            <ButtonGradient
              isLoading={isSubmitting}
              onPress={handleSubmit}
              text={t('account.login')}
            />
            <TextTranslate
              textAlign="center"
              color={defaultColors.text_264659}
              fontSize={12}
              weight="400"
              text="account.form-login.login-with"
            />
            <View
              style={{
                flexDirection: 'row',
                columnGap: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleLoginGGWithKeyclock}
                style={styles.styleLoginWith}>
                <ICGoogle />
                <TextTranslate
                  textAlign="center"
                  color={defaultColors.text_0C222F}
                  fontSize={14}
                  weight="400"
                  text="account.form-login.google"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLoginFBWithKeyclock}
                style={styles.styleLoginWith}>
                <ICFacebook />
                <TextTranslate
                  textAlign="center"
                  color={defaultColors.text_264659}
                  fontSize={12}
                  weight="400"
                  text="account.form-login.facebook"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 2,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextTranslate
              fontSize={14}
              weight="400"
              color={defaultColors.text_313131}
              text="account.form-login.not-account"
            />
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.navigate(accountRoute.register)}>
              <TextTranslate
                fontSize={14}
                weight="600"
                color={defaultColors._0073E5}
                text="account.form-login.register-now"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Thumb
            style={styles.styleImage}
            source={require('../../assets/image/form_login.png')}
            resizeMode="stretch"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  styleLoginWith: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
    borderRadius: 10,
    borderColor: defaultColors.primary,
    borderWidth: 1,
    paddingVertical: 5,
  },
  styleImage: {
    width: DIMENSION.width,
    height: 288,
  },
});
