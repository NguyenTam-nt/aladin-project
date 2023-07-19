import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {SideLeft} from './components/SideLeft';
import {defaultColors} from '@configs';

export const ReportDetail = () => {
  const [currenFilter, setCurrentFilter] = useState<string>('');
  const handleChangeFilter = (filter: string) => {
    setCurrentFilter(filter);
  };
  return (
    <View style={styles.container}>
      <SideLeft currenFilter={currenFilter} onChange={handleChangeFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.row,
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.c_fff,
  },
});
