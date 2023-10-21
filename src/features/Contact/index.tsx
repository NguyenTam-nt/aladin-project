import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React, {ReactElement, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ICBack} from 'src/assets/icons/ICBack';
import {Header} from 'src/components/Header';
import TextTranslate from 'src/components/TextTranslate';
import {useGoBack} from 'src/hooks/useGoBack';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import TextError from 'src/components/TextError';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {IContact, postContactApi} from 'src/api/contact';
import {useNavigation} from '@react-navigation/native';
import {useAlert} from 'src/constants/links';
import {VietnamFlag, koreanFlag} from 'src/assets/image';
import {useDropdown} from 'src/hooks/useDropdown';
import {ICDropdown} from 'src/assets/icons/ICDropdown';
type Props = {
  textTitle: string;
  textPlanholder: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  textarea?: boolean;
  message?: string;
  option?: {[key: string]: any};
  maxLength?: number;
  renderLeft?: () => React.ReactElement;
} & TextInputProps;

export type COUNTRY = 'Vietnamese' | 'Korea';
const MOBILE_TELEPHONE_PREFIXES: {
  country: COUNTRY;
  telephone_prefixes: string;
  image: any;
}[] = [
  {country: 'Vietnamese', telephone_prefixes: '+84', image: VietnamFlag},
  {country: 'Korea', telephone_prefixes: '+82', image: koreanFlag},
];

const TextInputGroup = (props: Props) => {
  const {
    textPlanholder,
    textTitle,
    textarea = false,
    message,
    option,
    renderLeft,
  } = props;
  const {t} = useTranslation();
  return (
    <View style={{position: 'relative'}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <TextTranslate
          fontSize={16}
          weight="700"
          textAlign="justify"
          color={defaultColors.c_0000}
          text={textTitle}
        />
        <TextCustom
          fontSize={16}
          weight="700"
          color={defaultColors.text_EE0000}>
          *
        </TextCustom>
      </View>
      <View style={styles(textarea).styleInput}>
        {renderLeft && renderLeft()}
        <TextInput
          style={styles().inputText}
          placeholder={t(`${textPlanholder}`)}
          {...props}
        />
      </View>
      <TextError message={message} option={option} />
    </View>
  );
};
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const ContactScrren = () => {
  const dismiss = useGoBack();
  const {t} = useTranslation();
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();
  const [preview, setPreview] = useState(MOBILE_TELEPHONE_PREFIXES[0]);
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
  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles().overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles().dropdown, {top: dropdownTop}]}>
            {MOBILE_TELEPHONE_PREFIXES.map((it, idx) => {
              if (preview.country !== it.country) {
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      // handleChangeLanguage(it.key);
                      // setLanguageAction(it);
                      setPreview(it);
                      setVisible(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      columnGap: 5,
                      alignItems: 'center',
                      marginHorizontal: 9,
                      marginVertical: 6,
                    }}>
                    <Thumb
                      source={it.image}
                      resizeMode="contain"
                      style={{width: 30, height: 16, borderRadius: 5}}
                    />
                    <TextCustom>{it.telephone_prefixes}</TextCustom>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderSelectTelePhone = () => {
    return (
      <View style={{flexDirection: 'row', columnGap: 2, alignItems: 'center'}}>
        <Thumb
          source={preview.image}
          resizeMode="contain"
          style={{width: 30, height: 16, borderRadius: 5}}
        />
        <TextCustom>{preview.telephone_prefixes}</TextCustom>
        <TouchableOpacity ref={refDropdown} onPress={toggleDropdown}>
          {renderDropdown()}
          <ICDropdown />
        </TouchableOpacity>
      </View>
    );
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
          <TextInputGroup
            textTitle="contact.full-name"
            textPlanholder="contact.planhoder-full-name"
            onChangeText={handleChangeInput('fullName')}
            value={values.fullName}
            // @ts-ignore
            message={touched.fullName && errors.fullName ? errors.fullName : ''}
            option={{max: 40}}
            maxLength={40}
          />
          <TextInputGroup
            textTitle="contact.phone-number"
            textPlanholder="contact.planhoder-phone-number"
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
            renderLeft={() => {
              return (
                <View style={{paddingLeft: 10}}>
                  <RenderSelectTelePhone />
                </View>
              );
            }}
          />
          <TextInputGroup
            textTitle="contact.address"
            textPlanholder="contact.planhoder-address"
            onChangeText={handleChangeInput('address')}
            value={values.address}
            // @ts-ignore
            message={touched.address && errors.address ? errors.address : ''}
            option={{max: 100}}
            maxLength={100}
          />

          <TextInputGroup
            textTitle="contact.email"
            textPlanholder="contact.planhoder-email"
            onChangeText={handleChangeInput('email')}
            value={values.email}
            // @ts-ignore
            message={touched.email && errors.email ? errors.email : ''}
            option={{max: 256}}
            maxLength={256}
          />
          <TextInputGroup
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
            onPress={() => navigation.navigate('products')}
            text="button.see-more-product"
            borderRadius={30}
            textColor={defaultColors.bg_E60E00}
            height={38}
          />
        </View>
      </View>
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
    styleInput: {
      marginTop: 8,
      flexDirection: 'row',
      borderColor: defaultColors.text_C4C4C4,
      borderWidth: 1,
      borderRadius: textarea ? 20 : 50,
      overflow: 'hidden',
      alignItems: 'center',
      height: textarea ? 80 : 40,
    },
    inputText: {
      flex: 1,
      height: '100%',
      paddingLeft: 12,
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
