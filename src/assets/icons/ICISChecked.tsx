import { defaultColors } from '@configs';
import { IIcon } from '@typeRules';
import * as React from 'react';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';

export const ICISChecked = ({
    width = 24,
    height = 24,
    color = defaultColors.bg_939393,
}: IIcon) => (
    <Svg width="18" height="19" viewBox="0 0 18 19" fill="none">
        <Path d="M16.5 9.5C16.5 5.36 13.14 2 9 2C4.86 2 1.5 5.36 1.5 9.5C1.5 13.64 4.86 17 9 17C13.14 17 16.5 13.64 16.5 9.5ZM3 9.5C3 6.185 5.685 3.5 9 3.5C12.315 3.5 15 6.185 15 9.5C15 12.815 12.315 15.5 9 15.5C5.685 15.5 3 12.815 3 9.5Z" fill="#FF7D03" />
        <Path d="M5.25 9.5C5.25 11.5711 6.92893 13.25 9 13.25C11.0711 13.25 12.75 11.5711 12.75 9.5C12.75 7.42893 11.0711 5.75 9 5.75C6.92893 5.75 5.25 7.42893 5.25 9.5Z" fill="#FF7D03" />
    </Svg>
)
