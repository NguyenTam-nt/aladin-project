import { defaultColors, isTabletDevice } from '@configs';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RadioButtonSelect } from 'src/components/Checkbox/RadioButton';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import { TabBarOrder } from 'src/features/orderTab/ContentOrderTab';
import { TextCustom } from '@components';
import { globalStyles } from 'src/commons/globalStyles';
import { ICCalendar } from 'src/assets/icons/ICLogo copy';
import { Calendar } from '../../Detail/components/Calendar';

export enum ReportTimeState {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTERLY = 'QUARTERLY',
  YEAR = 'YEAR',
  DATE = 'DATE',
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
  {
    label: 'Năm',
    value: ReportTimeState.YEAR,
  },
];

export interface ITabBarLeftOrder {
  setTypeLocaion: React.Dispatch<React.SetStateAction<ReportTimeState>>
  typeLocation: ReportTimeState
  setStartDate?: (value: string) => void
  setEndDate?: (value: string) => void
}

const TabBarLeftOrder = (props: ITabBarLeftOrder & TabBarOrder) => {
  const {
    isOpenTab,
    setIsOpenTab,
    typeLocation,
    setTypeLocaion,
    setStartDate,
    setEndDate,
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
                typeLocation={typeLocation}
                onChange={onSetTypeLocation}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </View>
            <View style={{height: 30, width: '100%'}} />
          </View>
        </View>
      }
    />
  );
};

const FilterCalendar = memo(
  ({
    onChange,
    typeLocation,
    setEndDate ,
    setStartDate,
  }: {
    typeLocation: ReportTimeState
    onChange: (value: ReportTimeState) => void

    setStartDate?: (value: string) => void
    setEndDate?: (value: string) => void
  }) => {
    const [isShow, setShow] = useState(false);
    const handleChange = useCallback(() => {
      onChange(ReportTimeState.DATE);
    }, [onChange]);
    const handleShow = () => {
      onChange(ReportTimeState.DATE);
      setShow(!isShow);
    };
    const styleCalendar = useMemo(() => {
      return {...styles.styleBoxCalendar, display: isShow ? 'flex' : 'none'};
    }, [isShow]);

    return (
      <View style={styles.positionRelative}>
        <View style={styles.styleFilterDate}>
          <Pressable onPress={handleChange} style={styles.sideLeftCalendar}>
            <RadioButtonSelect
              color={defaultColors.c_0000}
              active={typeLocation === ReportTimeState.DATE}
            />
            <TextCustom
              fontSize={14}
              color={defaultColors.c_222124}
              weight="400">
              Khoảng ngày
            </TextCustom>
          </Pressable>
          <Pressable onPress={handleShow}>
            <ICCalendar />
          </Pressable>
        </View>
        <View style={[styles.styleBoxCalendar, styleCalendar]}>
          <Calendar setEndDate={setEndDate} setStartDate={setStartDate} />
        </View>
      </View>
    );
  },
);

type PropsSideLeftFilterDate = {
  data: {
    slug: string
    name: string
  }
  onChange: (category: string) => void
  isActive: boolean
}

export const SideLeftFilterDate = memo(
  ({data, onChange, isActive}: PropsSideLeftFilterDate) => {
    const handleChange = () => {
      onChange(data.slug);
    };
    return (
      <Pressable onPress={handleChange} style={styles.sideLeft}>
        <RadioButtonSelect color={defaultColors.c_0000} active={isActive} />
        <TextCustom fontSize={14} color={defaultColors.c_222124} weight="400">
          {data.name}
        </TextCustom>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: 226,
    backgroundColor: defaultColors.bg_FAFAFA,
    height: '100%',
    position: 'relative',
    zIndex: 100,

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
  sideLeft: {
    ...globalStyles.row,
    columnGap: 8,
    paddingTop: 16,
  },
  styleBoxCalendar: {
    position: 'absolute',
    top: '110%',
    left: 0,
    transform: [
      {
        translateY: 17,
      },
    ],
  },
  positionRelative: {
    position: 'relative',
    zIndex: 9999,
  },
  styleFilterDate: {
    ...globalStyles.row,
    ...globalStyles.justifyContentBetween,
    ...globalStyles.alignItemsCenter,
    paddingTop: 16,
  },
  sideLeftCalendar: {
    ...globalStyles.row,
    columnGap: 8,
  },
});

export default TabBarLeftOrder;
