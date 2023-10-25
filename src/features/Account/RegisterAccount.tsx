import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {checkAccountExitsApi, postRegisterAccount} from 'src/api/user';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICError} from 'src/assets/icons/ICError';
import {ICLogo} from 'src/assets/icons/ICLogo';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import ModalCustom from 'src/components/ModalCustom';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useGoBack} from 'src/hooks/useGoBack';
import {useModal} from 'src/hooks/useModal';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const RegisterAccount = () => {
  const {t} = useTranslation();
  const dismiss = useGoBack();
  const modalEditInventory = useModal();
  const [showError, setShowError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<string>('');
  const [messageType, setMessageType] = useState<'SUCCESS' | 'ERROR' | ''>('');
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      login: '',
      fullName: '',
      phoneNumber: '',
      //   role: '',
      email: '',
      address: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required('messages.username.requied')
        .max(40, 'messages.max'),
      phoneNumber: Yup.string()
        .trim()
        .required('messages.phone-number.requied')
        .max(10, 'messages.max')
        .matches(/([0-9]{10})\b/g, 'messages.phone-number.matches'),
      email: Yup.string()
        .trim()
        .required('messages.email.requied')
        .email('messages.email.matches')
        .max(256, 'messages.max'),
      address: Yup.string()
        .trim()
        .required('messages.address.requied')
        .max(100, 'messages.max'),
      login: Yup.string()
        .trim()
        .required('messages.account-name.requied')
        .max(40, 'messages.max'),
      password: Yup.string()
        .trim()
        .required('messages.password.requied')
        .max(40, 'messages.max'),
      repeatPassword: Yup.string()
        .trim()
        .required('messages.repeat-password.requied')
        .max(40, 'messages.max')
        .oneOf([Yup.ref('password')], 'messages.repeat-password.matches'),
    }),
    onSubmit: async (value: any) => {
      console.log('value', value);
      const datas = {
        ...value,
        role: 'users',
      };
      handleCheckAccountExits(value.login, datas);
      //   handleLogin(value.username, value.password);
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

  const handlePostUser = async (datas: any) => {
    try {
      const res = await postRegisterAccount(datas);
      if (res.success === true) {
        openModal();
        setMessageType('SUCCESS');
        setShowSuccess('messages.success.post-account');
      } else if (res.code === 400) {
        openModal();
        setMessageType('ERROR');
        setShowError('messages.error.email-exists');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckAccountExits = async (login: any, datas: any) => {
    try {
      const res = await checkAccountExitsApi(login);
      console.log('ress sss', res);
      if (res.code === 400) {
        openModal();
        setMessageType('ERROR');
        setShowError('messages.error.account-exists');
      } else if (res.success === true) {
        handlePostUser(datas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    modalEditInventory.handleShow();
  };
  const handleClose = () => {
    modalEditInventory.handleHidden();
    setShowError('');
    setShowSuccess('');
  };

  const handleCloseWithBack = () => {
    modalEditInventory.handleHidden();
    setShowError('');
    setShowSuccess('');
    //@ts-ignore
    navigation.navigate(accountRoute.login);
  };

  const hiddenModal = () => {
    modalEditInventory.handleHidden();
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
          <ICLogo width={64} height={64} />
          <View style={{marginTop: 4}}>
            <TextTranslate
              fontSize={20}
              weight="700"
              color={defaultColors.c_0000}
              text="account.form-register.title"
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 45, marginTop: 14}}>
          <View style={{rowGap: 17}}>
            <TextInputComponent
              textTitle="account.form-register.full-name"
              textPlanholder="account.form-register.planhoder-full-name"
              onChangeText={handleChangeInput('fullName')}
              value={values.fullName}
              // @ts-ignore
              message={
                touched.fullName && errors.fullName ? errors.fullName : ''
              }
              maxLength={40}
              option={{max: 40}}
            />
            <TextInputComponent
              textTitle="account.form-register.email"
              textPlanholder="account.form-register.planhoder-email"
              onChangeText={handleChangeInput('email')}
              value={values.email}
              // @ts-ignore
              message={touched.email && errors.email ? errors.email : ''}
              maxLength={256}
              option={{max: 256}}
            />
            <TextInputComponent
              textTitle="account.form-register.phone-number"
              textPlanholder="account.form-register.planhoder-phone-number"
              onChangeText={handleChangeInput('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="number-pad"
              // @ts-ignore
              message={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : ''
              }
              maxLength={10}
              option={{max: 10}}
            />
            <TextInputComponent
              textTitle="account.form-register.address"
              textPlanholder="account.form-register.planhoder-address"
              onChangeText={handleChangeInput('address')}
              value={values.address}
              // @ts-ignore
              message={touched.address && errors.address ? errors.address : ''}
              maxLength={100}
              option={{max: 100}}
            />
            <TextInputComponent
              textTitle="account.form-register.account-name"
              textPlanholder="account.form-register.planhoder-account-name"
              onChangeText={handleChangeInput('login')}
              value={values.login}
              // @ts-ignore
              message={touched.login && errors.login ? errors.login : ''}
              maxLength={40}
              option={{max: 40}}
            />
            <TextInputComponent
              textTitle="account.form-register.pass"
              textPlanholder="account.form-register.planhoder-pass"
              onChangeText={handleChangeInput('password')}
              value={values.password}
              secureTextEntry={true}
              // @ts-ignore
              message={
                touched.password && errors.password ? errors.password : ''
              }
              maxLength={40}
              option={{max: 40}}
            />
            <TextInputComponent
              textTitle="account.form-register.confirm-pass"
              textPlanholder="account.form-register.planhoder-confirm-pass"
              onChangeText={handleChangeInput('repeatPassword')}
              value={values.repeatPassword}
              secureTextEntry={true}
              // @ts-ignore
              message={
                touched.repeatPassword && errors.repeatPassword
                  ? errors.repeatPassword
                  : ''
              }
              maxLength={40}
              option={{max: 40}}
            />
          </View>
          <ButtonGradient
            style={{marginTop: 18}}
            isLoading={isSubmitting}
            onPress={handleSubmit}
            text={t('account.register')}
          />
        </View>
        <View style={{marginTop: 5, marginBottom: 20}}>
          <Thumb
            style={styles.styleImage}
            source={require('../../assets/image/form_login.png')}
            resizeMode="cover"
          />
        </View>
        {/* </ScrollView> */}
      </KeyboardAwareScrollView>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}
        onClose={messageType === 'SUCCESS' ? handleCloseWithBack : handleClose}>
        <View style={styles.modalEdit}>
          <TouchableOpacity
            onPress={
              messageType === 'SUCCESS' ? handleCloseWithBack : handleClose
            }
            style={{position: 'absolute', top: 20, right: 20, zIndex: 9999}}>
            <ICClose width={22} height={22} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 10,
            }}>
            {}
            {messageType === 'SUCCESS' && <ICSuccess />}
            {messageType === 'ERROR' && <ICError />}
            <TextCustom
              textAlign="center"
              fontSize={17}
              weight="700"
              color={defaultColors.text_313131}>
              {t(
                messageType === 'SUCCESS'
                  ? showSuccess
                  : messageType === 'ERROR'
                  ? showError
                  : '',
              )}
            </TextCustom>
            {messageType === 'SUCCESS' && (
              <ButtonTouchable
                onPress={handleCloseWithBack}
                style={{
                  backgroundColor: defaultColors._01A63E,
                  height: 40,
                  width: 80,
                }}
                text="common.agree"
              />
            )}
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

export default RegisterAccount;
const styles = StyleSheet.create({
  container: {},
  modalEdit: {
    position: 'relative',
    height: 200,
    width: DIMENSION.width * 0.9,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 10,
    padding: 24,
    marginHorizontal: 20,
    // alignItems: 'center',
  },
  styleImage: {
    width: DIMENSION.width,
    height: 288,
  },
});
