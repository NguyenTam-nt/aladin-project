import React from 'react'
import type { IIcon } from 'typeRules/icon'


export const ICFileImage= ({ width = 32, height = 32}:IIcon) => {
  return (
    <svg width={width} height={height} viewBox="0 0 1024 1024">
      <path d="M853.333 960H170.667V64H640l213.333 213.333z" fill="#90CAF9" />
      <path d="M821.333 298.667H618.667V96z" fill="#E1F5FE" />
      <path d="M448 490.667L298.667 704h298.666z" fill="#1565C0" />
      <path
        d="M597.333 563.2L490.667 704H704zM640 522.667a32 32 0 1064 0 32 32 0 10-64 0z"
        fill="#1976D2"
      />
    </svg>
  );
}
