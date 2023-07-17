import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ICTagFloor} from '@icons';
import {defaultColors} from '@configs';
import {ICCloseModal} from '../../assets/icons/ICCloseModal';
import TableListOfFood from './TableListOfFood';

const ListOfFood = React.memo(
  ({hiddenViewList}: {hiddenViewList: () => void}) => {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.contentHeader}>
            <ICTagFloor />
            <Text style={styles.textTitle}>
              Danh sách thời gian nấu các món ăn
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonClose} onPress={hiddenViewList}>
            <ICCloseModal />
          </TouchableOpacity>
        </View>
        <TableListOfFood />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
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
    flex: 1,
  },
  buttonClose: {
    padding: 16,
  },
});
export default ListOfFood;
