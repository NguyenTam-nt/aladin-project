import {paddingHorizontalScreen} from '@constants';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  fullFill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  paddingScreenHorizontal: {
    paddingHorizontal: paddingHorizontalScreen,
  },
});
