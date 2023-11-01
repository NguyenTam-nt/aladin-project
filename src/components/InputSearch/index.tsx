import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {defaultColors} from '@configs';
import {ICSearch} from 'src/assets/icons/ICSearch';
import {useTranslation} from 'react-i18next';
import ModalCustom from '../ModalCustom';
import SearchScreen from 'src/features/SearchScreen';
import {useModal} from 'src/hooks/useModal';
import {DIMENSION} from '@constants';
import {TextCustom} from '../Text';

type Props = {
  containerStyle?: ViewStyle[] | ViewStyle;
  isProductScreen?: boolean;
  textPlanhoder?: string;
} & TextInputProps;

const InputSearch = ({
  containerStyle,
  isProductScreen = false,
  textPlanhoder = 'common.search',
  ...props
}: Props) => {
  const {t} = useTranslation();
  const modalEditInventory = useModal();
  const [keywork, setKeywork] = useState<string>('');

  const handleSearch = () => {
    if (keywork) {
      modalEditInventory.handleShow();
    }
  };
  return (
    <View
      style={[
        styles.container,
        isProductScreen && {
          backgroundColor: defaultColors.bg_DAF1E7,
          shadowColor: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      ]}>
      <TextInput
        style={styles.inputText}
        placeholder={t(textPlanhoder)}
        placeholderTextColor={
          isProductScreen
            ? defaultColors.text_C4C4C4
            : defaultColors.text_626262
        }
        onChangeText={setKeywork}
        value={keywork}
        {...props}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.viewIcon}>
        <ICSearch />
      </TouchableOpacity>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <SearchScreen
            dismiss={modalEditInventory.handleHidden}
            keyWorkHeader={keywork}
          />
        </View>
      </ModalCustom>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: defaultColors.c_fff,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    height:  45,
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    width: 32,
  },
  modalEdit: {
    position: 'relative',
    height: DIMENSION.height,
    width: DIMENSION.width,
    backgroundColor: defaultColors.bg_EFEFEF,
    borderRadius: 10,
    padding: 24,
    // marginHorizontal: 20,
    // alignItems: 'center',
  },
});
