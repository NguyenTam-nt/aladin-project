import { defaultColors } from '@configs';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ICCheck } from 'src/assets/icons/ICCheck';
import { ICCloseModal } from 'src/assets/icons/ICCloseModal';
import { Button } from '../Button';

interface IButtonAction  {
  onPressDone : () => void
  onPressCancel : () => void
  ICCancel? : JSX.Element
  textCancel? : string
  styleButtonDone?:  StyleProp<ViewStyle>
  textSuccess? : string
}


const ButtonAction = (props : IButtonAction) => {

  return (
    <View style={styles.container}>
      <Button
        text={props.textSuccess || 'Thực hiện'}
        renderLeff={<ICCheck />}
        onPress={props.onPressDone}
        style={[styles.buttonDone ,props.styleButtonDone]}
      />
      <Button
        text={ props.textCancel || 'Huỷ'}
        onPress={props.onPressCancel}
        renderLeff={props.ICCancel || <ICCloseModal /> }
        style={styles.buttonCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonDone: {
    width: 130,
  },
  buttonCancel: {
    width: 100,
    backgroundColor: defaultColors.c_222124,
  },
});

export default ButtonAction;
