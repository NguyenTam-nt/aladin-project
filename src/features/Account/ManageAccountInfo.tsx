import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadialGradient from 'react-native-radial-gradient';
import {useDispatch} from 'react-redux';
import {updateUserInfo} from 'src/api/user';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICError} from 'src/assets/icons/ICError';
import {ICLogo} from 'src/assets/icons/ICLogo';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import {Header} from 'src/components/Header';
import ModalCustom from 'src/components/ModalCustom';
import SpaceBottom from 'src/components/SpaceBottom';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {accountRoute} from 'src/constants/routers';
import {useGoBack} from 'src/hooks/useGoBack';
import {useModal} from 'src/hooks/useModal';
import {
  IUserInfo,
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import {useToken, useUserInfo} from 'src/redux/reducers/hook';
import * as Yup from 'yup';
const ManageAccountInfo = () => {
  const {t} = useTranslation();
  const dismiss = useGoBack();
  const userInfo = useUserInfo();
  const getToken = useToken();
  const dispatch = useDispatch();
  const modalEditInventory = useModal();
  const navigation = useNavigation();
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [messageType, setMessageType] = useState<'SUCCESS' | 'ERROR' | ''>('');
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      address: '',
      login: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required('messages.full-name.requied')
        .max(40, 'messages.max'),
      email: Yup.string()
        .trim()
        .required('messages.email.requied')
        .email('messages.email.matches')
        .max(256, 'messages.max'),
      address: Yup.string()
        .trim()
        .required('messages.address.requied')
        .max(100, 'messages.max'),
      phoneNumber: Yup.string()
        .trim()
        .required('messages.phone-number.requied')
        .max(10, 'messages.max')
        .matches(/([0-9]{10})\b/g, 'messages.phone-number.matches'),
      login: Yup.string()
        .trim()
        .required('messages.account-name.requied')
        .max(40, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      const data = {
        ...value,
        userId: userInfo.id,
      };
      handleUpdateAccountInfo(getToken, userInfo.id, data);
      //   handleLogin(value.username, value.password);
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange: handleChangeInput,
    setFieldValue,
    handleSubmit,
  } = formik;

  const logout = () => {
    dispatch(setToken(''));
    dispatch(setRefreshToken(''));
    dispatch(setUserInfo(initUserInfo));
    //@ts-ignore
    navigation.navigate(accountRoute.prifex);
  };
  const handleUpdateAccountInfo = async (token: string, id: any, data: any) => {
    try {
      const res = await updateUserInfo(token, id, data);
      if (res) {
        setMessageType('SUCCESS');
        setSuccess('messages.success.update-account-info');
        openModal();
      }
    } catch (error) {
      setMessageType('ERROR');
      setError('messages.error.update-account-info');
      openModal();
      console.log(error);
    }
  };
  const handleSetData = (data: IUserInfo) => {
    setFieldValue('fullName', data.fullName);
    setFieldValue('email', data.email);
    setFieldValue('address', data.address);
    setFieldValue('phoneNumber', data.phoneNumber);
    setFieldValue('login', data.login);
  };
  useEffect(() => {
    handleSetData(userInfo);
  }, [userInfo]);

  const openModal = () => {
    modalEditInventory.handleShow();
  };
  const hiddenModal = () => {
    modalEditInventory.handleHidden();
    setError('');
    setSuccess('');
    logout();
  };

  const onClose = () => {
    setError('');
    setSuccess('');
    logout();
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <Header children={undefined} />
        <Pressable
          onPress={dismiss}
          style={{
            position: 'absolute',
            right: 20,
            top: 50,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ICClose width={20} height={20} />
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 20, rowGap: 45}}>
          <ICLogo />
          <TextTranslate
            fontSize={18}
            weight="700"
            color={defaultColors.primary}
            text="account.manage-account-info"
          />
        </View>
        <View style={{paddingHorizontal: 40, marginTop: 45, rowGap: 24}}>
          <TextInputComponent
            textTitle="account.screen-manage-account.form.full-name"
            textPlanholder="account.screen-manage-account.form.planhoder-full-name"
            onChangeText={handleChangeInput('fullName')}
            value={values.fullName}
            // @ts-ignore
            message={touched.fullName && errors.fullName ? errors.fullName : ''}
            option={{max: 40}}
            maxLength={40}
          />
          <TextInputComponent
            textTitle="account.screen-manage-account.form.email"
            textPlanholder="account.screen-manage-account.form.planhoder-email"
            onChangeText={handleChangeInput('email')}
            value={values.email}
            // @ts-ignore
            message={touched.email && errors.email ? errors.email : ''}
            option={{max: 256}}
            maxLength={256}
          />
          <TextInputComponent
            textTitle="account.screen-manage-account.form.phone-number"
            textPlanholder="account.screen-manage-account.form.planhoder-phone-number"
            onChangeText={handleChangeInput('phoneNumber')}
            value={values.phoneNumber}
            // @ts-ignore
            message={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : ''
            }
            option={{max: 10}}
            maxLength={10}
          />
          <TextInputComponent
            textTitle="account.screen-manage-account.form.address"
            textPlanholder="account.screen-manage-account.form.planhoder-address"
            onChangeText={handleChangeInput('address')}
            value={values.address}
            // @ts-ignore
            message={touched.address && errors.address ? errors.address : ''}
            option={{max: 100}}
            maxLength={100}
          />
          <TextInputComponent
            textTitle="account.screen-manage-account.form.account-name"
            textPlanholder="account.screen-manage-account.form.planhoder-account-name"
            onChangeText={handleChangeInput('login')}
            value={values.login}
            // @ts-ignore
            message={touched.login && errors.login ? errors.login : ''}
            option={{max: 40}}
            maxLength={40}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              columnGap: 24,
              paddingBottom: 100,
            }}>
            <TouchableOpacity
              onPress={dismiss}
              style={{
                flex: 1,
                alignItems: 'center',
                borderColor: defaultColors.br_FF8B03,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}>
              <TextTranslate
                fontSize={14}
                color={defaultColors.primary}
                weight="700"
                text="button.cancel"
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => handleSubmit()}
              style={{
                flex: 1,
                alignItems: 'center',
                borderColor: defaultColors.br_FF8B03,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}>
              <RadialGradient
                style={StyleSheet.absoluteFillObject}
                colors={[defaultColors.bg_E60E00, defaultColors.secondary]}
                stops={[0.2, 0.6]}
                center={[71, 95]}
                radius={250}
              />
              <TextTranslate
                fontSize={14}
                color={defaultColors.c_fff}
                weight="700"
                text="button.update"
              />
            </TouchableOpacity>
          </View>
        </View>
        <SpaceBottom />
      </KeyboardAwareScrollView>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}
        onClose={onClose}>
        <View style={styles.modalEdit}>
          <TouchableOpacity
            onPress={hiddenModal}
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
                  ? success
                  : messageType === 'ERROR'
                  ? error
                  : '',
              )}
            </TextCustom>
          </View>
        </View>
      </ModalCustom>
    </View>
  );
};

export default ManageAccountInfo;
const styles = StyleSheet.create({
  container: {flex: 1, position: 'relative'},
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
});
