import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {DIMENSION} from '@constants';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {resetPassWord} from 'src/api/user';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICError} from 'src/assets/icons/ICError';
import {ICLogo} from 'src/assets/icons/ICLogo';
import {ICSuccess} from 'src/assets/icons/ICSuccess';
import {ICWarrning} from 'src/assets/icons/ICWarrning';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {Header} from 'src/components/Header';
import ModalCustom from 'src/components/ModalCustom';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {useGoBack} from 'src/hooks/useGoBack';
import {useModal} from 'src/hooks/useModal';
import * as Yup from 'yup';

export type MESSAGES_TYPE = 'SUCCESS' | 'ERROR' | 'WARNING' | '';
const ForgotPassword = () => {
  const dismiss = useGoBack();
  const {t} = useTranslation();
  const [messagesType, setMessageType] = useState<MESSAGES_TYPE>('');
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
  const modalEditInventory = useModal();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required('messages.email.requied')
        .email('messages.email.matches')
        .max(256, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      // console.log('value', value);
      handleResetPassword(value.email);
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

  const handleResetPassword = async (email: string) => {
    try {
      const res = await resetPassWord(email);
      if (res.code === 400) {
        setMessageType('WARNING');
        setWarning('messages.warning.reset-password');
        openModal();
      } else if (res.code === 500) {
        setMessageType('ERROR');
        setError('messages.error.reset-password');
        openModal();
      } else if (res.status === 200) {
        setMessageType('SUCCESS');
        setSuccess('messages.success.reset-password');
        openModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    modalEditInventory.handleShow();
  };

  const hiddenModal = () => {
    modalEditInventory.handleHidden();
    if (messagesType === 'SUCCESS') {
      return dismiss();
    }
  };

  const onClose = () => {
    modalEditInventory.handleHidden();
    if (messagesType === 'SUCCESS') {
      return dismiss();
    }
  };
  const handleCloseWithBack = () => {
    modalEditInventory.handleHidden();
    dismiss();
  };
  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
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
          text="account.form-login.pass-retrieval"
        />
      </View>
      <View style={{paddingHorizontal: 30, marginTop: 45, rowGap: 24}}>
        <TextInputComponent
          textTitle="account.enter-mail-with-pass"
          textPlanholder="account.planhoder-enter-mail-with-pass"
          onChangeText={handleChangeInput('email')}
          value={values.email}
          // @ts-ignore
          message={touched.email && errors.email ? errors.email : ''}
          option={{max: 256}}
          maxLength={256}
        />
        <ButtonGradient
          onPress={handleSubmit}
          text={t('account.form-login.pass-retrieval')}
          isLoading={isSubmitting}
        />
      </View>
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
      {/* </ScrollView> */}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
