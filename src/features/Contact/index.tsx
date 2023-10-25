import {defaultColors} from '@configs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICBack} from 'src/assets/icons/ICBack';
import {Header} from 'src/components/Header';
import TextTranslate from 'src/components/TextTranslate';
import {useGoBack} from 'src/hooks/useGoBack';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {IContact, postContactApi} from 'src/api/contact';
import {useNavigation} from '@react-navigation/native';
import {useAlert} from 'src/constants/links';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {productRoute} from 'src/constants/routers';
import SpaceBottom from 'src/components/SpaceBottom';

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const ContactScrren = () => {
  const dismiss = useGoBack();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      content: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required('messages.full-name.requied')
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
      content: Yup.string()
        .trim()
        .required('messages.content.requied')
        .max(1000, 'messages.max'),
    }),
    onSubmit: async (value: any) => {
      handlSubmitContact(value);
      // hadleShowModal();
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

  const handlSubmitContact = async (data: IContact) => {
    try {
      const res = await postContactApi(data);
      if (res.data) {
        hadleShowModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showSussess = useAlert();
  const hadleShowModal = () => {
    showSussess({types: 'FREE-COUSLUTION'});
  };

  return (
    <View style={styles().container}>
      <Header>
        <View
          style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
          <TouchableOpacity onPress={dismiss}>
            <ICBack height={20} width={20} />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: defaultColors.bg_00C3AB,
            }}>
            <TextTranslate
              fontSize={24}
              weight="700"
              color={defaultColors.primary}
              text="contact.title"
            />
          </View>
        </View>
      </Header>
      <KeyboardAwareScrollView>
        <View
          style={{
            // marginTop: 15,
            paddingHorizontal: 18,
          }}>
          <TextTranslate
            fontSize={14}
            weight="400"
            textAlign="justify"
            color={defaultColors.text_313131}
            text="contact.description"
          />
          <View style={{marginTop: 20, flexDirection: 'column', rowGap: 18}}>
            <TextInputComponent
              textTitle="contact.full-name"
              textPlanholder="contact.planhoder-full-name"
              onChangeText={handleChangeInput('fullName')}
              value={values.fullName}
              // @ts-ignore
              message={
                touched.fullName && errors.fullName ? errors.fullName : ''
              }
              option={{max: 40}}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="contact.phone-number"
              textPlanholder="contact.planhoder-phone-number"
              onChangeText={handleChangeInput('phoneNumber')}
              value={values.phoneNumber}
              keyboardType="number-pad"
              // @ts-ignore
              message={
                touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : ''
              }
              option={{max: 10}}
              maxLength={10}
              isPhone={true}
            />
            <TextInputComponent
              textTitle="contact.address"
              textPlanholder="contact.planhoder-address"
              onChangeText={handleChangeInput('address')}
              value={values.address}
              // @ts-ignore
              message={touched.address && errors.address ? errors.address : ''}
              option={{max: 100}}
              maxLength={100}
            />

            <TextInputComponent
              textTitle="contact.email"
              textPlanholder="contact.planhoder-email"
              onChangeText={handleChangeInput('email')}
              value={values.email}
              // @ts-ignore
              message={touched.email && errors.email ? errors.email : ''}
              option={{max: 256}}
              maxLength={256}
            />
            <TextInputComponent
              editable
              multiline
              numberOfLines={4}
              textarea={true}
              textTitle="contact.content"
              textPlanholder="contact.planhoder-content"
              onChangeText={handleChangeInput('content')}
              value={values.content}
              // @ts-ignore
              message={touched.content && errors.content ? errors.content : ''}
              option={{max: 1000}}
              maxLength={1000}
            />
          </View>
          <View style={{marginTop: 20, flexDirection: 'column', rowGap: 12}}>
            <ButtonGradient
              onPress={() => handleSubmit()}
              text={t('button.required-contact')}
              isLoading={isSubmitting}
            />
            <ButtonTouchable
              // @ts-ignore
              onPress={() => navigation.navigate(productRoute.prifex)}
              text="button.see-more-product"
              borderRadius={30}
              textColor={defaultColors.bg_E60E00}
              height={38}
            />
          </View>
        </View>
        <SpaceBottom />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ContactScrren;
const styles = (textarea?: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      backgroundColor: defaultColors.c_fff,
    },
    icon: {
      marginRight: 10,
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: '#fff',
      width: 'auto',
      shadowColor: '#000000',
      shadowRadius: 4,
      shadowOffset: {height: 4, width: 0},
      shadowOpacity: 0.5,
      left: 90,
      borderRadius: 4,
    },
    overlay: {
      width: 'auto',
      height: '100%',
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
    },
  });
