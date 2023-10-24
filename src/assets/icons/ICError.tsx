import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
export const ICError = ({
  width = 19,
  height = 13,
  color = defaultColors.text_111213,
}: IIcon) => (
  <Svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none">
    <G clip-path="url(#clip0_3529_17878)">
      <Path
        d="M25 0C11.1824 0 0 11.1813 0 25C0 38.8177 11.1813 50 25 50C38.8176 50 50 38.8187 50 25C50 11.1823 38.8187 0 25 0ZM25 46.0938C13.3414 46.0938 3.90625 36.6595 3.90625 25C3.90625 13.3413 13.3405 3.90625 25 3.90625C36.6586 3.90625 46.0938 13.3405 46.0938 25C46.0938 36.6587 36.6595 46.0938 25 46.0938Z"
        fill="#EE0000"
      />
      <Path
        d="M33.5538 30.7916L27.7626 25.0004L33.5538 19.2092C34.3165 18.4465 34.3166 17.2099 33.5539 16.4471C32.791 15.6843 31.5544 15.6844 30.7918 16.4471L25.0005 22.2383L19.2092 16.4471C18.4466 15.6843 17.2097 15.6843 16.447 16.4471C15.6844 17.2099 15.6844 18.4465 16.4471 19.2092L22.2384 25.0004L16.4471 30.7916C15.6844 31.5544 15.6843 32.791 16.447 33.5537C17.21 34.3166 18.4467 34.3163 19.2092 33.5537L25.0005 27.7625L30.7918 33.5537C31.5543 34.3164 32.7911 34.3165 33.5539 33.5537C34.3167 32.7909 34.3166 31.5543 33.5538 30.7916Z"
        fill="#EE0000"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3529_17878">
        <Rect width="50" height="50" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
