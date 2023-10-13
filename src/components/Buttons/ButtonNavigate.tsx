import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import React from 'react';
import {defaultColors} from '@configs';
import TextTranslate from '../TextTranslate';

type Props = {
  renderLeff?: JSX.Element;
  renderRight?: JSX.Element;
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const ButtonNavigate = ({
  renderLeff,
  renderRight,
  text,
  style,
}: Props) => {
  return (
    <View style={[styles.styleBtn, StyleSheet.flatten(style)]}>
      {renderLeff ? renderLeff : null}
      <TextTranslate
        fontSize={14}
        weight="600"
        color={defaultColors.c_fff}
        text={text}
      />
      {renderRight ? renderRight : null}
    </View>
  );
};

const styles = StyleSheet.create({
  styleBtn: {
    // width: '100%',
    paddingHorizontal: 10,
    height: 24,
    backgroundColor: defaultColors.bg_00C3AB,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    columnGap: 8,
  },
});
