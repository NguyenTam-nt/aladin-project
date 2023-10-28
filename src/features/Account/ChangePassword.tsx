import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {changePassword} from 'src/api/user';
const ChangePassword = () => {
  const dismiss = useGoBack();
  const [messagesType, setMessageType] = useState<MESSAGES_TYPE>('');
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');
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
      console.log('value', value);
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

  const handleChangePassword = async () => {
    try {
      const data = {
        oldPassword: '123ss',
        newPassword: '123123',
        newPasswordRepeat: '123123',
      };
      const res = await changePassword(data);
      console.log('ress ', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
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
              onPress={handleChangePassword}
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
      </ScrollView>
    </View>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  container: {},
});
// Phiphi123
