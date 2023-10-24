import {Pressable, StyleSheet, View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import React from 'react';
import TextTranslate from '../TextTranslate';
import {defaultColors} from '@configs';
import {ICCheck} from 'src/assets/icons/radio/ICCheck';
import {ICRound} from 'src/assets/icons/radio/ICRound';

export const FILTER_BY: {slug: string; name: string}[] = [
  {slug: 'id,desc', name: 'radio.new-product'},
  {slug: 'totalSoldQuantity,desc', name: 'radio.selling'},
  {slug: 'promo,desc', name: 'radio.discount'},
  {slug: 'price,asc', name: 'radio.priece-high-to-low'},
  {slug: 'price,desc', name: 'radio.priece-low-to-high'},
];
interface IProps {
  setFilterByItem: (value: string) => void;
  filterByItem: string;
}
const FilterBy = (props: IProps) => {
  const {filterByItem, setFilterByItem} = props;
  const handleSetFilter = (value: string) => {
    setFilterByItem(value);
  };
  return (
    <View style={{marginTop: 20, paddingHorizontal: 16}}>
      <TextTranslate
        color={defaultColors.text_313131}
        fontSize={14}
        weight="700"
        text="radio.rank"
        style={{}}
      />
      <View style={styles.container}>
        {FILTER_BY.map((it, idx) => {
          return (
            <Pressable
              onPress={() => {
                handleSetFilter(it.slug);
              }}
              style={styles.radioButton}>
              {filterByItem === it.slug ? <ICCheck /> : <ICRound />}
              <TextTranslate
                color={defaultColors.text_313131}
                fontSize={14}
                weight="400"
                text={it.name}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default FilterBy;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.flexWrap,
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  radioButton: {
    flexDirection: 'row',
    columnGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
