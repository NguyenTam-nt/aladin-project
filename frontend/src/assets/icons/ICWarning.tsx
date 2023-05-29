import type { IIcon } from "typeRules/icon";
import React from "react";
import { Colors } from "@constants/color";

export const ICWarning = ({
  color = Colors.bg_FFE600,
  width = 24,
  height = 24,
}: IIcon) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill={color} d="M12.865 3.00017L22.3912 19.5002C22.6674 19.9785 22.5035 20.5901 22.0252 20.8662C21.8732 20.954 21.7008 21.0002 21.5252 21.0002H2.47266C1.92037 21.0002 1.47266 20.5525 1.47266 20.0002C1.47266 19.8246 1.51886 19.6522 1.60663 19.5002L11.1329 3.00017C11.4091 2.52187 12.0206 2.358 12.4989 2.63414C12.651 2.72191 12.7772 2.84815 12.865 3.00017ZM10.9989 16.0002V18.0002H12.9989V16.0002H10.9989ZM10.9989 9.00017V14.0002H12.9989V9.00017H10.9989Z"></path>
    </svg>
  );
};
