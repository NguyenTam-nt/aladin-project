import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
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
} & TextInputProps;

const InputSearch = ({containerStyle, ...props}: Props) => {
  const {t} = useTranslation();
  const modalEditInventory = useModal();
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      <TextInput
        style={styles.inputText}
        placeholder={t('common.search')}
        {...props}
      />
      <TouchableOpacity
        onPress={modalEditInventory.handleShow}
        style={styles.viewIcon}>
        <ICSearch />
      </TouchableOpacity>
      <ModalCustom
        onBackdropPress={modalEditInventory.handleHidden}
        ref={modalEditInventory.refModal}>
        <View style={styles.modalEdit}>
          <SearchScreen dismiss={modalEditInventory.handleHidden} />
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
