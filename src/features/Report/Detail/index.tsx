import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from 'src/commons/globalStyles';
import {SideLeft} from './components/SideLeft';
import {defaultColors} from '@configs';
import {MainDetail} from './components/MainDetail';
import {EventProvider} from 'react-native-outside-press';

export const ReportDetail = () => {
  const [currenFilter, setCurrentFilter] = useState<string>('');
  const handleChangeFilter = (filter: string) => {
    setCurrentFilter(filter);
  };
  return (
    <EventProvider style={{flex: 1}}>
      <View style={styles.container}>
        <SideLeft currenFilter={currenFilter} onChange={handleChangeFilter} />
        <MainDetail />
      </View>
    </EventProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.row,
    ...globalStyles.fullFill,
    backgroundColor: defaultColors.c_fff,
  },
});
