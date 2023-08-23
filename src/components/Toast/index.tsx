import { DIMENSION } from '@constants';
import React from 'react';
import { View, StyleSheet ,Text } from 'react-native';

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: isTabletDevice ? -DIMENSION.width / 2 - 200 : 0,
  },
  content: {
    width: isTabletDevice ? 400 : DIMENSION.width - 32,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  contentToast: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textToast: {
    fontSize: 14,
    color: defaultColors.c_fff,
    marginLeft: 10,
  },
});

export default Toast;
