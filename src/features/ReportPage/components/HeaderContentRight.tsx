import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {defaultColors} from '@configs';
import SearchInput from 'src/components/Filter/SearchInput';
import DropDownFilter from 'src/components/Filter/DropDownFilter';
const dataItem = [
  {
    label: 'Tất cả',
    value: '1',
  },
  {
    label: 'Sản phẩm 1',
    value: '2',
  },
  {
    label: 'Sản phẩm 2',
    value: '3',
  },
  {
    label: 'Sản phẩm 3',
    value: '4',
  },
];
const dataItem2 = [
  {
    label: 'Tất cả',
    value: '1',
  },
  {
    label: 'Thời gian',
    value: '2',
  },
  {
    label: 'Số lượng',
    value: '3',
  },
];

const HeaderContentRight = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [valueField1, setValueField1] = useState<any>(dataItem[1]);
  const [valueField2, setValueField2] = useState<any>(dataItem2[1]);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Món ăn</Text>
      <View style={styles.contentRight}>
        <SearchInput
          placeholder="Theo mã/tên món ăn"
          value={valueSearch}
          setValue={setValueSearch}
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
          styleDropdown={{width: 146}}
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
});
