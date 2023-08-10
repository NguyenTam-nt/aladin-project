import { defaultColors, isTabletDevice } from '@configs';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import DropDownFilter from 'src/components/Filter/DropDownFilter';
import SearchInput from 'src/components/Filter/SearchInput';
import { TabBarOrder } from '../ContentOrderTab';
import { IValueFilter } from './ContentRightOrder';

interface HeaderContentRight {
  dataItem: IValueFilter[]
  dataItem2: IValueFilter[]
  valueField1: IValueFilter
  valueField2: IValueFilter
  setValueField1: React.Dispatch<React.SetStateAction<IValueFilter>>
  setValueField2: React.Dispatch<React.SetStateAction<IValueFilter>>

}

const HeaderContentRight = (props: HeaderContentRight & TabBarOrder) => {
  const {
    setIsOpenTab,
    dataItem,
    dataItem2,
    valueField1,
    valueField2,
    setValueField1,
    setValueField2,
  } = props;
  const [valueSearch, setValueSearch] = useState<string>('');

  return (
    <View
      style={[
        styles.container,
        !isTabletDevice ? styles.containerMobile : undefined,
      ]}>
      {!isTabletDevice && (
        <View>
          <ButtonMenuTabBar onPress={setIsOpenTab} />
        </View>
      )}

      <Text style={styles.textHeader}>Món ăn</Text>
      <View style={styles.contentRight}>
        <SearchInput
          placeholder="Theo mã/tên món ăn"
          value={valueSearch}
          setValue={setValueSearch}
          stylesContainer={{maxWidth: '70%'}}
        />
        <DropDownFilter
          dataItem={dataItem}
          labelField="label"
          valueField="value"
          value={valueField1}
          setValue={setValueField1}
          placeholder="Lọc sản phẩm"
        />
        <DropDownFilter
          dataItem={dataItem2}
          labelField="label"
          valueField="value"
          value={valueField2}
          setValue={setValueField2}
          placeholder="Sắp xếp"
          styleDropdown={{width: 160}}
          isSort
        />
      </View>
    </View>
  );
};

export default HeaderContentRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentRight: {
    gap: 20,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  containerMobile : {
    flexDirection: 'column' , gap : 24,
  },
});
