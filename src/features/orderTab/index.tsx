import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@components';
import DropdownComponent from '../../components/DropDownCustom/DropdownCustom';
import {defaultColors, isTabletDevice} from '@configs';
import {IDataSelectionCustom} from '../../components/CartList/CompoundAction/CompoundCartList';
import {ICDownList} from '../../assets/icons/ICDownList';
import ContentOrderTab from './ContentOrderTab';
const dataItem = [
  {
    label: 'Cơ sở 1 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '1',
  },
  {
    label: 'Cơ sở 2 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '2',
  },
  {
    label: 'Cơ sở 3 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '3',
  },
  {
    label: 'Cơ sở 4 - 102 Trường Trinh, Phương Mai, Hà Nội',
    value: '4',
  },
];

const OrderTabView = () => {
  const [location, setLocation] = useState<IDataSelectionCustom>(dataItem[0]);
  return (
    <View style={styles.container}>
      <Header
        renderRight={
          isTabletDevice ? (
            <RightHeader location={location} setLocation={setLocation} />
          ) : (
            <></>
          )
        }
      />
      <ContentOrderTab />
    </View>
  );
};

export const RightHeader = React.memo(
  ({
    location,
    setLocation,
  }: {
    location: IDataSelectionCustom
    setLocation: React.Dispatch<React.SetStateAction<IDataSelectionCustom>>
  }) => {
    return (
      <View>
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
          isChildren={false}
          // backgroundColor={defaultColors._33343B}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Chọn bàn"
          activeColor={defaultColors._EA222A}
          showsVerticalScrollIndicator={false}
          value={location}
          onChange={e => {
            setLocation(e);
          }}
          renderRightIcon={() => <ICDownList />}
        />
      </View>
    );
  },
);

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

export default OrderTabView;
