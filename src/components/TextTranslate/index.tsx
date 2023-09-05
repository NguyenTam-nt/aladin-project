import React from 'react';
import {PropsTextCustom, TextCustom} from '../Text';
import {useTranslation} from 'react-i18next';

type Props = {
  text: string;
} & PropsTextCustom;

const TextTranslate = ({text, ...props}: Props) => {
  const {t} = useTranslation();
  return <TextCustom {...props}>{t(text)}</TextCustom>;
};

export default TextTranslate;
