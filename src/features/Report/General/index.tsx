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
  container: {
    flex: 1,
  },
});

export default General;
