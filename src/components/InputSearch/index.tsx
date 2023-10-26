import {
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

type Props = {
  containerStyle?: ViewStyle[] | ViewStyle;
} & TextInputProps;

const InputSearch = ({containerStyle, ...props}: Props) => {
  const {t} = useTranslation();
  const modalEditInventory = useModal();
  const [keywork, setKeywork] = useState<string>('');

  const handleSearch = () => {
    if (keywork) {
      modalEditInventory.handleShow();
    }
  };
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      <TextInput
        style={styles.inputText}
        placeholder={t('common.search')}
        placeholderTextColor={defaultColors.text_313131}
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
    flexDirection: 'row',
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    height: '100%',
    paddingLeft: 12,
  },
  viewIcon: {
    width: 32,
    height: '100%',
    paddingRight: 12,
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
