import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path, G, Defs, Rect, ClipPath} from 'react-native-svg';
export const ICFacebook = ({
  width = 19,
  height = 13,
  color = defaultColors.text_111213,
}: IIcon) => (
  <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <G clip-path="url(#clip0_1869_19775)">
      <Path
        d="M25.5 13C25.5 6.09648 19.9035 0.5 13 0.5C6.09648 0.5 0.5 6.09639 0.5 13C0.5 19.2391 5.07109 24.4104 11.0469 25.3481V16.6133H7.87305V13H11.0469V10.2461C11.0469 7.11328 12.9131 5.38281 15.7683 5.38281C17.1359 5.38281 18.5664 5.62695 18.5664 5.62695V8.70312H16.9902C15.4373 8.70312 14.9531 9.6667 14.9531 10.6553V13H18.4199L17.8657 16.6133H14.9531V25.3481C20.9289 24.4104 25.5 19.2392 25.5 13Z"
        fill="#1877F2"
      />
      <Path
        d="M17.8657 16.6133L18.4199 13H14.9531V10.6553C14.9531 9.6666 15.4374 8.70312 16.9902 8.70312H18.5664V5.62695C18.5664 5.62695 17.1359 5.38281 15.7683 5.38281C12.9131 5.38281 11.0469 7.11328 11.0469 10.2461V13H7.87305V16.6133H11.0469V25.3481C11.693 25.4494 12.346 25.5002 13 25.5C13.654 25.5002 14.307 25.4494 14.9531 25.3481V16.6133H17.8657Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1869_19775">
        <Rect
          width="25"
          height="25"
          fill="white"
          transform="translate(0.5 0.5)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
