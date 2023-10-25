import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header} from 'src/components/Header';
const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <Header children={undefined} />
      <ScrollView></ScrollView>
    </View>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({
  container: {},
});
