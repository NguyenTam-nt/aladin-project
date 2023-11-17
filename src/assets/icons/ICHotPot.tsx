import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

 export const ICHotPot = ({
  width = 20,
  height = 20,
  color = defaultColors.c_fff,
}: IIcon) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_2307_58254)" fill={color}>
        <Path d="M3.32 19.23c0 .424.346.77.77.77h11.83c.424 0 .77-.346.77-.77v-.834H3.32v.834zM18.724 11.135a.586.586 0 00-.586-.586H1.863c-.776.029-.776 1.143 0 1.172h1.453v5.503h13.37V11.72h1.452a.586.586 0 00.586-.586z" />
        <Path d="M18.14 12.975h-.279l-.002.001v1.169l.002.002h.292c.868.024.886 1.25.02 1.289h-.312l-.002.001v1.169l.002.002h.312c2.425-.104 2.397-3.55-.032-3.633zM1.852 12.975c-2.43.083-2.456 3.53-.032 3.633h.304l.002-.002v-1.169l-.002-.001H1.84c-.868-.024-.886-1.25-.02-1.29h.304l.002-.001v-1.169l-.002-.001h-.272zM17.319 4.457a1.108 1.108 0 00-2-.953l-2.842 5.86 2.541-.001 2.3-4.906zM2.906 6.018c.54.557 1.219.962 1.966 1.174.723.203 1.502.198 1.876-.45.383-.635.133-1.583-.592-1.838A4.418 4.418 0 014.34 3.841c-.552-.514-1.533-.282-1.903.373-.368.628-.026 1.288.47 1.804zM9.484 3.662a4.6 4.6 0 002.166-.995c.6-.5 1.054-1.172.72-1.875-.321-.703-1.282-1.046-1.927-.575a4.599 4.599 0 01-1.983.934c-.766.17-1.145 1.15-.801 1.852.322.686 1.09.781 1.825.66z" />
      </G>
      <Defs>
        <ClipPath id="clip0_2307_58254">
          <Path fill={color} d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

