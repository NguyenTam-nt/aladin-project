import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
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
import {authorize, refresh, AuthConfiguration} from 'react-native-app-auth';
import {useKeycloak} from '@react-keycloak/native';

export const AuthConfig = {
  appId: 'web_app',
  appScopes: ['openid', 'profile', 'email', 'offline_access '],
};
const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dismiss = useGoBack();
  const navigation = useNavigation();
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
          //   setTextErrror('messages.error.wrong-user-or-pass');
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

  const config: AuthConfiguration = {
    // issuer:
    //   'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/token',
    // issuer:
    //   'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/auth',
    clientId: 'web_app',
    redirectUrl:
      'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=openid&20profile&email&state=tKMG8Zc8xzT7p6K4VqvsJ5_JDEEkGWWuSCm1rTTm-IA.L7O4CJE_HUw.web_app&response_type=code&client_id=191648618278-gkk9a55o643cjuulf1226snv8qpug58i.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fmarketmoa.com.vn%2Fauth%2Frealms%2Fplustmart%2Fbroker%2Fgoogle%2Fendpoint&nonce=NfipGx7Srndy_p8p1Cu3aA&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow',
    scopes: ['openid', 'profile', 'email', 'offline_access '],
    serviceConfiguration: {
      authorizationEndpoint:
        'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/auth',
      tokenEndpoint:
        'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/token',
    },
  };
  const {keycloak} = useKeycloak();
  const handleLoginWithKeyclock = async () => {
    keycloak?.login();
  };

  const handleLoout = () => {
    keycloak?.logout();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <KeyboardAwareScrollView>
        <Pressable
          onPress={dismiss}
          style={{position: 'absolute', right: 20, top: 50, zIndex: 10}}>
          <ICClose width={20} height={20} />
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 50}}>
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
                color={defaultColors.text_264659}
                fontSize={12}
                weight="400"
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
                onPress={handleLoginWithKeyclock}
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
                onPress={handleLoout}
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
            resizeMode="cover"
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

const data = {
  access_token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJQnU2T2h0aHM3b2kxNlhGZ1gzUC1TaFNsc09ETlVLNkV2SEFKNWJxWkdBIn0.eyJleHAiOjE2OTgxNjgzMjAsImlhdCI6MTY5ODEzMjMyMCwianRpIjoiMTcyMjc0YjQtNzczMC00YTI3LTliOGItYTAyNDdiODM2ZTdiIiwiaXNzIjoiaHR0cHM6Ly9tYXJrZXRtb2EuY29tLnZuL2F1dGgvcmVhbG1zL3BsdXN0bWFydCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OWYxMTRhYi1iNWRlLTQ4NzYtODNhMy1iZTM4MzQwYzhkNDIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWJfYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjYwZDQzMDAxLTRjZTAtNGU5OS1hM2I2LTY2ZTFiMGYwM2IzZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IndlYl9hcHAiOnsicm9sZXMiOlsidXNlcnMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsidXNlcnMiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYW5odm4iLCJlbWFpbCI6InhpbmhidXRrbmd1QGdtYWlsLmNvbSJ9.UCF74LuNt5wE6QEFU6YldG4-36LY7raeLPqSMeG1Ty_8gcCCl_jXhhPHvBts7ghhYFEiEv5Prc0bst25KUTiXn7HiJm27yq9CIHpjxbprWcNkalKNF_5M_gveRDJIUQBMpZoZ5bRWEVQ8mhz3yZ7i-JX-47oJNULWecik7AmrGzhyErnCDdHTm5dWLrpc9iz_gL4sb0Hc7JLwD7kjizwHKanR42ylcRoNj18Hyf97cigxg8LPvmPh2qpEX1EzKIcdajp1tHQ7H5AvGfz7mvzFwL4GB-kExqHoOBSeBvWGJ6zMp7q8RZAH9ZJ7fLvXI3YM88TLwy7yblC8kUKBKzhig',
  expires_in: 36000,
  'not-before-policy': 1697767388,
  refresh_expires_in: 36000,
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwMzVhZWMxMi05Nzk0LTQyZWUtOGJmNy0yNDgzNjc0MjAwMzcifQ.eyJleHAiOjE2OTgxNjgzMjAsImlhdCI6MTY5ODEzMjMyMCwianRpIjoiNTQ3N2E0NTEtYThjOC00YjYzLThiYTAtM2ZhMGU5MzE5Yjg2IiwiaXNzIjoiaHR0cHM6Ly9tYXJrZXRtb2EuY29tLnZuL2F1dGgvcmVhbG1zL3BsdXN0bWFydCIsImF1ZCI6Imh0dHBzOi8vbWFya2V0bW9hLmNvbS52bi9hdXRoL3JlYWxtcy9wbHVzdG1hcnQiLCJzdWIiOiI5OWYxMTRhYi1iNWRlLTQ4NzYtODNhMy1iZTM4MzQwYzhkNDIiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoid2ViX2FwcCIsInNlc3Npb25fc3RhdGUiOiI2MGQ0MzAwMS00Y2UwLTRlOTktYTNiNi02NmUxYjBmMDNiM2YiLCJzY29wZSI6InByb2ZpbGUgZW1haWwifQ.Hei7SI1Ooh9Yk9QDA2EEflILnRxRJm_qD6p1HpnmpDo',
  scope: 'profile email',
  session_state: '60d43001-4ce0-4e99-a3b6-66e1b0f03b3f',
  token_type: 'Bearer',
};

// const data = 'https://hanquochoc.edu.vn/auth/realms/hcm/protocol/openid-connect/auth?client_id=hcm&redirect_uri=https://lmsone.page.link/r2ctcKvdmnNwa96t5&state=e78aa513-200f-4656-8ce5-d44f274c347f&response_mode=fragment&response_type=code&scope=openid&nonce=c0d6be84-ecfc-4c6d-95bc-31c6dc8af92d&code_challenge=cYBr2huLHMsp9szcAoEwY9396CfJOk9B3nS2kBBjUEw&code_challenge_method=S256';

const fff = {
  realm: 'plustmart',
  public_key:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+8nLzx0A+0sXIe9ZIMOoA+oTQwgsVTmDWd8JgvoqUprdISm4WopkicYtOgcYRnBpznIKW7tH2HupZZolrYmJj0OGUqrbIE/ITu1gOKguQmEU0SrRqJcjIX8ZyKCrSHA4hxZ073lxWDLWDPwGKje/QiInuy7hVfSLVM1iqhR/CaPSrP9YsETpw8DDsEdAVKmXiwnarwUgr3BqrmSoSHUAlHImVBp3q8+dCH+tBZYePToBKpLeeei+fcnYI9i1bKFbr06NrqCdc5jMvliSrZkSwxDr2A3rumAeFg3f99AVPZzxFfXAa9kleYv5FG6mx3s6XsU5gzyda07KQKOnh/sihQIDAQAB',
  'token-service':
    'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect',
  'account-service': 'https://marketmoa.com.vn/auth/realms/plustmart/account',
  'tokens-not-before': 0,
};

const plustMark =
  'https://marketmoa.com.vn/auth/realms/plustmart/protocol/openid-connect/auth?client_id=web_app&redirect_uri=https://marketmoa.com.vn/&state=475605fd-3c05-44ab-a416-65c38393f86a&response_mode=fragment&response_type=code&scope=openid&nonce=c07b7d5d-19da-4703-a08c-3aac66c9212d&code_challenge=e3_Njl9dJ4Zc3arPTMpa9tpVfUdV2jlpbmbIqo20ey8&code_challenge_method=S256';
