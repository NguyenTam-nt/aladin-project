import { defaultColors } from '@configs';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import KitchenLinks from '../components/KitchenLinks';
import { Notice } from './components/Notice';

export const WaitProcees = () => {
  const navigation = useNavigation();

  const currentRoute = useMemo(() => {
    return navigation.getState().routeNames[navigation.getState().index];
  }, []);
  return (
    <View style={styles.container}>
      <Notice />
      <KitchenLinks />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_fff,
    padding: 32,
  },
  groupNotice: {
    flexDirection: 'row',
    columnGap: 16,
  },
  noticeItem: {
    borderLeftWidth: 4,
    borderLeftColor: defaultColors._EA222A,
    borderRadius: 4,
    height: 60,
    flex: 1,
    backgroundColor: defaultColors.bg_FCEAEA,
    maxWidth: 376,
    columnGap: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  groupLink: {
    flexDirection: 'row',
    columnGap: 20,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_EFEFEF,
    marginTop: 37,
  },
  styleLinkButton: {
    paddingBottom: 10,
    borderBottomWidth: 4,
  },
});
