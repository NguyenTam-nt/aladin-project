import { defaultColors, isTabletDevice } from '@configs';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ICDown } from 'src/assets/icons/ICDown';
import { ICSort } from 'src/assets/icons/ICSort';
import DropdownComponent from '../DropDownCustom/DropdownCustom';
import { ICFilter } from 'src/assets/icons/ICFilter';
import { getValueForDevice } from 'src/commons/formatMoney';

interface IDropDownFilter {
  dataItem: any
  labelField: string
  valueField: string
  value: any
  setValue: (value: any) => void
  placeholder: string
  styleDropdown?: StyleProp<ViewStyle>
  isSort?: boolean
  leftPosition? : boolean
}

const DropDownFilter = (props: IDropDownFilter) => {
  const {
    dataItem,
    labelField,
    value,
    valueField,
    setValue,
    placeholder = '',
    styleDropdown = {},
    isSort,
    leftPosition = !isTabletDevice,
  } = props;

  const renderRight = () => {
    return (
      <View style={styles.iconRight}>
        <ICDown color={defaultColors.bg_A1A0A3} />
      </View>
    );
  };

  const renderLeft = () => {
    return (
      <View style={styles.iconLeft}>{isSort ? <ICSort /> : <ICFilter />}</View>
    );
  };

  return (
    <View>
      <DropdownComponent
        style={[styles.dropdown, styleDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{fontSize: 14, color: defaultColors.c_fff}}
        containerStyle={styles.containerStyleDropdown}
        itemContainerStyle={styles.itemContainerStyle}
        data={dataItem}
        isChildren={false}
        maxHeight={300}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        activeColor={defaultColors._EA222A}
        showsVerticalScrollIndicator={false}
        value={value}
        onChange={e => {
          setValue(e);
        }}
        leftPosition={leftPosition}
        renderRightIcon={renderRight}
        renderLeftIcon={renderLeft}
        isFilter
        minWidth={250}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderRadius: 5,
    fontSize: 14,
    borderWidth: 1,
    borderColor: defaultColors.bg_A1A0A3,
    width: 183,
  },
  placeholderStyle: {
    fontSize: 14,
    color: defaultColors.bg_A1A0A3,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: defaultColors.bg_A1A0A3,
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
  iconLeft: {
    marginLeft: getValueForDevice(16 , 6) ,
  },
  iconRight: {
    marginRight: 5,
  },
});

export default DropDownFilter;
