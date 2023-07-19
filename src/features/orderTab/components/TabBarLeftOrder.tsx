import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {defaultColors} from '@configs';
import CheckBox from 'src/components/Checkbox/CheckBox';
import DropDownView from 'src/components/DropDownView/DropDownView';

const dataCheckbox = [
  {
    label: 'Bếp',
    value: 1,
  },
  {
    label: 'Bar',
    value: 2,
  },
];
const dataCheckBox2 = [
  {
    label: 'Lẩu đơn',
    value: 1,
  },
  {
    label: 'Lẩu 2 ngăn',
    value: 2,
  },
  {
    label: 'Lẩu 4 ngăn',
    value: 3,
  },
];
const dataCheckBox3 = [

];

const TabBarLeftOrder = () => {
  const [typeLocation, setTypeLocaion] = useState<number[]>([]);
  const [typeHotPot, setTypeHotPot] = useState<number[]>([]);
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
  const onSetTypeHotPot = useCallback(
    (value: number) => {
      const index = typeHotPot.findIndex(type => {
        return type === value;
      });

      const checkType = [...typeHotPot];
      if (index >= 0) {
        delete checkType[index];
        setTypeHotPot(checkType);
      } else {
        checkType.push(value);
        setTypeHotPot(checkType);
      }
    },
    [typeHotPot],
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
                    <CheckBox active={isActive ? true : false} />
                    <Text style={styles.labelTextDropDown}>{e.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          containerStyle={styles.containerStyleDropdown}
          textHeader="Loại thực đơn"
          textStyle={styles.textStyle}
          headerButtonStyle={styles.headerButtonStyleDropDown}
          isOpen={true}
        />
        <View style={styles.textHeader2}>
          <Text style={styles.textStyle}>Danh mục</Text>
        </View>
        <DropDownView
          itemView={
            <View style={styles.itemViewDropDown}>
              {dataCheckBox2.map(e => {
                const isActive = typeHotPot.find(type => {
                  return type === e.value;
                });
                return (
                  <TouchableOpacity
                    style={styles.buttonCheckBoxDropDown}
                    activeOpacity={0.7}
                    onPress={() => {
                      onSetTypeHotPot(e.value);
                    }}>
                    <Text
                      style={[
                        styles.labelTextDropDown2,
                        isActive ? {color: defaultColors._074A20} : undefined,
                      ]}>
                      {e.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
          containerStyle={styles.containerStyleDropdown}
          textHeader="Lẩu"
          textStyle={styles.textStyleDropDown2}
          headerButtonStyle={styles.headerButtonStyleDropDown}
          isOpen={true}
        />
        <DropDownView
          itemView={
            <View style={styles.itemViewDropDown}>
              {dataCheckBox3.length > 0 ? (
                dataCheckBox2.map(e => {
                  const isActive = typeHotPot.find(type => {
                    return type === e.value;
                  });
                  return (
                    <TouchableOpacity
                      style={styles.buttonCheckBoxDropDown}
                      activeOpacity={0.7}
                      onPress={() => {
                        onSetTypeHotPot(e.value);
                      }}>
                      <Text
                        style={[
                          styles.labelTextDropDown2,
                          isActive ? {color: defaultColors._074A20} : undefined,
                        ]}>
                        {e.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text style={styles.emptyText}>Món không có danh mục con</Text>
              )}
            </View>
          }
          containerStyle={styles.containerStyleDropdown}
          textHeader="Món khác"
          textStyle={styles.textStyleDropDown2}
          headerButtonStyle={styles.headerButtonStyleDropDown}
          isOpen={true}
        />
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
