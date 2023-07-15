import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

 export const ICDrawerAll = ({
   width = 20,
   height = 20,
   color = defaultColors.c_fff,
 }: IIcon) => {
   return (
     <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
       <G clipPath="url(#clip0_2251_56602)" fill={color}>
         <Path d="M9 14v3c0 1.65-1.35 3-3 3H3c-1.65 0-3-1.35-3-3v-3c0-1.65 1.35-3 3-3h3c1.65 0 3 1.35 3 3zM9 3v3c0 1.65-1.35 3-3 3H3C1.35 9 0 7.65 0 6V3c0-1.65 1.35-3 3-3h3c1.65 0 3 1.35 3 3zM20 14v3c0 1.65-1.35 3-3 3h-3c-1.65 0-3-1.35-3-3v-3c0-1.65 1.35-3 3-3h3c1.65 0 3 1.35 3 3zM20 3v3c0 1.65-1.35 3-3 3h-3c-1.65 0-3-1.35-3-3V3c0-1.65 1.35-3 3-3h3c1.65 0 3 1.35 3 3z" />
       </G>
       <Defs>
         <ClipPath id="clip0_2251_56602">
           <Path fill={color} d="M0 0H20V20H0z" />
         </ClipPath>
       </Defs>
     </Svg>
   );
 };


