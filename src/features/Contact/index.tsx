import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
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
type Props = {
  textTitle: string;
  textPlanholder: string;
  containerStyle?: ViewStyle[] | ViewStyle;
} & TextInputProps;

const TextInputGroup = (props: Props) => {
  const {textPlanholder, textTitle} = props;
  const {t} = useTranslation();
  return (
    <View>
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
      <View style={styles.styleInput}>
        <TextInput
          style={styles.inputText}
          placeholder={t(`${textPlanholder}`)}
          {...props}
        />
      </View>
    </View>
  );
};
const ContactScrren = () => {
  const dismiss = useGoBack();
  return (
    <View style={styles.container}>
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
        <View style={{marginTop: 20, flexDirection: 'column', rowGap: 14}}>
          <TextInputGroup
            textTitle="contact.full-name"
            textPlanholder="contact.planhoder-full-name"
          />

          <TextInputGroup
            textTitle="contact.phone-number"
            textPlanholder="contact.planhoder-phone-number"
          />

          <TextInputGroup
            textTitle="contact.address"
            textPlanholder="contact.planhoder-address"
          />

          <TextInputGroup
            textTitle="contact.email"
            textPlanholder="contact.planhoder-email"
          />
        </View>
      </View>
    </View>
  );
};

export default ContactScrren;
const styles = StyleSheet.create({
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
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    height: 40,
  },
  inputText: {
    flex: 1,
    height: '100%',
    paddingLeft: 12,
  },
});
