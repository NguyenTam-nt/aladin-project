import {defaultColors} from '@configs';
import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {ICClose} from 'src/assets/icons/ICClose';
import {ICLogo} from 'src/assets/icons/ICLogo';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {Header} from 'src/components/Header';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import TextTranslate from 'src/components/TextTranslate';
import {useGoBack} from 'src/hooks/useGoBack';
import * as Yup from 'yup';
const ForgotPassword = () => {
  const dismiss = useGoBack();
  const {t} = useTranslation();
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
      {/* </ScrollView> */}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
