import { Header } from '@components';
import { defaultColors } from '@configs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ContentOrderTab from './ContentOrderTab';


const General = () => {

  return (
    <View  style={styles.container}>
      <ContentOrderTab />
    </View>
  );
};



const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderRadius: 5,
    width: 350,
    fontSize: 14,
    marginRight: 30,
  },
  container : {
    flex : 1,

  },
  placeholderStyle: {
    fontSize: 14,
    backgroundColor: defaultColors._EA222A,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: defaultColors.c_fff,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
  },
  containerStyleDropdown: {
    backgroundColor: 'tranparent',
    borderWidth: 0,
    borderColor: 'tranparent',
  },
  itemContainerStyle: {
    backgroundColor: defaultColors._33343B,
  },
});

export default General;
