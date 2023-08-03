import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ICDeleteProduct = ({
  width = 24,
  height = 24,
  color = defaultColors._E73F3F,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2481 17.5329H12.7481V11.3729H11.2481V17.5329ZM4.07812 7.03285L5.49812 21.8729H18.4981L19.9181 7.03285H4.07812Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9361 3.56195H16.3551V2.12695H7.64112V3.56195H6.06012V5.06195H17.9361V3.56195Z"
        fill={color}
      />
    </Svg>
  );
};
