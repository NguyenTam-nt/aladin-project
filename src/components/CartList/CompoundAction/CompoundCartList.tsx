import { defaultColors } from '@configs';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButtonSelect } from '../../../components/Checkbox/RadioButton';
import DropdownComponent from '../../DropDownCustom/DropdownCustom';
import CompoundTable from './component/CompoundTable';
const dataItem = [
  {
    label: 'Tầng 1',
    value: '1',
    children: [
      {label: 'Bàn 1', value: 'b11'},
      {label: 'Bàn 2', value: 'b12' },
      {label: 'Bàn 3', value: 'b13' },
      {label: 'Bàn 4', value: 'b14' },
      {label: 'Bàn 5', value: 'b15' },
      {label: 'Bàn 6', value: 'b16' },
      {label: 'Bàn 7', value: 'b17' },
      {label: 'Bàn 8', value: 'b18' },
      {label: 'Bàn 9', value: 'b19' },
      {label: 'Bàn 10', value: 'b110' },
    ],
  },
  {
    label: 'Tầng 2',
    value: '2',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
  {
    label: 'Tầng 3',
    value: '3',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
  {
    label: 'Tầng 4',
    value: '4',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
  {
    label: 'Tầng 5',
    value: '5',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
  {
    label: 'Tầng 6',
    value: '6',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
  {
    label: 'Tầng 7',
    value: '7',
    children: [
      {label: 'Bàn 1', value: 'b21'},
      {label: 'Bàn 2', value: 'b22'},
    ],
  },
];
  interface IDataSelection {
    label: string
    value: any

  }

 export interface IDataSelectionCustom  {
    label: string
    value: any
    children ? : IDataSelection[]
    parentId?: number
  }

const CompoundCartList = () => {


  const [isCompound , setIsCompound] = useState<boolean>(true);
  const [table, setTable] = useState<IDataSelectionCustom>(dataItem[0]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            setIsCompound(true);
          }}>
          <RadioButtonSelect active={isCompound} />
          <Text style={styles.textButton}>Ghép đơn</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            setIsCompound(false);
          }}>
          <RadioButtonSelect active={!isCompound} />
          <Text style={styles.textButton}>Tách đơn</Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.textCompound}>Ghép đến</Text>
      <DropdownComponent
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{fontSize: 14, color: defaultColors.c_fff}}
        containerStyle={styles.containerStyleDropdown}
        itemContainerStyle={styles.itemContainerStyle}
        data={dataItem}
        backgroundColor={defaultColors._33343B}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn bàn"
        activeColor={defaultColors._EA222A}
        showsVerticalScrollIndicator={false}
        value={table}
        onChange={e => {
          setTable(e);
        }}
      />
      <CompoundTable />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex :1,
  } ,
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  textCompound: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: '600',
    marginTop : 25,
  },
  button: {
    flexDirection: 'row',
    marginRight: 16,
  },
  textButton: {
    color: defaultColors.c_fff,
    fontSize: 14,
    marginLeft: 8,
  },

  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: defaultColors._DBDBDB,
    borderRadius: 5,
    width: '50%',
    fontSize: 14,
    marginTop : 8,
  },
  placeholderStyle: {
    fontSize: 14,
    backgroundColor :  defaultColors._EA222A,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 16,
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
  itemContainerStyle : {
    backgroundColor: defaultColors._33343B,
  },

});

export default CompoundCartList;
