import {useTranslation} from 'react-i18next';
import {TextCustom} from '../Text';
import React from 'react';
import {defaultColors} from '@configs';
import {View} from 'react-native';

const TextError = ({
  message,
  option,
}: {
  message: string;
  option?: {[key: string]: any};
}) => {
  const {t} = useTranslation();
  return (
    <View style={{position: 'absolute', left: 0, bottom: -15}}>
      <TextCustom fontSize={12} color={defaultColors._EA222A}>
        {t(message, {...option})}
      </TextCustom>
    </View>
  );
};
export default TextError;
