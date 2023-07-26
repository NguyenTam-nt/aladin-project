import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultColors, isTabletDevice} from '@configs';
import {RadioButtonSelect} from 'src/components/Checkbox/RadioButton';
import DropDownView from 'src/components/DropDownView/DropDownView';
import {TabBarOrder} from 'src/features/orderTab/ContentOrderTab';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';

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

const TabBarLeftOrder = (props: TabBarOrder) => {
  const [typeLocation, setTypeLocaion] = useState<number>(0);
  const {isOpenTab, setIsOpenTab} = props;
  const onSetTypeLocation = useCallback(
    (value: number) => {
      if (value !== typeLocation) {
        setTypeLocaion(value);
      }
    },
    [typeLocation],
  );

  return (
    <MenuTabMobile
      isOpenTab={isOpenTab}
      setIsOpenTab={setIsOpenTab}
      content={
        <View style={styles.container}>
          <View style={styles.content}>
            {!isTabletDevice && (
              <View style={styles.buttonView}>
                <ButtonMenuTabBar onPress={setIsOpenTab} />
              </View>
            )}
            <DropDownView
              itemView={
                <View style={styles.itemViewDropDown}>
                  {dataCheckbox.map((e, index) => {
                    const isActive = typeLocation === e.value;
                    return (
                      <TouchableOpacity
                        style={styles.buttonCheckBoxDropDown}
                        activeOpacity={0.7}
                        onPress={() => {
                          onSetTypeLocation(e.value);
                        }}
                        key={index}>
                        <RadioButtonSelect
                          active={isActive}
                          color={defaultColors.c_222124}
                        />
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
            <View style={{height: 30, width: '100%'}} />
          </View>
        </View>
      }
    />
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
  textHeader2: {
    width: '78%',
    borderBottomWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    marginTop: 33,
    paddingBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 16,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  buttonView: {
    marginTop: 24,
  },
});

export default TabBarLeftOrder;
