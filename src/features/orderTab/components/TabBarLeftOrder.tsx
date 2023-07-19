import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';


import { defaultColors } from '@configs';
import CheckBox from 'src/components/Checkbox/CheckBox';
import DropDownView from 'src/components/DropDownView/DropDownView';

const dataCheckbox = [
  {label: 'Bếp', value: 1},
  {
    label: 'Bar',
    value: 2,
  },
];

const TabBarLeftOrder = () => {
  const [typeLocation, setTypeLocaion] = useState<number>(1);

  return (
    <View style={styles.container}>
      <DropDownView
        itemView={
          <View style={{ alignItems: 'center'}}>
            {dataCheckbox.map(e => {
              return (
                <View style={{flexDirection: 'row' ,marginTop: 16 , justifyContent : 'center'}}>
                  <CheckBox active={e.value === typeLocation} />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 14,
                      color: defaultColors.c_222124,
                    }}>
                    {e.label}
                  </Text>
                </View>
              );
            })}
          </View>
        }
        headerButtonStyle={{
          width: '70%',
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderColor : defaultColors.bg_EFEFEF,
        }}
        isOpen={false}
      />
      <CheckBox active={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 226,
    backgroundColor : defaultColors.bg_FAFAFA,
  },
});

export default TabBarLeftOrder;
