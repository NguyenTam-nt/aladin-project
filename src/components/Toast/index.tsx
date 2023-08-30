import { DIMENSION } from '@constants';
import React from 'react';
import { View, StyleSheet ,Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { defaultColors, isTabletDevice } from 'src/configs';

const toastStatus = {
  success: {
    icon: null,
    backgroundColor: defaultColors._01A63E,
  },
  error: {
    icon: null,
    backgroundColor: defaultColors._EA222A,
  },
  warning: {
    icon: null,
    backgroundColor: defaultColors._F1BA42,
  },
  setDefault: {
    icon: null,
    backgroundColor: defaultColors._01A63E,
  },
};

interface ToastProps {
  status: 'success' | 'error' | 'warning' | 'setDefault'
  title: string
}
const Toast = ({ status = 'success', title }: ToastProps) => {
  if (
    status !== 'success' &&
    status !== 'error' &&
    status !== 'warning' &&
    status !== 'setDefault'
  ) {
    return null;
  }


  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {backgroundColor: toastStatus[status].backgroundColor},
        ]}>
        <View style={styles.contentToast}>
          <View style={styles.center}>{toastStatus[status].icon}</View>
          <View style={styles.center}>
            <Text style={styles.textToast}>{title}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    width: isTabletDevice ? 500 : DIMENSION.width - 32,
    paddingHorizontal: 14,
    borderRadius: 8,
    height: 40,
  },
  contentToast: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textToast: {
    fontSize: 18,
    color: defaultColors.c_fff,
    marginLeft: 10,
    lineHeight: 40,
  },
});

export default Toast;
