import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {defaultColors} from '@configs';
import CheckBox from 'src/components/Checkbox/CheckBox';
import DropDownView from 'src/components/DropDownView/DropDownView';
import { RadioButtonSelect } from 'src/components/Checkbox/RadioButton';

const dataCheckbox = [
  {
    label: 'Hôm nay',
    value: 1,
  },
  {
    label: 'Tuần',
    value: 2,
  },
  {
    label: 'Tháng',
    value: 3,
  },
  {
    label: 'Năm',
    value: 4,
  },
];


const TabBarLeftOrder = () => {
  const [typeLocation, setTypeLocaion] = useState<number[]>([]);

  const onSetTypeLocation = useCallback(
    (value: number) => {
      const index = typeLocation.findIndex(type => {
        return type === value;
      });

      const checkType = [...typeLocation];
      if (index >= 0) {
        delete checkType[index];
        setTypeLocaion(checkType);
      } else {
        checkType.push(value);
        setTypeLocaion(checkType);
      }
    },
    [typeLocation],
  );


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DropDownView
          itemView={
            <View style={styles.itemViewDropDown}>
              {dataCheckbox.map(e => {
                const isActive = typeLocation.find(type => {
                  return type === e.value;
                });
                return (
                  <TouchableOpacity
                    style={styles.buttonCheckBoxDropDown}
                    activeOpacity={0.7}
                    onPress={() => {
                      onSetTypeLocation(e.value);
                    }}>
                    <RadioButtonSelect active={isActive ? true : false} />
                    <Text style={styles.labelTextDropDown}>{e.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          containerStyle={styles.containerStyleDropdown}
          textHeader="Thời gian"
          textStyle={styles.textStyle}
          headerButtonStyle={styles.headerButtonStyleDropDown}
          isOpen={true}
        />
        <View style={{ height : 30 , width : '100%'}} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 226,
    backgroundColor: defaultColors.bg_FAFAFA,
    height: '100%',
  },
  content: {
    marginLeft: 24,
  },
  textStyle: {
    color: defaultColors._EA222A,
    fontSize: 16,
    fontWeight: '600',
  },
  textStyleDropDown2: {
    color: defaultColors.c_222124,
    fontSize: 16,
    fontWeight: '600',
  },
  containerStyleDropdown: {
    marginTop: 24,
  },
  headerButtonStyleDropDown: {
    width: '78%',
    borderBottomWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    alignItems: 'center',
  },
  itemViewDropDown: {},
  buttonCheckBoxDropDown: {
    flexDirection: 'row',
    marginTop: 16,
  },
  labelTextDropDown: {
    marginLeft: 8,
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  labelTextDropDown2: {
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  textHeader2 : {
    width: '78%',
    borderBottomWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    marginTop: 33,
    paddingBottom: 16,
  },
  emptyText : {
   fontSize : 14 ,
   marginTop : 16,
   fontWeight : 'bold',
   color : defaultColors.c_222124,
  },
});

export default TabBarLeftOrder;
