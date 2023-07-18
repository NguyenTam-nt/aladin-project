import {defaultColors, isTabletDevice} from '@configs';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ICAdd} from '../../assets/icons/ICAdd';
import {ICCompound} from '../../assets/icons/ICCompound';
import {ICDelete} from '../../assets/icons/ICDelete';
import {ICSentToKitchen} from '../../assets/icons/ICSentToKitchen';
import { ActionCartListChoose } from './CartList';

const ActionCartList = ({
  setActionChoose,
}: {
  setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>>
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonSent}>
        <ICSentToKitchen />
        <Text style={styles.textButton}>Chuyển tới bếp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAddnew}>
        <ICAdd />
        <Text style={styles.textButton}>Gọi thêm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCancel}>
        <ICDelete />
        <Text style={styles.textButton}>Hủy món</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCompound} onPress={() => {setActionChoose(ActionCartListChoose.compound);}}>
        <ICCompound />
        <Text style={styles.textButton}>Tách / Ghép</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    flexWrap: 'wrap',
  },
  buttonSent: {
    height: 40,
    backgroundColor: defaultColors._EA222A,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonAddnew: {
    height: 40,
    backgroundColor: defaultColors._01A63E,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCancel: {
    height: 40,
    backgroundColor: defaultColors._33343B,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonCompound: {
    height: 40,
    backgroundColor: defaultColors._0073E5,
    width: isTabletDevice ? '24%' : '48%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.c_fff,
    marginLeft: 10,
  },
});

export default ActionCartList;
