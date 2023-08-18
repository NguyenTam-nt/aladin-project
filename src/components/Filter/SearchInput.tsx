import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import React from 'react';
import { defaultColors } from '@configs';
import { ICSearch } from 'src/assets/icons/ICSearch';

interface ISearchInput {
  placeholder: string
  stylesContainer?: StyleProp<ViewStyle>
  stylesTextInput?: StyleProp<TextStyle>
  stylesButtonSearch?: StyleProp<ViewStyle>
  value: string
  setValue: (value: string) => void
}

const SearchInput = (props: ISearchInput) => {
  const {
    placeholder = '',
    stylesButtonSearch = {},
    stylesContainer = {},
    stylesTextInput = {},
    value = '',
    setValue,
  } = props;

  return (
    <View style={[styles.container, stylesContainer]}>
      <TextInput
        style={[styles.textInput, stylesTextInput]}
        placeholder={placeholder}
        // value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.buttonSearch, stylesButtonSearch]}>
        <ICSearch />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 224,
    height: 40,
    borderColor : defaultColors.bg_EFEFEF,
    borderWidth : 1 ,
    borderRadius : 5,
    flexDirection : 'row',
  },
  textInput : {
    flex : 1,
    marginLeft : 16,
  },
  buttonSearch : {
    height: '100%',
    width: 40,
    backgroundColor: defaultColors._EA222A,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default SearchInput;
