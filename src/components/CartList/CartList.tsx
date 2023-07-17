import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ICTagFloor} from '@icons';
import { defaultColors } from '@configs';
import { ICCloseModal } from '../../assets/icons/ICCloseModal';
import ActionCartList from './ActionCartList';
import TableCartList from './TableCartList';

const CartList = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.contentHeader}>
            <ICTagFloor />
            <Text style={styles.textTitle}>Danh sách đã chọn</Text>
          </View>
          <TouchableOpacity style={styles.buttonClose}>
            <ICCloseModal />
          </TouchableOpacity>
        </View>
        <ActionCartList />
        <TableCartList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  textTitle: {
    color: defaultColors.c_fff,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonClose: {
    padding: 16,
  },
});
export default CartList;
