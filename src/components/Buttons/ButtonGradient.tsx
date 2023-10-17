import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import {globalStyles} from 'src/commons/globalStyles';
interface IProps {
  renderLeff?: JSX.Element;
  renderRight?: JSX.Element;
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isLoading?: boolean;
}
const ButtonGradient = (props: IProps) => {
  const {
    renderLeff,
    renderRight,
    text,
    style,
    onPress,
    isLoading = false,
  } = props;
  return (
    <View style={globalStyles.center}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPress?.()}
        style={[styles.groupProduct, StyleSheet.flatten(style)]}>
        <RadialGradient
          style={StyleSheet.absoluteFillObject}
          colors={[defaultColors.secondary, defaultColors.bg_E60E00]}
          stops={[0.2, 0.6]}
          center={[71, 95]}
          radius={250}
        />
        {renderLeff && <View>{renderLeff}</View>}

        <TextCustom fontSize={17} weight="bold" color={defaultColors.c_fff}>
          {text}
        </TextCustom>
        {renderRight && <View>{renderRight}</View>}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGradient;
const styles = StyleSheet.create({
  groupProduct: {
    width: '100%',
    position: 'relative',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    // marginBottom: 4,
  },
});
