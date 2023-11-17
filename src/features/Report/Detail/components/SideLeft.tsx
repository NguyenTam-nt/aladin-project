import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {ICDown} from 'src/assets/icons/ICDown';
import {RadioButtonSelect} from 'src/components/Checkbox/RadioButton';
import {globalStyles} from 'src/commons/globalStyles';
import {ICCalendar} from 'src/assets/icons/ICLogo copy';
import {Calendar} from './Calendar';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import {MultipleScreenView} from 'src/components/MultipleScreenView';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import {ReportTimeState} from '../../General/components/TabBarLeftOrder';

const filterDate = [
  {
    slug: ReportTimeState.TODAY,
    name: 'Hôm nay',
  },
  {
    slug: ReportTimeState.WEEK,
    name: '7 ngày vừa qua',
  },
  {
    slug: ReportTimeState.MONTH,
    name: 'Tháng này',
  },
  {
    slug: ReportTimeState.QUARTERLY,
    name: 'Quý này',
  },
  {
    slug: ReportTimeState.YEAR,
    name: 'Năm này',
  },
];

type Props = {
  currenFilter: ReportTimeState
  onChange: (currentFilter: ReportTimeState) => void
  isOpenTab: boolean
  setIsOpenTab: React.Dispatch<React.SetStateAction<boolean>>
  setStartDate?: (value: string) => void
  setEndDate?: (value: string) => void
};

export const SideLeft = memo(
  ({
    currenFilter,
    onChange,
    isOpenTab,
    setIsOpenTab,
    setStartDate,
    setEndDate,
  }: Props) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const toggleOpen = () => {
      // onPress?.()
      setIsOpen(value => !value);
    };
    const styleGroupFilter = useMemo((): StyleProp<ViewStyle> => {
      return {
        display: isOpen ? 'flex' : 'none',
      };
    }, [isOpen]);

    return (
      <MenuTabMobile
        isOpenTab={isOpenTab}
        setIsOpenTab={setIsOpenTab}
        content={
          <View style={styles.container}>
            <MultipleScreenView
              phoneView={
                <View style={styles.buttonView}>
                  <ButtonMenuTabBar onPress={setIsOpenTab} />
                </View>
              }
            />
            <View>
              <TouchableOpacity
                onPress={toggleOpen}
                style={styles.filterFilter}>
                <TextCustom color={defaultColors.c_222124}>
                  Thời gian
                </TextCustom>
                <View>
                  <ICDown color={defaultColors.c_222124} />
                </View>
              </TouchableOpacity>
              <View style={styleGroupFilter}>
                {filterDate.map((item, index) => {
                  return (
                    <SideLeftFilterDate
                      data={item}
                      onChange={onChange}
                      isActive={item.slug === currenFilter}
                      key={index}
                    />
                  );
                })}
                <FilterCalendar
                  currenFilter={currenFilter}
                  onChange={onChange}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                />
              </View>
            </View>
          </View>
        }
      />
    );
  },
);

export const FilterCalendar = memo(
  ({
    currenFilter,
    onChange,
    setStartDate,
    setEndDate,
  }: {
    currenFilter: ReportTimeState
    onChange: (category: ReportTimeState) => void
    setStartDate?: (value: string) => void
    setEndDate?: (value: string) => void
  }) => {
    const [isShow, setShow] = useState(false);
    const handleChange = useCallback(() => {
      onChange(ReportTimeState.DATE);
    }, [onChange]);

    const handleShow = () => {
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
              active={currenFilter === ReportTimeState.DATE}
            />
            <TextCustom
              fontSize={14}
              color={defaultColors.c_222124}
              weight="400">
              Khoảng cách
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
    slug: ReportTimeState
    name: string
  }
  onChange: (category: ReportTimeState) => void
  isActive: boolean
};

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
    width: 248,
    padding: 24,
    backgroundColor: defaultColors.bg_FAFAFA,
    height: '100%',
  },
  sideLeft: {
    ...globalStyles.row,
    columnGap: 8,
    paddingTop: 16,
  },
  sideLeftCalendar: {
    ...globalStyles.row,
    columnGap: 8,
  },
  filterFilter: {
    ...globalStyles.row,
    ...globalStyles.justifyContentBetween,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
  },
  styleFilterDate: {
    ...globalStyles.row,
    ...globalStyles.justifyContentBetween,
    ...globalStyles.alignItemsCenter,
    paddingTop: 16,
  },
  styleBoxCalendar: {
    position: 'absolute',
    zIndex: 10,
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
  h_0: {
    height: 0,
  },
  buttonView: {
    marginBottom: 24,
  },
});