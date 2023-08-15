import { defaultColors, isTabletDevice } from '@configs';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButtonSelect } from 'src/components/Checkbox/RadioButton';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import { TabBarOrder } from 'src/features/orderTab/ContentOrderTab';
import { FilterCalendar } from '../../Detail/components/SideLeft';

export enum ReportTimeState {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTERLY = 'QUARTERLY',
  YEAR = 'YEAR',
  DATE = 'DATe',
}

const dataCheckbox = [
  {
    label: 'Hôm nay',
    value: ReportTimeState.TODAY,
  },
  {
    label: 'Tuần',
    value: ReportTimeState.WEEK,
  },
  {
    label: 'Tháng',
    value: ReportTimeState.MONTH,
  },
];

export interface ITabBarLeftOrder {
  setTypeLocaion: React.Dispatch<React.SetStateAction<ReportTimeState>>
  typeLocation: ReportTimeState
  currenFilter: string
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>
}

const TabBarLeftOrder = (props: ITabBarLeftOrder & TabBarOrder) => {
  const {
    isOpenTab,
    setIsOpenTab,
    typeLocation,
    setTypeLocaion,
    currenFilter,
    setCurrentFilter,
  } = props;

  const onSetTypeLocation = useCallback(
    (value: ReportTimeState) => {
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
              <FilterCalendar
                currenFilter={currenFilter}
                onChange={setCurrentFilter}
              />
            </View>
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
