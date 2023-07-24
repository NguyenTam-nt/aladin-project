import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import KitchenLinks from '../components/KitchenLinks';
import {defaultColors} from '@configs';
import {globalStyles} from 'src/commons/globalStyles';
import {HeaderListHistory} from './components/HeaderListHistory';
import {HistoryItem} from './components/HistoryItem';
import {getValueForDevice} from 'src/commons/formatMoney';

export const History = () => {
  const renderItem = useCallback(() => {
    return <HistoryItem />;
  }, []);

  return (
    <View style={styles.container}>
      <KitchenLinks />
      <View style={globalStyles.fullFill}>
        <ScrollView
          horizontal
          contentContainerStyle={getValueForDevice({flex: 1}, {minWidth: 950})}>
          <View style={globalStyles.fullFill}>
            <HeaderListHistory />

            <FlatList
              showsVerticalScrollIndicator={false}
              data={[1, 2, 3, 4, 5]}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultColors.c_fff,
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});
