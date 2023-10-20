import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IAttributeFeValues} from 'src/api/products';
import {globalStyles} from 'src/commons/globalStyles';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import useI18n from 'src/hooks/useI18n';
interface IProps {
  nameAttribute: string;
  attributeFeValues: IAttributeFeValues[];
  handleClick: (keySelected: string, atb: any) => void;
  selected: {key: any; name: any}[];
  keySelected: string;
  actionKey: {key: any; name: any};
}
const SelectedPicker = (props: IProps) => {
  const {
    nameAttribute,
    attributeFeValues,
    handleClick,
    selected,
    keySelected,
    actionKey,
  } = props;
  const {isVn} = useI18n();
  const handleChoose = (name: string) => {
    handleClick(keySelected, name);
  };
  return (
    <View style={styles.container}>
      <TextCustom fontSize={14} weight="400" color={defaultColors.c_0000}>
        {nameAttribute}:
      </TextCustom>
      <View style={styles.attributeGroup}>
        {(attributeFeValues ?? []).map((it, idx) => {
          return (
            <ButtonTouchable
              key={idx}
              onPress={() => handleChoose(`${it.valueVn}_name`)}
              textCustom={isVn ? it.valueVn : it.valueKr}
              weight="400"
              height={30}
              borderRadius={4}
              isAction={actionKey?.name === `${it.valueVn}_name`}
            />
            // <></>
          );
        })}
      </View>
    </View>
  );
};
export default SelectedPicker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 12,
  },
  attributeGroup: {
    ...globalStyles.flexWrap,
    flexDirection: 'row',
    gap: 8,
    paddingRight: 10,
  },
});
