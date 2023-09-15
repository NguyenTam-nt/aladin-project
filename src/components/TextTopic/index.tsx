import React from 'react';
import {PropsTextCustom, TextCustom} from '../Text';

type Props = {
  text: string;
} & PropsTextCustom;

const TextTopic= ({text, ...props}: Props) => {

  return <TextCustom {...props}>{text}</TextCustom>;
};

export default TextTopic;
