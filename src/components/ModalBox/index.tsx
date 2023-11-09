import {defaultColors} from '@configs';
import React, {useCallback, useRef} from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {useGoBack} from 'src/hooks/useGoBack';

const ModalBox = ({
  children,
  heightRatio = 1,
  type = 'modal',
  ...props
}: React.PropsWithChildren<{
  heightRatio?: number;
  type?: 'modal' | 'popup';
}>) => {
  const closing = useRef(false);

  const goBack = useGoBack();
  const dismiss = useCallback(() => {
    if (!closing.current) {
      closing.current = true;
      goBack();
      setTimeout(() => {
        closing.current = false;
      }, 2000);
    }
  }, [goBack]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableWithoutFeedback
          style={{width: '100%', height: '100%', zIndex: 0}}
          onPress={dismiss}
          children={<View style={{width: '100%', height: '100%'}} />}
        />
        <View
          style={{
            borderRadius: 16,
            position: 'absolute',
            backgroundColor: defaultColors.c_fff,
          }}>
          <View
            {...props}
            style={{
              height: '100%',
              paddingHorizontal: 12,
              paddingVertical: 13,
            }}>
            {children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModalBox;

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    paddingHorizontal: 12,
  },
});
