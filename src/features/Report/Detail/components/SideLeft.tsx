import {View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {ICDown} from 'src/assets/icons/ICDown';
import {RadioButtonSelect} from 'src/components/Checkbox/RadioButton';
import {globalStyles} from 'src/commons/globalStyles';
import {ICCalendar} from 'src/assets/icons/ICLogo copy';
import {Calendar} from './Calendar';

const filterDate = [
  {
    slug: 'home-nay',
    name: 'Hôm nay',
  },
  {
    slug: '7-ngay-vua-qua',
    name: '7 ngày vừa qua',
  },
  {
    slug: 'thang-nay',
    name: 'Thánh này',
  },
  {
    slug: 'quy-nay',
    name: 'Quý này',
  },
  {
    slug: 'nam-nay',
    name: 'Năm này',
  },
];

type Props = {
  currenFilter: string
  onChange: (currentFilter: string) => void
};

export const SideLeft = memo(({currenFilter, onChange}: Props) => {
  return (
    <View
      style={{
        width: 248,
        padding: 24,
        backgroundColor: defaultColors.bg_FAFAFA,
        height: '100%',
      }}>
      <View>
        <TouchableOpacity style={styles.filterFilter}>
          <TextCustom>Thời gian</TextCustom>
          <View>
            <ICDown color={defaultColors.c_222124} />
          </View>
        </TouchableOpacity>
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
        <FilterCalendar currenFilter={currenFilter} onChange={onChange} />
      </View>
    </View>
  );
});

const FilterCalendar = memo(
  ({
    currenFilter,
    onChange,
  }: {
    currenFilter: string
    onChange: (category: string) => void
  }) => {
    const [isShow, setShow] = useState(false);
    const handleChange = useCallback(() => {
      onChange('distance_date');
    }, [onChange]);

    const handleShow = () => {
      setShow(!isShow);
    };

    return (
      <View style={styles.positionRelative}>
        <View style={styles.styleFilterDate}>
          <Pressable onPress={handleChange} style={styles.sideLeftCalendar}>
            <RadioButtonSelect
              color={defaultColors.c_0000}
              active={currenFilter === 'distance_date'}
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
        {isShow ? (
          <View style={styles.styleBoxCalendar}>
            <Calendar />
          </View>
        ) : null}
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
  },
});
