import { Colors } from "@constants/color";
import type { IIcon } from "@typeRules/icon";
import React from "react";

export const ICGm = ({width = 76, height = 16, color = Colors.text_white}:IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.63866 8.7187C10.068 8.7187 10.2813 8.93336 10.2813 9.37736V11.3987C10.2813 12.5174 9.86799 13.4214 9.05599 14.1107C8.21333 14.8307 7.05599 15.1974 5.57866 15.1974C4.0791 15.1974 2.9151 14.8147 2.08666 14.0494C1.27466 13.2987 0.861328 12.2414 0.861328 10.9094V8.15203C0.861328 6.8187 1.27466 5.7627 2.08666 5.01203C2.89866 4.26137 4.07866 3.8667 5.57866 3.8667C7.89199 3.8667 9.37866 4.7547 10.052 6.54803C10.1898 6.96136 10.052 7.23692 9.63866 7.3747L7.99999 7.95736C7.8347 8.02653 7.65067 8.03689 7.47866 7.9867C7.32353 7.88325 7.21382 7.72441 7.17199 7.5427C6.91199 6.88403 6.37199 6.54803 5.57866 6.54803C4.46133 6.54803 3.89466 7.08136 3.89466 8.14003V10.928C3.89466 11.9854 4.46133 12.5214 5.57866 12.5214C6.69599 12.5214 7.23333 12.1694 7.23333 11.48V11.1734H5.76666C5.33822 11.1734 5.12399 10.9587 5.12399 10.5294V9.38136C5.12399 8.93736 5.33866 8.7227 5.76666 8.7227L9.63866 8.7187Z"
        fill={color}
      />
      <path
        d="M11.4902 4.70513C11.4902 4.2918 11.6902 4.0918 12.1036 4.0918H13.9116C14.3249 4.0918 14.5236 4.2918 14.5236 4.70513V14.3558C14.5236 14.7691 14.3249 14.9678 13.9116 14.9678H12.1036C11.6902 14.9678 11.4902 14.7691 11.4902 14.3558V4.70513Z"
        fill={color}
      />
      <path
        d="M25.7673 14.3398C25.9206 14.7531 25.7673 14.9678 25.3233 14.9678H23.6673C23.0086 14.9678 22.6259 14.7536 22.5193 14.3251L22.1673 13.2211H18.8593L18.5073 14.3251C18.4597 14.5248 18.3466 14.7027 18.1859 14.8305C17.9336 14.9375 17.6594 14.9832 17.3859 14.9638H15.7806C15.3513 14.9638 15.2139 14.7491 15.3673 14.3358L18.8899 4.62513C19.0126 4.2718 19.2726 4.0918 19.6899 4.0918H21.4366C21.8366 4.0918 22.0953 4.26113 22.2366 4.59846L25.7673 14.3398ZM20.9126 9.02513C20.7066 8.32789 20.5932 7.6066 20.5753 6.8798H20.4219C20.4339 7.60154 20.3359 8.32089 20.1313 9.01313L19.5646 10.8211H21.4793L20.9126 9.02513Z"
        fill={color}
      />
      <path
        d="M35.1554 4.09221C35.5848 4.09221 35.7994 4.30687 35.7994 4.73621V14.3255C35.7994 14.7531 35.5848 14.9673 35.1554 14.9682H33.4221C33.2998 14.9762 33.1775 14.9521 33.0673 14.8983C32.9572 14.8445 32.863 14.7629 32.7941 14.6615L30.4354 11.0322C29.9301 10.2322 29.4848 9.17888 29.0874 7.87621H28.9648C29.3025 9.42288 29.471 10.7402 29.4701 11.8282V14.3255C29.4701 14.7535 29.2554 14.9682 28.8114 14.9682H27.2661C26.8208 14.9682 26.6074 14.7535 26.6074 14.3255V4.73621C26.6074 4.30687 26.8208 4.09221 27.2661 4.09221H29.0728C29.1973 4.08455 29.3217 4.10867 29.4344 4.16231C29.547 4.21596 29.6442 4.29736 29.7168 4.39887L32.2288 8.32021C32.4279 8.64199 32.8568 9.57532 33.5154 11.1202H33.6381C33.1781 9.63354 32.9488 8.34687 32.9488 7.24421V4.73621C32.9488 4.30687 33.163 4.09221 33.5914 4.09221H35.1554Z"
        fill={color}
      />
      <path
        d="M45.8476 8.7187C46.2756 8.7187 46.4903 8.93336 46.4903 9.37736V11.3987C46.4903 12.5174 46.077 13.4214 45.265 14.1107C44.4223 14.8307 43.2583 15.1974 41.7876 15.1974C40.2863 15.1974 39.1223 14.8147 38.2956 14.0494C37.4836 13.2987 37.0703 12.2414 37.0703 10.9094V8.15203C37.0703 6.8187 37.4836 5.7627 38.2956 5.01203C39.1076 4.26137 40.2863 3.8667 41.7876 3.8667C44.101 3.8667 45.5863 4.7547 46.261 6.54803C46.3979 6.96136 46.2601 7.23692 45.8476 7.3747L44.2076 7.95736C44.0428 8.02654 43.8592 8.0369 43.6876 7.9867C43.5321 7.88365 43.4223 7.72463 43.381 7.5427C43.121 6.88403 42.581 6.54803 41.7876 6.54803C40.6703 6.54803 40.1036 7.08136 40.1036 8.14003V10.928C40.1036 11.9854 40.6703 12.5214 41.7876 12.5214C42.905 12.5214 43.4423 12.1694 43.4423 11.48V11.1734H41.9756C41.5463 11.1734 41.333 10.9587 41.333 10.5294V9.38136C41.333 8.93736 41.5463 8.7227 41.9756 8.7227L45.8476 8.7187Z"
        fill={color}
      />
      <path
        d="M63.2476 4.07739C63.6916 4.07739 63.905 4.29206 63.905 4.72006V14.3401C63.905 14.7534 63.6916 14.9681 63.2476 14.9681H61.577C61.149 14.9681 60.9343 14.7534 60.9343 14.3401V12.1494C60.9343 11.0467 61.1636 9.71473 61.601 8.13606H61.4396C61.1767 9.01052 60.833 9.85862 60.413 10.6694L59.5556 12.4027C59.4869 12.5383 59.3815 12.6518 59.2513 12.7303C59.1212 12.8088 58.9716 12.8492 58.8196 12.8467H57.7996C57.647 12.853 57.4958 12.8142 57.365 12.7353C57.2341 12.6563 57.1293 12.5407 57.0636 12.4027L56.1596 10.6694C55.8383 10.1027 55.5316 9.26006 55.2103 8.13606H55.057C55.4716 9.80673 55.685 11.1534 55.685 12.1654V14.3401C55.685 14.7534 55.4716 14.9681 55.0263 14.9681H53.4596C53.0143 14.9681 52.793 14.7534 52.793 14.3401V4.72006C52.793 4.29206 53.0076 4.07739 53.4596 4.07739H54.8983C55.3276 4.07739 55.6343 4.23073 55.8023 4.55206L58.3356 9.51472L60.8623 4.56806C60.942 4.41148 61.0658 4.28162 61.2183 4.19444C61.3709 4.10727 61.5456 4.06658 61.721 4.07739H63.2476Z"
        fill={color}
      />
      <path
        d="M74.6002 4.09178C75.0588 4.09178 75.1659 4.30644 74.9215 4.73577L71.3828 10.7558V14.3251C71.3828 14.7531 71.1695 14.9678 70.7402 14.9678H69.0068C68.5615 14.9678 68.3482 14.7531 68.3482 14.3251V10.7558L64.8242 4.73577C64.5646 4.30644 64.6722 4.09178 65.1468 4.09178H66.9842C67.2571 4.0789 67.5305 4.10494 67.7962 4.16911C67.9998 4.27637 68.1617 4.44861 68.2562 4.65844L69.8948 7.78378L71.5802 4.65844C71.6738 4.44847 71.8353 4.27611 72.0388 4.16911C72.3005 4.10546 72.5698 4.07943 72.8388 4.09178H74.6002ZM72.1642 0.859777C72.2119 0.853916 72.2604 0.85903 72.3058 0.874734C72.3513 0.890439 72.3926 0.916319 72.4265 0.950398C72.4605 0.984477 72.4862 1.02586 72.5017 1.07139C72.5173 1.11691 72.5222 1.16539 72.5162 1.21311C72.5162 1.90244 72.3948 2.41311 72.1335 2.69844C71.9042 2.95844 71.5215 3.09844 71.0162 3.09844C70.5774 3.09516 70.1462 2.98438 69.7602 2.77578C69.3455 2.57711 69.0855 2.47044 68.9788 2.47044C68.8455 2.47044 68.7642 2.57711 68.7642 2.80644C68.7642 3.00644 68.6562 3.09844 68.4575 3.09844H67.5242C67.4764 3.1043 67.428 3.09919 67.3825 3.08348C67.337 3.06778 67.2957 3.0419 67.2618 3.00782C67.2278 2.97374 67.2021 2.93236 67.1866 2.88683C67.1711 2.8413 67.1661 2.79283 67.1722 2.74511C67.1722 1.48911 67.661 0.861107 68.6388 0.861107C69.0876 0.862465 69.5292 0.973221 69.9255 1.18378C70.3388 1.39889 70.5993 1.506 70.7068 1.50511C70.8602 1.50511 70.9362 1.39844 70.9362 1.16778C70.9362 0.96911 71.0282 0.861107 71.2268 0.861107L72.1642 0.859777Z"
        fill={color}
      />
    </svg>
  );
};
