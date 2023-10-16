import {StyleSheet,  View} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '../Text';
import TextTranslate from '../TextTranslate';
import {useListItemProvice} from 'src/redux/provices/hooks';


const CityFilter = () => {
  const dataItem = useListItemProvice();

  return (
    <View style={styles.container}>
      <TextTranslate
        text="common.view_price"
        color={defaultColors.c_fff}
        fontSize={8}
        weight="400"
      />
      <TextCustom color={defaultColors.c_fff} fontSize={12} weight="bold">
        {dataItem.provices.Name}
      </TextCustom>
    </View>
  );
};

export default CityFilter;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 32,
    borderWidth: 1,
    borderColor: defaultColors.c_fff,
    borderRadius: 6,
    padding: 4,
  },
  provice: {
    backgroundColor: defaultColors._014F59,
  },
  styleBackgroudOpacity: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    // opacity: 0.99,
    // zIndex: 100,
    // justifyContent: getValueForDevice('center','flex-end') ,
    alignItems: 'center',
    margin: 0,
  },
});
