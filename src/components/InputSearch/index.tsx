import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {ICSearch} from 'src/assets/icons/ICSearch';
import {useTranslation} from 'react-i18next';

type Props = {
  containerStyle?: ViewStyle[] | ViewStyle;
} & TextInputProps;

const InputSearch = ({containerStyle, ...props}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, StyleSheet.flatten(containerStyle)]}>
      <TextInput
        style={styles.inputText}
        placeholder={t('common.search')}
        {...props}
      />
      <View style={styles.viewIcon}>
        <ICSearch />
      </View>
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
});
