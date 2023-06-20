import { Colors } from "@constants/color";
import type { IIcon } from "typeRules/icon";
import React from "react";

export const ICLogin = ({
  color = Colors.text_white,
  width = 24,
  height = 24,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5501 0.81543C8.65056 0.81543 6.30005 3.16593 6.30005 6.06543C6.30005 8.96492 8.65056 11.3154 11.5501 11.3154C14.4496 11.3154 16.8001 8.96492 16.8001 6.06543C16.8001 3.16593 14.4496 0.81543 11.5501 0.81543Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7185 12.0901C16.2044 11.5395 16.9178 11.1904 17.7118 11.1904H19.6199C21.0879 11.1904 22.2779 12.3805 22.2779 13.8485V20.5267C22.2779 21.9948 21.0879 23.1848 19.6199 23.1848H17.7118C16.9178 23.1848 16.2044 22.8357 15.7185 22.2851C15.4444 21.9746 15.4739 21.5006 15.7845 21.2265C16.095 20.9524 16.569 20.982 16.8431 21.2925C17.0564 21.5342 17.366 21.6848 17.7118 21.6848H19.6199C20.2595 21.6848 20.7779 21.1663 20.7779 20.5267V13.8485C20.7779 13.2089 20.2595 12.6904 19.6199 12.6904H17.7118C17.366 12.6904 17.0564 12.841 16.8431 13.0827C16.569 13.3932 16.095 13.4228 15.7845 13.1487C15.4739 12.8746 15.4444 12.4006 15.7185 12.0901Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9347 16.6572C18.2276 16.9501 18.2276 17.4249 17.9347 17.7178L15.9347 19.7178C15.6418 20.0107 15.1669 20.0107 14.874 19.7178C14.5811 19.4249 14.5811 18.9501 14.874 18.6572L16.874 16.6572C17.1669 16.3643 17.6418 16.3643 17.9347 16.6572Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9347 17.7178C18.2276 17.4249 18.2276 16.9501 17.9347 16.6572L15.9347 14.6572C15.6418 14.3643 15.1669 14.3643 14.874 14.6572C14.5811 14.9501 14.5811 15.4249 14.874 15.7178L16.874 17.7178C17.1669 18.0107 17.6418 18.0107 17.9347 17.7178Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1543 17.1875C11.1543 16.7733 11.49 16.4375 11.9043 16.4375H16.9043C17.3185 16.4375 17.6543 16.7733 17.6543 17.1875C17.6543 17.6017 17.3185 17.9375 16.9043 17.9375H11.9043C11.49 17.9375 11.1543 17.6017 11.1543 17.1875Z"
        fill={color}
      />
      <path
        d="M13.7885 13.6219C9.99339 13.1568 6.08945 13.8468 2.61732 15.6919C2.07593 15.9796 1.73755 16.5426 1.73755 17.1557V20.8276C1.73755 21.7941 2.52105 22.5776 3.48755 22.5776H14.1731C13.9896 22.0868 13.9848 21.5478 14.1527 21.0576C14.033 20.9773 13.9193 20.8843 13.8136 20.7785C13.4378 20.4028 13.2229 19.9274 13.1684 19.4375H11.9046C10.6619 19.4375 9.65451 18.4301 9.65451 17.1875C9.65451 15.9449 10.6619 14.9375 11.9046 14.9375H13.1684C13.2216 14.4586 13.4283 13.9935 13.7885 13.6219Z"
        fill={color}
      />
    </svg>
  );
};
