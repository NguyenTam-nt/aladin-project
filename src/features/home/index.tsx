import {Header} from '@components';
import React, {useState} from 'react';
import HomeScreen from './HomeScreen';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {defaultColors, isTabletDevice} from '@configs';
import {DinnerTableState} from './components/TableOrder';
import {ICCheckBoxTable} from '@icons';
import {ICCheckBox} from 'src/assets/icons/ICCheckBox';

export const Home = () => {

  const [stateCheckbox, setStateCheckbox] = useState<string[]>([]);
  const onPressCheckbox = async (value: string) => {
    try {
      if (stateCheckbox) {
        const newValueCheckBox = [...stateCheckbox];
        const indexValue = newValueCheckBox.indexOf(value);
        if (indexValue >= 0) {
          setStateCheckbox(newValueCheckBox.filter(check => check !== value));
        } else {
          newValueCheckBox.push(value);
          setStateCheckbox(newValueCheckBox);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <>
      <Header
        isCheckbox
        isOrder={isTabletDevice}
        updateCheckbox={setStateCheckbox}
        valueCheckBox={stateCheckbox}
      />
      {!isTabletDevice && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonRow}
            activeOpacity={0.8}
            onPress={() => {
              onPressCheckbox(DinnerTableState.EMPTY);
            }}>
            {stateCheckbox.some(
              checked => checked === DinnerTableState.EMPTY,
            ) ? (
              <ICCheckBox />
            ) : (
              <ICCheckBoxTable />
            )}

            <Text style={styles.textCheckBox}> Còn trống</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRow}
            activeOpacity={0.8}
            onPress={() => {
              onPressCheckbox(DinnerTableState.BOOK);
            }}>
            {stateCheckbox.some(
              checked => checked === DinnerTableState.BOOK,
            ) ? (
              <ICCheckBox color={defaultColors._01A63E} />
            ) : (
              <ICCheckBoxTable color={defaultColors._01A63E} />
            )}

            <Text style={styles.textCheckBox}>Đặt trước</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRow}
            activeOpacity={0.8}
            onPress={() => {
              onPressCheckbox(DinnerTableState.EATING);
            }}>
            {stateCheckbox.some(
              checked => checked === DinnerTableState.EATING,
            ) ? (
              <ICCheckBox color={defaultColors._0073E5} />
            ) : (
              <ICCheckBoxTable color={defaultColors._0073E5} />
            )}
            <Text style={styles.textCheckBox}> Đang ngồi</Text>
          </TouchableOpacity>
        </View>
      )}

      <HomeScreen stateCheckbox={stateCheckbox} />
    </>
  );
};
const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCheckBox: {
    color: defaultColors.c_fff,
    marginLeft: 8,
    marginBottom: 2,
  },
  container: {
    backgroundColor: defaultColors.bg_primary,
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
});
