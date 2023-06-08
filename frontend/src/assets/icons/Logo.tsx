

import type { IIcon } from 'typeRules/icon'
import React from 'react'

export const ICLogo = ({
  width = 120,
  height = 120,
}: IIcon) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M109.381 58.1599C109.031 58.0629 108.659 58.0745 108.315 58.1933C107.957 58.316 107.647 58.5475 107.428 58.8554C107.208 59.1633 107.091 59.5321 107.092 59.9101C107.092 60.2881 107.212 60.6564 107.432 60.9633C107.653 61.2702 107.964 61.5002 108.323 61.6213C107.467 86.0426 87.3332 105.647 62.7052 105.647C53.3225 105.657 44.1672 102.76 36.4986 97.3533C36.5532 97.2013 36.5999 97.0479 36.6412 96.8919C37.0479 95.3666 36.9626 93.7253 36.7906 92.1719C36.623 90.4375 36.1547 88.7456 35.4066 87.1719C35.0742 86.5027 34.6932 85.8587 34.2666 85.2453C34.0612 84.9493 33.8466 84.6599 33.6252 84.3759C33.5532 84.2839 32.9479 83.6586 32.9746 83.5839C32.8492 83.9346 32.7372 84.2906 32.6372 84.6506C31.6959 88.0386 31.9706 91.8613 33.7906 94.9173C33.9559 95.1964 34.1337 95.467 34.3239 95.7293C32.2132 94.0496 30.2545 92.1873 28.4706 90.1639C29.225 89.2969 29.8317 88.3118 30.2666 87.2479C31.9092 83.2479 31.5372 78.3466 29.1652 74.7146C29.2186 74.7946 28.4292 75.9613 28.3479 76.1106C28.0928 76.5755 27.8528 77.0475 27.6279 77.5266C27.1867 78.464 26.812 79.4313 26.5066 80.4213C25.8961 82.425 25.8289 84.555 26.3119 86.5933C26.4483 87.1803 26.6481 87.7508 26.9079 88.2946C25.2813 86.2423 23.8338 84.0543 22.5812 81.7546C22.8852 81.3546 23.1746 80.9546 23.4412 80.5239C24.0189 79.6124 24.4857 78.6353 24.8319 77.6133C25.2132 76.4746 25.3852 75.3026 25.5186 74.1146C25.7852 71.6666 25.2519 69.2079 24.3892 66.9266C24.4172 66.9999 23.9892 67.5119 23.9359 67.5933C23.7812 67.8279 23.6306 68.0653 23.4839 68.3053C23.1906 68.7839 22.9119 69.2719 22.6519 69.7719C21.5399 71.8933 20.6999 74.2013 20.6346 76.6173C20.6237 77.0151 20.6375 77.4132 20.6759 77.8093C20.0822 76.4171 19.5593 74.9957 19.1093 73.5506C19.2159 73.2759 19.3106 73.0319 19.3266 72.9719C19.4771 72.4286 19.5802 71.8731 19.6346 71.3119C19.7845 69.5983 19.5733 67.8722 19.0146 66.2453C18.7461 65.4869 18.4003 64.7581 17.9826 64.0706C17.7759 63.7226 17.5532 63.3839 17.3159 63.0519C17.2919 63.0159 17.2252 62.9373 17.1412 62.8386C17.0839 61.9053 17.0506 60.9559 17.0506 60.0039C17.0506 34.8346 37.5279 14.3573 62.6972 14.3573C65.5676 14.3546 68.4318 14.6224 71.2519 15.1573C70.7906 16.4546 71.0652 18.0026 71.5546 19.2439C72.0234 20.4376 72.8067 21.4822 73.8212 22.2666C74.3711 22.6852 74.9648 23.0429 75.5919 23.3333C75.5706 23.3239 75.6759 22.7039 75.6826 22.6399C75.8639 20.9173 75.7252 19.0399 74.9292 17.4786C74.5771 16.7995 74.1108 16.1861 73.5506 15.6653C76.3551 16.3512 79.0876 17.304 81.7106 18.5106C81.6612 18.6759 81.6212 18.8186 81.6146 18.8466C81.5396 19.2098 81.495 19.5786 81.4812 19.9493C81.467 20.363 81.4795 20.7772 81.5186 21.1893C81.6679 22.8186 82.3652 24.4039 83.6519 25.4559C83.823 25.5966 84.0039 25.7249 84.1932 25.8399C84.3954 25.9627 84.6067 26.0696 84.8252 26.1599C84.8826 26.1839 85.5172 26.3973 85.5186 26.3879C85.7586 24.6999 85.6946 22.9093 85.0533 21.3106C84.8272 20.7429 84.5263 20.2079 84.1586 19.7199C86.398 20.9182 88.5338 22.3008 90.5439 23.8533C90.8559 25.2026 91.7439 26.3239 92.7679 27.2279C93.8346 28.1613 95.1132 29.0439 96.5239 29.3733C96.7956 29.4376 97.0721 29.48 97.3506 29.4999C97.3399 29.4999 97.2493 28.9666 97.2373 28.9066C97.1959 28.7319 97.1479 28.5573 97.0932 28.3853C96.9131 27.8113 96.6566 27.2642 96.3306 26.7586C95.8612 26.0346 95.2412 25.4599 94.6079 24.8813C94.0402 24.3619 93.3894 23.9414 92.6826 23.6373C92.3269 23.4857 91.96 23.3618 91.5852 23.2666H91.5612C90.4946 22.4248 89.3932 21.6341 88.2572 20.8946C89.4961 21.1921 90.7725 21.3017 92.0439 21.2199C92.8603 21.1852 93.6694 21.0509 94.4533 20.8199C94.7996 20.7125 95.1357 20.5742 95.4572 20.4066C95.5359 20.3653 96.2959 19.8506 96.2959 19.8506C96.1079 19.7173 95.9146 19.5839 95.7172 19.4586C94.3202 18.5823 92.6849 18.1629 91.0386 18.2586C89.4732 18.3559 87.9791 18.9479 86.7719 19.9493C84.8871 18.8156 82.9244 17.8166 80.8986 16.9599C80.527 16.8026 80.1532 16.6506 79.7773 16.5039C79.8719 16.5039 79.9666 16.5119 80.0599 16.5133C81.2386 16.5306 82.4853 16.4466 83.6119 16.0839C84.3613 15.8413 85.0786 15.4253 85.5226 14.7639C85.5426 14.7359 84.2919 14.1533 84.1719 14.1066C83.1047 13.7033 81.9682 13.5152 80.8279 13.5533C79.8186 13.5813 78.8106 13.6506 77.8732 14.0573C77.3122 14.2956 76.8065 14.6474 76.3879 15.0906C76.3732 15.1053 76.3052 15.1866 76.2306 15.2746C69.2505 13.1602 61.8721 12.7101 54.6868 13.9603C47.5014 15.2105 40.7087 18.1262 34.853 22.4739C28.9972 26.8217 24.2411 32.4805 20.9659 38.997C17.6906 45.5135 15.9871 52.7066 15.9919 59.9999C15.9919 61.2319 16.0395 62.4555 16.1346 63.6706C15.8534 64.7367 15.6937 65.8312 15.6586 66.9333C15.6189 69.3656 16.4492 71.7322 17.9999 73.6066C18.3652 74.8057 18.779 75.9915 19.2412 77.1639C18.8966 76.6657 18.5198 76.1905 18.1133 75.7413C16.7613 74.2493 14.9932 72.9039 13.1479 72.0933C11.9076 71.5686 10.6098 71.1922 9.28125 70.9719C9.36392 70.9879 9.65725 72.1719 9.71192 72.3199C9.88436 72.8026 10.0759 73.2777 10.2866 73.7453C10.7022 74.6755 11.2224 75.5554 11.8372 76.3679C13.1266 78.0453 14.9426 79.2906 16.9039 80.0719C18.1884 80.5833 19.5515 80.8688 20.9332 80.9159C21.8505 82.7486 22.8878 84.5187 24.0386 86.2146C22.2386 84.8213 20.0252 83.8799 17.9159 83.6333C17.1223 83.5433 16.3224 83.5232 15.5252 83.5733C15.3066 83.5853 13.2226 83.9119 13.1986 83.8666C13.6889 84.8409 14.3176 85.7391 15.0652 86.5333C15.7442 87.2387 16.5275 87.8354 17.3879 88.3026C18.3313 88.8349 19.3239 89.2747 20.3519 89.6159C21.4285 89.9448 22.5522 90.0926 23.6772 90.0533C24.2441 90.0349 24.8088 89.9743 25.3666 89.8719C25.4666 89.8533 26.1252 89.6839 26.5506 89.5759C27.5284 90.7715 28.571 91.9226 29.6786 93.0293C30.2795 93.6301 30.8955 94.2128 31.5266 94.7773C30.0055 94.1471 28.3494 93.9132 26.7132 94.0973C24.3105 94.361 21.9312 94.8067 19.5959 95.4306C19.6292 95.4213 20.5532 96.4826 20.6706 96.5826C21.1014 96.9492 21.5729 97.2651 22.0759 97.5239C23.2759 98.1453 24.6092 98.4573 25.9426 98.5906C27.7294 98.7827 29.5297 98.8171 31.3226 98.6933C32.5728 98.6216 33.7762 98.1921 34.7893 97.4559C41.6218 102.556 49.7206 105.689 58.207 106.513C66.6935 107.338 75.2437 105.823 82.9303 102.133C90.6169 98.4429 97.1464 92.7187 101.811 85.5812C106.475 78.4437 109.096 70.1653 109.389 61.6439C109.771 61.5389 110.109 61.3113 110.349 60.9961C110.589 60.6809 110.719 60.2956 110.719 59.8993C110.719 59.5029 110.589 59.1176 110.349 58.8024C110.109 58.4872 109.771 58.2596 109.389 58.1546L109.381 58.1599Z" fill="#99BC20"/>
<path d="M34.6387 58.7187C35.068 58.7187 35.2813 58.9334 35.2813 59.3774V61.3987C35.2813 62.5174 34.868 63.4214 34.056 64.1107C33.2133 64.8307 32.056 65.1974 30.5787 65.1974C29.0791 65.1974 27.9151 64.8147 27.0867 64.0494C26.2747 63.2987 25.8613 62.2414 25.8613 60.9094V58.152C25.8613 56.8187 26.2747 55.7627 27.0867 55.012C27.8987 54.2614 29.0787 53.8667 30.5787 53.8667C32.892 53.8667 34.3787 54.7547 35.052 56.548C35.1898 56.9614 35.052 57.2369 34.6387 57.3747L33 57.9574C32.8347 58.0265 32.6507 58.0369 32.4787 57.9867C32.3235 57.8832 32.2138 57.7244 32.172 57.5427C31.912 56.884 31.372 56.548 30.5787 56.548C29.4613 56.548 28.8947 57.0814 28.8947 58.14V60.928C28.8947 61.9854 29.4613 62.5214 30.5787 62.5214C31.696 62.5214 32.2333 62.1694 32.2333 61.48V61.1734H30.7667C30.3382 61.1734 30.124 60.9587 30.124 60.5294V59.3814C30.124 58.9374 30.3387 58.7227 30.7667 58.7227L34.6387 58.7187Z" fill="white"/>
<path d="M36.4902 54.7051C36.4902 54.2918 36.6902 54.0918 37.1036 54.0918H38.9116C39.3249 54.0918 39.5236 54.2918 39.5236 54.7051V64.3558C39.5236 64.7691 39.3249 64.9678 38.9116 64.9678H37.1036C36.6902 64.9678 36.4902 64.7691 36.4902 64.3558V54.7051Z" fill="white"/>
<path d="M50.7673 64.3398C50.9206 64.7531 50.7673 64.9678 50.3233 64.9678H48.6673C48.0086 64.9678 47.6259 64.7536 47.5193 64.3251L47.1673 63.2211H43.8593L43.5073 64.3251C43.4597 64.5248 43.3466 64.7027 43.1859 64.8305C42.9336 64.9375 42.6594 64.9832 42.3859 64.9638H40.7806C40.3513 64.9638 40.2139 64.7491 40.3673 64.3358L43.8899 54.6251C44.0126 54.2718 44.2726 54.0918 44.6899 54.0918H46.4366C46.8366 54.0918 47.0953 54.2611 47.2366 54.5985L50.7673 64.3398ZM45.9126 59.0251C45.7066 58.3279 45.5932 57.6066 45.5753 56.8798H45.4219C45.4339 57.6015 45.3359 58.3209 45.1313 59.0131L44.5646 60.8211H46.4793L45.9126 59.0251Z" fill="white"/>
<path d="M60.1554 54.0922C60.5848 54.0922 60.7994 54.3069 60.7994 54.7362V64.3255C60.7994 64.7531 60.5848 64.9673 60.1554 64.9682H58.4221C58.2998 64.9762 58.1775 64.9521 58.0673 64.8983C57.9572 64.8445 57.863 64.7629 57.7941 64.6615L55.4354 61.0322C54.9301 60.2322 54.4848 59.1789 54.0874 57.8762H53.9648C54.3025 59.4229 54.471 60.7402 54.4701 61.8282V64.3255C54.4701 64.7535 54.2554 64.9682 53.8114 64.9682H52.2661C51.8208 64.9682 51.6074 64.7535 51.6074 64.3255V54.7362C51.6074 54.3069 51.8208 54.0922 52.2661 54.0922H54.0728C54.1973 54.0845 54.3217 54.1087 54.4344 54.1623C54.547 54.216 54.6442 54.2974 54.7168 54.3989L57.2288 58.3202C57.4279 58.642 57.8568 59.5753 58.5154 61.1202H58.6381C58.1781 59.6335 57.9488 58.3469 57.9488 57.2442V54.7362C57.9488 54.3069 58.163 54.0922 58.5914 54.0922H60.1554Z" fill="white"/>
<path d="M70.8476 58.7187C71.2756 58.7187 71.4903 58.9334 71.4903 59.3774V61.3987C71.4903 62.5174 71.077 63.4214 70.265 64.1107C69.4223 64.8307 68.2583 65.1974 66.7876 65.1974C65.2863 65.1974 64.1223 64.8147 63.2956 64.0494C62.4836 63.2987 62.0703 62.2414 62.0703 60.9094V58.152C62.0703 56.8187 62.4836 55.7627 63.2956 55.012C64.1076 54.2614 65.2863 53.8667 66.7876 53.8667C69.101 53.8667 70.5863 54.7547 71.261 56.548C71.3979 56.9614 71.2601 57.2369 70.8476 57.3747L69.2076 57.9574C69.0428 58.0265 68.8592 58.0369 68.6876 57.9867C68.5321 57.8836 68.4223 57.7246 68.381 57.5427C68.121 56.884 67.581 56.548 66.7876 56.548C65.6703 56.548 65.1036 57.0814 65.1036 58.14V60.928C65.1036 61.9854 65.6703 62.5214 66.7876 62.5214C67.905 62.5214 68.4423 62.1694 68.4423 61.48V61.1734H66.9756C66.5463 61.1734 66.333 60.9587 66.333 60.5294V59.3814C66.333 58.9374 66.5463 58.7227 66.9756 58.7227L70.8476 58.7187Z" fill="white"/>
<path d="M88.2476 54.0774C88.6916 54.0774 88.905 54.2921 88.905 54.7201V64.3401C88.905 64.7534 88.6916 64.9681 88.2476 64.9681H86.577C86.149 64.9681 85.9343 64.7534 85.9343 64.3401V62.1494C85.9343 61.0467 86.1636 59.7147 86.601 58.1361H86.4396C86.1767 59.0105 85.833 59.8586 85.413 60.6694L84.5556 62.4027C84.4869 62.5383 84.3815 62.6518 84.2513 62.7303C84.1212 62.8088 83.9716 62.8492 83.8196 62.8467H82.7996C82.647 62.853 82.4958 62.8142 82.365 62.7353C82.2341 62.6563 82.1293 62.5407 82.0636 62.4027L81.1596 60.6694C80.8383 60.1027 80.5316 59.2601 80.2103 58.1361H80.057C80.4716 59.8067 80.685 61.1534 80.685 62.1654V64.3401C80.685 64.7534 80.4716 64.9681 80.0263 64.9681H78.4596C78.0143 64.9681 77.793 64.7534 77.793 64.3401V54.7201C77.793 54.2921 78.0076 54.0774 78.4596 54.0774H79.8983C80.3276 54.0774 80.6343 54.2307 80.8023 54.5521L83.3356 59.5147L85.8623 54.5681C85.942 54.4115 86.0658 54.2816 86.2183 54.1944C86.3709 54.1073 86.5456 54.0666 86.721 54.0774H88.2476Z" fill="white"/>
<path d="M99.6002 54.0918C100.059 54.0918 100.166 54.3064 99.9215 54.7358L96.3828 60.7558V64.3251C96.3828 64.7531 96.1695 64.9678 95.7402 64.9678H94.0068C93.5615 64.9678 93.3482 64.7531 93.3482 64.3251V60.7558L89.8242 54.7358C89.5646 54.3064 89.6722 54.0918 90.1468 54.0918H91.9842C92.2571 54.0789 92.5305 54.1049 92.7962 54.1691C92.9998 54.2764 93.1617 54.4486 93.2562 54.6584L94.8948 57.7838L96.5802 54.6584C96.6738 54.4485 96.8353 54.2761 97.0388 54.1691C97.3005 54.1055 97.5698 54.0794 97.8388 54.0918H99.6002ZM97.1642 50.8598C97.2119 50.8539 97.2604 50.859 97.3058 50.8747C97.3513 50.8904 97.3926 50.9163 97.4265 50.9504C97.4605 50.9845 97.4862 51.0259 97.5017 51.0714C97.5173 51.1169 97.5222 51.1654 97.5162 51.2131C97.5162 51.9024 97.3948 52.4131 97.1335 52.6984C96.9042 52.9584 96.5215 53.0984 96.0162 53.0984C95.5774 53.0952 95.1462 52.9844 94.7602 52.7758C94.3455 52.5771 94.0855 52.4704 93.9788 52.4704C93.8455 52.4704 93.7642 52.5771 93.7642 52.8064C93.7642 53.0064 93.6562 53.0984 93.4575 53.0984H92.5242C92.4764 53.1043 92.428 53.0992 92.3825 53.0835C92.337 53.0678 92.2957 53.0419 92.2618 53.0078C92.2278 52.9737 92.2021 52.9324 92.1866 52.8868C92.1711 52.8413 92.1661 52.7928 92.1722 52.7451C92.1722 51.4891 92.661 50.8611 93.6388 50.8611C94.0876 50.8625 94.5292 50.9732 94.9255 51.1838C95.3388 51.3989 95.5993 51.506 95.7068 51.5051C95.8602 51.5051 95.9362 51.3984 95.9362 51.1678C95.9362 50.9691 96.0282 50.8611 96.2268 50.8611L97.1642 50.8598Z" fill="white"/>
</svg>

  );
};