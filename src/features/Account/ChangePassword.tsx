import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICLogo} from 'src/assets/icons/ICLogo';
import {Header} from 'src/components/Header';
import SpaceBottom from 'src/components/SpaceBottom';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {useGoBack} from 'src/hooks/useGoBack';
import * as Yup from 'yup';
import {MESSAGES_TYPE} from './ForgotPass';
import {changePassword, clearSession} from 'src/api/user';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {useModal} from 'src/hooks/useModal';
import ModalCustom from 'src/components/ModalCustom';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import {ICError} from 'src/assets/icons/ICError';
import {ICWarrning} from 'src/assets/icons/ICWarrning';
import {DIMENSION} from '@constants';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
  initUserInfo,
  setRefreshToken,
  setToken,
  setUserInfo,
} from 'src/redux/reducers/AuthSlice';
import {AuthServices} from 'src/api/authService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRefreshToken} from 'src/redux/reducers/hook';
const ChangePassword = () => {
  const dismiss = useGoBack();
  const {t} = useTranslation();
  const refresh_token = useRefreshToken();
  const [messagesType, setMessageType] = useState<MESSAGES_TYPE>('');
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const modalEditInventory = useModal();
  const dispatch = useDispatch();
  const {dologout} = AuthServices();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .trim()
        .required('messages.password.requied')
        .max(40, 'messages.max'),
      newPassword: Yup.string()
        .trim()
        .required('messages.newPassword.requied')
        .max(40, 'messages.max'),
      newPasswordRepeat: Yup.string()
        .trim()
        .required('messages.new-password-repeat.requied')
        .max(40, 'messages.max')
        .oneOf(
          [Yup.ref('newPassword')],
          'messages.new-password-repeat.matches',
        ),
    }),
    onSubmit: async (value: any) => {
      handleChangePassword(value);
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

  const handleChangePassword = async (data: any) => {
    try {
      const res = await changePassword(data);
      if (res.success === true) {
        setMessageType('SUCCESS');
        setSuccess('messages.success.change-pass');
        openModal();
      } else if (res.code === 400) {
        setMessageType('WARNING');
        setWarning(res.data.slice(2));
        openModal();
      } else if (res.code === 500) {
        setMessageType('ERROR');
        setError('messages.error.reset-password');
        openModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    modalEditInventory.handleShow();
  };

  const onClose = () => {
    modalEditInventory.handleHidden();
    if (messagesType === 'SUCCESS') {
      return dismiss();
    }
  };

  const logout = () => {
    dologout();
    clearSession(refresh_token);
    dispatch(setToken(''));
    dispatch(setRefreshToken(''));
    dispatch(setUserInfo(initUserInfo));
    dismiss();
  };

  const handleCloseWithBack = () => {
    modalEditInventory.handleHidden();
    return logout();
  };

  const hiddenModal = () => {
    modalEditInventory.handleHidden();
    if (messagesType === 'SUCCESS') {
      return dismiss();
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Header children={undefined} />
        <Pressable
          onPress={dismiss}
          style={{position: 'absolute', right: 20, top: 50}}>
          <ICClose width={20} height={20} />
        </Pressable>
        <View style={{alignItems: 'center', marginTop: 20, rowGap: 45}}>
          <ICLogo />
          <TextTranslate
            fontSize={18}
            weight="600"
            color={defaultColors.text_264659}
            text="account.screen-change-pass.title"
          />
        </View>
        <View style={{paddingHorizontal: 40, marginTop: 45, rowGap: 24}}>
          <TextInputComponent
            textTitle="account.screen-change-pass.form.old-pass"
            textPlanholder="account.screen-change-pass.form.planhoder-old-pass"
            onChangeText={handleChangeInput('oldPassword')}
            value={values.oldPassword}
            secureTextEntry={true}
            // @ts-ignore
            message={
              touched.oldPassword && errors.oldPassword
                ? errors.oldPassword
                : ''
            }
            option={{max: 40}}
            maxLength={40}
          />
          <TextInputComponent
            textTitle="account.screen-change-pass.form.new-pass"
            textPlanholder="account.screen-change-pass.form.planhoder-new-pass"
            onChangeText={handleChangeInput('newPassword')}
            value={values.newPassword}
            secureTextEntry={true}
            // @ts-ignore
            message={
              touched.newPassword && errors.newPassword
                ? errors.newPassword
                : ''
            }
            option={{max: 40}}
            maxLength={40}
          />
          <TextInputComponent
            textTitle="account.screen-change-pass.form.current-pass"
            textPlanholder="account.screen-change-pass.form.planhoder-current-pass"
            onChangeText={handleChangeInput('newPasswordRepeat')}
            value={values.newPasswordRepeat}
            secureTextEntry={true}
            // @ts-ignore
            message={
              touched.newPasswordRepeat && errors.newPasswordRepeat
                ? errors.newPasswordRepeat
                : ''
            }
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
              //@ts-ignore
              onPress={handleSubmit}
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
            {messagesType === 'SUCCESS' && <ICSuccess />}
            {messagesType === 'ERROR' && <ICError />}
            {messagesType === 'WARNING' && <ICWarrning />}
            <TextCustom
              textAlign="center"
              fontSize={17}
              weight="700"
              color={defaultColors.text_313131}>
              {t(
                messagesType === 'SUCCESS'
                  ? success
                  : messagesType === 'ERROR'
                  ? error
                  : messagesType === 'WARNING'
                  ? warning
                  : '',
              )}
            </TextCustom>
            {messagesType === 'SUCCESS' && (
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
export default ChangePassword;
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
  },
});
