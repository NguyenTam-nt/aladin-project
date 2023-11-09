import React, {ReactElement, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  TextInputProps,
  View,
  ViewStyle,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import TextTranslate from '../TextTranslate';
import {defaultColors} from '@configs';
import {TextCustom} from '../Text';
import TextError from '../TextError';
import {Thumb} from '../Thumb/Thumb';
import {ICDropdown} from 'src/assets/icons/ICDropdown';
import {VietnamFlag, koreanFlag} from 'src/assets/image';
import {useDropdown} from 'src/hooks/useDropdown';
export type COUNTRY = 'Vietnamese' | 'Korea';
const MOBILE_TELEPHONE_PREFIXES: {
  country: COUNTRY;
  telephone_prefixes: string;
  image: any;
}[] = [
  {country: 'Vietnamese', telephone_prefixes: '+84', image: VietnamFlag},
  {country: 'Korea', telephone_prefixes: '+82', image: koreanFlag},
];

const RenderSelectTelePhone = () => {
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();

  const [preview, setPreview] = useState(MOBILE_TELEPHONE_PREFIXES[0]);

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
  return (
    <View style={{flexDirection: 'row', columnGap: 2, alignItems: 'center'}}>
      <Thumb
        source={preview.image}
        resizeMode="contain"
        style={{width: 30, height: 16, borderRadius: 5}}
      />

      <TouchableOpacity
        ref={refDropdown}
        onPress={toggleDropdown}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextCustom>{preview.telephone_prefixes}</TextCustom>
        {renderDropdown()}
        <ICDropdown />
      </TouchableOpacity>
    </View>
  );
};

type Props = {
  textTitle: string;
  textPlanholder: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  textarea?: boolean;
  message?: string;
  option?: {[key: string]: any};
  maxLength?: number;
  renderLeft?: () => React.ReactElement;
  isRequire?: boolean;
  isPhone?: boolean;
} & TextInputProps;
const TextInputComponent = (props: Props) => {
  const {
    textPlanholder,
    textTitle,
    textarea = false,
    message,
    option,
    renderLeft,
    isPhone = false,
    isRequire = true,
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
        {isRequire && (
          <TextCustom
            fontSize={16}
            weight="700"
            color={defaultColors.text_EE0000}>
            *
          </TextCustom>
        )}
      </View>
      <View style={styles(textarea).styleInput}>
        {isPhone && (
          <View style={{paddingLeft: 12}}>
            <RenderSelectTelePhone />
          </View>
        )}
        <TextInput
          style={styles().inputText}
          placeholder={t(`${textPlanholder}`)}
          placeholderTextColor={defaultColors.bg_939393}
          {...props}
        />
      </View>
      <TextError message={message ?? ''} option={option} />
    </View>
  );
};

export default TextInputComponent;

const styles = (textarea?: boolean) =>
  StyleSheet.create({
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
  });
