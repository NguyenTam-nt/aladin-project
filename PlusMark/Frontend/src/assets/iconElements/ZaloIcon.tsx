import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const ZaloIcon = ({
  width = 62,
  height = 29,
  color = colors.white,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 62 29"
      fill="none"
    >
      <g clip-path="url(#clip0_620_6295)">
        <path
          d="M24.9202 22.5541C24.429 22.6949 23.9349 22.9554 23.4393 22.9584C19.0986 22.9898 14.7563 22.9943 10.4156 22.9629C9.51717 22.9569 8.7715 22.4837 8.39417 21.6452C8.06775 20.922 8.00337 20.1314 8.50497 19.4412C10.8183 16.2578 13.1512 13.088 15.4735 9.91068C15.8389 9.41058 16.1878 8.89999 16.6025 8.31154C14.65 8.31154 12.8547 8.31453 11.0579 8.30854C10.8109 8.30854 10.5503 8.31304 10.3212 8.24116C9.04551 7.83689 8.29235 6.45036 8.50048 4.93058C8.68765 3.5755 9.69235 2.65015 11.1013 2.64416C15.7071 2.62619 20.3114 2.63667 24.9052 2.63667C24.7824 1.43132 23.7253 0.502982 22.3403 0.501485C15.9527 0.499987 9.56508 0.49849 3.17749 0.501485C1.53792 0.502982 0.396953 1.62448 0.395455 3.25956C0.387969 9.64865 0.387969 16.0362 0.396953 22.4253C0.39845 24.0394 1.41963 25.0846 3.03973 25.131C4.0115 25.1595 4.98626 25.1535 5.95652 25.1026C6.51652 25.0726 6.72016 25.2493 6.6977 25.8138C6.66326 26.6718 6.68872 27.5312 6.68872 28.5C6.93877 28.3547 7.07054 28.2949 7.18583 28.211C8.37321 27.347 9.53813 26.4472 10.757 25.6296C11.1612 25.3586 11.7033 25.1699 12.1854 25.1609C14.7548 25.116 17.3242 25.1445 19.8951 25.137C20.8924 25.134 21.8941 25.1654 22.8838 25.0741C24.176 24.9528 25.0444 23.8089 24.9202 22.5541Z"
          fill={color}
        />
        <path
          d="M40.395 15.4104C40.395 13.6884 40.4055 11.965 40.3905 10.2431C40.3815 9.27132 39.835 8.48373 39.0354 8.20672C38.2239 7.92523 37.4617 8.15731 36.8209 8.97186C36.5109 9.36565 36.2728 9.32822 35.9749 9.02277C34.1287 7.13314 30.7777 7.65122 28.9569 9.38362C25.9712 12.2255 25.7362 17.4288 28.2622 20.6884C30.288 23.3013 34.235 23.8089 36.1366 21.6662C36.2115 21.5823 36.5633 21.6422 36.7056 21.7455C37.002 21.9597 37.2042 22.325 37.5171 22.4912C38.8632 23.2054 40.3591 22.2127 40.3875 20.5791C40.4189 18.8572 40.395 17.1338 40.395 15.4104ZM35.9449 17.1607C35.8776 17.3449 35.8012 17.5231 35.7099 17.6923C34.7456 19.4756 32.3004 19.5026 31.2119 17.7941C30.3389 16.424 30.3794 14.2335 31.3047 12.8919C32.3543 11.3721 34.6363 11.3541 35.5901 12.9398C35.7128 13.1449 35.8132 13.362 35.9015 13.5896C36.3462 14.7321 36.3657 16.0093 35.9449 17.1607Z"
          fill={color}
        />
        <path
          d="M61.5342 14.1272C61.1329 10.6594 58.3658 7.76055 54.7094 7.81296C53.0054 7.82194 51.5006 8.34301 50.2264 9.50643C47.5072 11.9875 47.0625 16.5094 48.9207 19.7227C51.4736 24.1338 58.0529 24.0335 60.4995 19.7242C61.4953 17.9693 61.7648 16.1216 61.5342 14.1272ZM57.0901 17.5441C56.6229 18.5338 55.7994 19.0489 54.7019 19.0474C53.5654 19.0444 52.7314 18.4829 52.2972 17.4557C52.2612 17.3719 52.2283 17.285 52.1984 17.1982C51.7551 15.9359 51.8046 14.5389 52.369 13.3276C52.4469 13.1584 52.5337 12.9967 52.6356 12.8425C53.6523 11.2897 55.9357 11.3886 56.9074 12.9727C57.8103 14.4461 57.8208 15.9988 57.0901 17.5441Z"
          fill={color}
        />
        <path
          d="M46.2406 12.272C46.2406 9.50344 46.2436 6.73339 46.2391 3.96483C46.2376 2.65168 45.459 1.74879 44.336 1.73382C43.1935 1.71884 42.3445 2.66366 42.3445 3.97082C42.3415 9.50943 42.3415 15.0465 42.3445 20.5852C42.3445 21.8249 43.1366 22.6874 44.2671 22.7009C45.4605 22.7159 46.2361 21.8893 46.2391 20.5792C46.2436 17.8091 46.2406 15.0406 46.2406 12.272Z"
          fill={color}
        />
        <path
          d="M24.9426 17.6564C24.9426 14.1332 24.9426 10.5366 24.9426 6.77979C22.2953 10.4288 19.7394 13.9535 17.0547 17.6564C19.8068 17.6564 22.3537 17.6564 24.9426 17.6564Z"
          fill={color}
        />
        <path
          d="M24.9201 22.5541C25.0444 23.8074 24.1774 24.9528 22.8852 25.0741C21.8955 25.167 20.8923 25.134 19.8966 25.137C17.3272 25.1445 14.7563 25.1161 12.1868 25.161C11.7047 25.17 11.1627 25.3586 10.7584 25.6296C9.53957 26.4472 8.37465 27.3471 7.18727 28.211C7.07198 28.2949 6.94021 28.3563 6.69016 28.5C6.69016 27.5312 6.66471 26.6718 6.69914 25.8138C6.7216 25.2508 6.51797 25.0741 5.95797 25.1026C4.9877 25.1535 4.01294 25.1595 3.04118 25.131C1.41957 25.0846 0.399893 24.0395 0.398396 22.4254C0.390909 16.0363 0.390909 9.64868 0.396899 3.25959C0.396899 1.62451 1.53786 0.503008 3.17743 0.50151C9.56503 0.498516 15.9526 0.500013 22.3387 0.503008C23.7237 0.503008 24.7809 1.43285 24.9036 2.63819C20.3098 2.63819 15.7041 2.62622 11.0998 2.64568C9.6923 2.65167 8.6861 3.57702 8.49893 4.9321C8.28931 6.45039 9.04246 7.83691 10.3197 8.24269C10.5503 8.31606 10.8108 8.31007 11.0564 8.31007C12.8517 8.31606 14.6484 8.31306 16.601 8.31306C16.1862 8.90151 15.8373 9.4121 15.472 9.91221C13.1496 13.0895 10.8168 16.2594 8.50342 19.4427C8.00182 20.133 8.0662 20.9235 8.39262 21.6467C8.77144 22.4853 9.51561 22.9569 10.414 22.9644C14.7548 22.9958 19.097 22.9928 23.4378 22.9599C23.9334 22.9554 24.4275 22.6949 24.9201 22.5541Z"
          fill={color}
        />
        <path
          d="M40.395 15.4104C40.395 13.6884 40.4055 11.965 40.3905 10.2431C40.3815 9.27132 39.835 8.48373 39.0354 8.20672C38.2239 7.92523 37.4617 8.15731 36.8209 8.97186C36.5109 9.36565 36.2728 9.32822 35.9749 9.02277C34.1287 7.13314 30.7777 7.65122 28.9569 9.38362C25.9712 12.2255 25.7362 17.4288 28.2622 20.6884C30.288 23.3013 34.235 23.8089 36.1366 21.6662C36.2115 21.5823 36.5633 21.6422 36.7056 21.7455C37.002 21.9597 37.2042 22.325 37.5171 22.4912C38.8632 23.2054 40.3591 22.2127 40.3875 20.5791C40.4189 18.8572 40.395 17.1338 40.395 15.4104ZM35.9449 17.1607C35.8776 17.3449 35.8012 17.5231 35.7099 17.6923C34.7456 19.4756 32.3004 19.5026 31.2119 17.7941C30.3389 16.424 30.3794 14.2335 31.3047 12.8919C32.3543 11.3721 34.6363 11.3541 35.5901 12.9398C35.7128 13.1449 35.8132 13.362 35.9015 13.5896C36.3462 14.7321 36.3657 16.0093 35.9449 17.1607Z"
          fill={color}
        />
        <path
          d="M61.5342 14.1272C61.1329 10.6594 58.3658 7.76055 54.7094 7.81296C53.0054 7.82194 51.5006 8.34301 50.2264 9.50643C47.5072 11.9875 47.0625 16.5094 48.9207 19.7227C51.4736 24.1338 58.0529 24.0335 60.4995 19.7242C61.4953 17.9693 61.7648 16.1216 61.5342 14.1272ZM57.0901 17.5441C56.6229 18.5338 55.7994 19.0489 54.7019 19.0474C53.5654 19.0444 52.7314 18.4829 52.2972 17.4557C52.2612 17.3719 52.2283 17.285 52.1984 17.1982C51.7551 15.9359 51.8046 14.5389 52.369 13.3276C52.4469 13.1584 52.5337 12.9967 52.6356 12.8425C53.6523 11.2897 55.9357 11.3886 56.9074 12.9727C57.8103 14.4461 57.8208 15.9988 57.0901 17.5441Z"
          fill={color}
        />
        <path
          d="M46.2406 12.272C46.2406 15.0406 46.2436 17.8106 46.2391 20.5792C46.2361 21.8893 45.4605 22.7144 44.2671 22.7009C43.1366 22.6874 42.3445 21.8249 42.3445 20.5852C42.3415 15.0465 42.3415 9.50943 42.3445 3.97082C42.3445 2.66366 43.1935 1.71884 44.336 1.73382C45.4605 1.74729 46.2376 2.65168 46.2391 3.96483C46.2436 6.73339 46.2406 9.50344 46.2406 12.272Z"
          fill={color}
        />
        <path
          d="M24.9426 17.6564C22.3537 17.6564 19.8068 17.6564 17.0547 17.6564C19.7394 13.9535 22.2968 10.4303 24.9426 6.77979C24.9426 10.5351 24.9426 14.1332 24.9426 17.6564Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_620_6295">
          <rect
            width="61.2212"
            height="28"
            fill={color}
            transform="translate(0.389404 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ZaloIcon;
