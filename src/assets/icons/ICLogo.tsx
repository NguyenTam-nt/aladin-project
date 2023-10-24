import {defaultColors} from '@configs';
import {IIcon} from '@typeRules';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ICLogo = ({
  width = 19,
  height = 23,
  color = defaultColors.text_111213,
}: IIcon) => (
    <Svg  width="73" height="71" viewBox="0 0 73 71" fill="none">
    <Path d="M32.4157 27.5159C33.5297 28.3735 34.6558 29.124 35.6245 30.0292C38.0342 32.2924 39.342 35.1035 39.7415 38.3673C40.0564 40.964 39.3662 43.4535 39.0634 45.9907C38.9181 47.2533 38.7002 48.4921 38.01 49.6118C36.8112 51.5534 35.0554 52.6493 32.8032 52.8756C29.7275 53.1853 27.3905 51.9227 25.8527 49.3021C25.0414 47.9085 24.9082 46.3719 25.1383 44.7995C25.6589 41.3095 26.1675 37.8194 26.6882 34.3174C26.8577 33.1739 27.003 32.0423 27.1847 30.8988C27.2694 30.3747 27.0515 30.1722 26.5429 30.1483C21.4087 29.8148 16.7831 33.6146 16.105 38.6294C15.6086 42.3458 15.0031 46.0383 14.4461 49.7428C14.3129 50.6243 14.1918 51.5057 14.0829 52.3991C13.9133 53.757 14.9184 54.8886 16.3351 54.9363C16.88 54.9482 17.4249 54.9005 17.9698 54.9005C29.3279 54.9005 40.686 54.8767 52.0563 54.9244C53.5456 54.9244 54.5991 54.031 54.7686 52.6612C55.2409 48.9448 55.8221 45.2403 56.367 41.5358C56.8271 38.415 57.3115 35.306 57.7838 32.1852C58.2439 29.112 58.6919 26.0269 59.1521 22.9538C59.5032 20.6191 59.7575 18.2725 60.254 15.9736C60.8473 13.1744 62.6273 11.1971 65.2428 9.994C65.9209 9.6843 66.708 9.5771 67.4587 9.39842C68.6938 9.10064 69.9289 8.81476 71.164 8.51697C72.048 8.30256 72.1691 8.36212 72.387 9.21975C72.5808 9.97018 72.7261 10.7325 72.944 11.471C73.1136 12.0547 72.8956 12.3168 72.3265 12.4478C70.8976 12.7694 69.4809 13.1982 68.0278 13.4245C65.6182 13.8176 64.3589 15.783 64.0925 17.6174C63.4144 22.2748 62.7242 26.9203 62.034 31.5658C61.1379 37.6884 60.2418 43.8109 59.3337 49.9334C59.1278 51.3033 58.9583 52.685 58.6919 54.0429C58.1228 56.8898 55.471 58.9743 52.4316 58.9743C45.021 58.9624 37.6225 58.9743 30.2119 58.9743C25.6105 58.9743 21.0091 58.9743 16.4078 58.9743C12.3392 58.9743 9.4815 55.6629 10.0869 51.6963C10.8014 46.9674 11.4431 42.2386 12.1939 37.5216C12.7267 34.1625 14.4098 31.3991 17.0859 29.2192C18.8053 27.8256 20.7548 26.8488 22.8981 26.4319C24.4602 26.1342 26.0949 26.2414 27.7053 26.2414C28.1776 26.2414 28.4561 26.1937 28.674 25.7649C29.4127 24.264 30.3814 22.9299 31.6286 21.8103C33.9051 19.7615 36.5811 18.4512 39.681 18.1772C44.0644 17.7842 47.9392 19.023 51.0512 22.108C54.4175 25.4552 55.6526 29.5647 54.9382 34.2221C54.3691 37.9504 53.8363 41.6787 53.2914 45.407C53.1461 46.3838 52.9765 47.3605 52.8433 48.3492C52.7828 48.7899 52.5769 48.9686 52.141 48.9686C51.2329 48.9567 50.3247 48.9686 49.4165 48.9686C48.7748 48.9686 48.6294 48.8018 48.7142 48.1586C48.8958 46.8364 49.1017 45.5262 49.2954 44.2159C49.8646 40.3089 50.47 36.4138 50.9665 32.4949C51.4024 29.0644 49.1986 25.1217 46.1229 23.4541C43.9312 22.2629 41.6063 21.8103 39.1724 22.3463C36.0968 23.0371 33.8082 24.7643 32.4157 27.5159ZM31.3017 31.7921C31.1806 32.3043 31.0716 32.6855 31.0232 33.0667C30.5872 36.0326 30.1513 38.9867 29.7275 41.9527C29.5338 43.3225 29.2795 44.6923 29.1947 46.0741C29.11 47.5273 30.2845 48.7304 31.6891 48.8733C33.2028 49.0162 34.5347 48.0752 34.8132 46.5744C35.0796 45.1092 35.2492 43.6322 35.5034 42.1671C35.903 39.9039 35.7698 37.7122 34.7043 35.6277C33.9293 34.1149 32.8395 32.8761 31.3017 31.7921Z" fill="#FF7D03"/>
    <Path d="M21.9657 70.4203C18.9991 70.4203 16.7468 68.181 16.7468 65.2388C16.7468 62.4515 19.1081 60.1526 21.9779 60.1407C24.9082 60.1288 27.2331 62.4515 27.2331 65.3937C27.2331 68.1571 24.8719 70.4084 21.9657 70.4203ZM21.99 63.4997C21.0091 63.5116 20.1615 64.3335 20.1979 65.2865C20.2463 66.4657 21.0334 67.0017 22.0142 67.0732C22.995 67.1447 23.8305 66.2275 23.8063 65.2269C23.77 64.2978 22.9345 63.4878 21.99 63.4997Z" fill="#FF7D03"/>
    <Path d="M45.3609 60.1527C47.7706 60.0455 50.5799 61.9514 50.6888 65.2628C50.7736 67.7761 48.5092 70.2299 45.9058 70.4324C42.8181 70.6706 40.3236 68.3836 40.1904 65.5368C40.0694 62.7018 42.2611 60.1885 45.3609 60.1527ZM45.482 63.4999C44.4649 63.488 43.6294 64.2979 43.6173 65.2866C43.6051 66.2276 44.4649 67.0853 45.4094 67.0972C46.3175 67.1091 47.2257 66.2634 47.262 65.3938C47.3105 64.429 46.4386 63.5118 45.482 63.4999Z" fill="#FF7D03"/>
    <Path d="M28.3477 22.0958C28.3113 23.9302 26.7614 25.3715 24.8966 25.3357C23.0561 25.3 21.5909 23.7634 21.6394 21.9052C21.6757 20.0946 23.2377 18.6414 25.0662 18.701C26.9551 18.7605 28.384 20.2257 28.3477 22.0958Z" fill="#FF7D03"/>
    <Path d="M44.8151 14.0318C44.7909 15.9019 43.3136 17.3074 41.3883 17.2836C39.4872 17.2598 38.0704 15.7589 38.1068 13.8293C38.1431 12.114 39.7051 10.6251 41.4488 10.6608C43.4104 10.6965 44.8393 12.1259 44.8151 14.0318Z" fill="#FF7D03"/>
    <Path d="M0 32.1257L0.53279 30.7082L1.34408 31.006C0.908165 30.2675 0.823403 29.5528 1.07769 28.85C1.22299 28.4807 1.41674 28.1829 1.67102 27.9685C1.92531 27.7541 2.25225 27.6112 2.62762 27.5516C2.40966 27.1824 2.27647 26.8131 2.22803 26.4677C2.17959 26.1103 2.22803 25.7649 2.34912 25.4314C2.50653 25.0026 2.7366 24.669 3.02722 24.4427C3.31783 24.2164 3.65688 24.0854 4.05647 24.0615C4.34708 24.0496 4.783 24.1449 5.34001 24.3474L9.13008 25.7292L8.54886 27.2657L5.15837 26.0389C4.56504 25.8244 4.16545 25.7411 3.9596 25.7887C3.68109 25.8483 3.48735 26.0269 3.37837 26.3247C3.29361 26.5391 3.29361 26.7655 3.35415 27.0037C3.4147 27.2419 3.56 27.4563 3.79007 27.635C4.02014 27.8137 4.40763 28.0043 4.96463 28.2068L7.81022 29.2431L7.22899 30.7797L3.99592 29.5766C3.4147 29.3622 3.03932 29.255 2.84558 29.255C2.65184 29.255 2.50653 29.2907 2.37334 29.3741C2.25225 29.4575 2.14327 29.6004 2.07062 29.8029C1.98585 30.0411 1.96164 30.2794 2.02218 30.5176C2.08272 30.7558 2.21592 30.9583 2.43388 31.137C2.65184 31.3038 3.03932 31.4943 3.60844 31.7088L6.49035 32.757L5.90912 34.2936L0 32.1257Z" fill="#FF7D03"/>
    <Path d="M6.68377 21.3689L5.69084 22.5243C5.24282 22.0836 5.00064 21.6071 4.96431 21.1068C4.91588 20.6065 5.09751 20.011 5.50921 19.3082C5.88459 18.6769 6.23574 18.248 6.57479 18.0217C6.91384 17.7954 7.22867 17.6882 7.5435 17.7001C7.85833 17.712 8.31847 17.8907 8.94813 18.248L10.6313 19.2248C11.1156 19.4988 11.4789 19.6774 11.7332 19.7608C11.9875 19.8442 12.2781 19.9037 12.6171 19.9276L11.7937 21.3331C11.6726 21.3212 11.5031 21.2855 11.2851 21.2259C11.1883 21.2021 11.1156 21.1902 11.0914 21.1783C11.1883 21.5595 11.2125 21.9168 11.1762 22.2622C11.1277 22.6077 11.0187 22.9412 10.8371 23.2509C10.5102 23.7988 10.0985 24.1562 9.61412 24.2991C9.11765 24.442 8.64541 24.3825 8.17316 24.1204C7.85833 23.9418 7.62826 23.7154 7.47085 23.4296C7.31343 23.1437 7.25289 22.834 7.27711 22.5005C7.30132 22.1669 7.4103 21.7262 7.60404 21.1783C7.87044 20.4398 8.01575 19.9157 8.06418 19.594L7.91887 19.5107C7.64037 19.3558 7.39819 19.3082 7.20445 19.3796C7.01071 19.4511 6.79275 19.6655 6.57479 20.0467C6.42948 20.2968 6.35683 20.5231 6.38105 20.7256C6.36894 20.9162 6.47792 21.1306 6.68377 21.3689ZM8.97235 20.1301C8.92391 20.3445 8.82704 20.678 8.68173 21.1187C8.53643 21.5595 8.46377 21.8692 8.47588 22.0359C8.5001 22.298 8.62119 22.4886 8.82704 22.6077C9.03289 22.7268 9.25085 22.7506 9.48092 22.6791C9.71099 22.6196 9.90473 22.4647 10.0379 22.2384C10.1832 21.9764 10.2438 21.6905 10.2074 21.357C10.1832 21.1068 10.0864 20.9043 9.92895 20.7495C9.83207 20.6423 9.60201 20.4874 9.25085 20.2968L8.97235 20.1301Z" fill="#FF7D03"/>
    <Path d="M14.2154 17.891L13.1982 19.1894L8.19727 15.4015L9.14176 14.1865L9.85618 14.7225C9.68666 14.258 9.60189 13.9126 9.62611 13.6624C9.65033 13.4123 9.7472 13.1859 9.90462 12.9835C10.1347 12.6857 10.4495 12.4593 10.8249 12.3164L11.6604 13.5909C11.3456 13.6981 11.1155 13.853 10.9702 14.0436C10.8249 14.2223 10.7522 14.4248 10.7643 14.6272C10.7643 14.8297 10.8733 15.068 11.0792 15.3419C11.285 15.6159 11.8178 16.0805 12.6654 16.7237L14.2154 17.891Z" fill="#FF7D03"/>
    <Path d="M15.9224 15.7467L9.92847 9.51693L11.1394 8.38534L14.324 11.6967L14.215 8.79033L15.7044 7.38477L15.7165 10.4937L20.1605 11.792L18.8527 13.007L15.7528 12.0541V13.1619L17.1453 14.6032L15.9224 15.7467Z" fill="#FF7D03"/>
    <Path d="M22.7403 7.95671L24.3144 7.34922C24.4476 7.96862 24.3992 8.54038 24.1691 9.04066C23.939 9.54095 23.5273 9.96976 22.934 10.3271C21.9895 10.887 21.1177 10.9942 20.2943 10.6606C19.6404 10.3867 19.0834 9.88638 18.6353 9.14787C18.0905 8.26641 17.9088 7.4326 18.0662 6.65835C18.2236 5.8841 18.6717 5.27661 19.3861 4.85971C20.1853 4.38325 20.9845 4.26413 21.7715 4.51427C22.5586 4.76442 23.273 5.43146 23.9148 6.51541L20.3306 8.64758C20.597 9.06448 20.9118 9.31463 21.2751 9.42183C21.6383 9.52904 21.9895 9.48139 22.3164 9.27889C22.5465 9.14787 22.6918 8.96919 22.7766 8.7667C22.8371 8.52847 22.825 8.26641 22.7403 7.95671ZM21.9532 6.47968C21.6989 6.07469 21.3962 5.83646 21.0571 5.74116C20.7181 5.64587 20.4154 5.69352 20.1126 5.86028C19.7978 6.05086 19.6162 6.31292 19.5435 6.65835C19.483 7.00379 19.5677 7.36113 19.7978 7.75421L21.9532 6.47968Z" fill="#FF7D03"/>
    <Path d="M26.7593 1.66762L27.2194 2.89451L26.1539 3.28759L27.0378 5.63416C27.2194 6.11062 27.3284 6.38459 27.3769 6.45606C27.4253 6.52753 27.4979 6.57518 27.5948 6.599C27.6917 6.62282 27.7886 6.62282 27.8854 6.57517C28.0307 6.52753 28.2245 6.3965 28.4545 6.19401L29.0358 7.33751C28.733 7.62339 28.3456 7.84971 27.8854 8.01647C27.6069 8.12368 27.3284 8.17132 27.0741 8.15941C26.8077 8.1475 26.6019 8.08794 26.4445 7.98074C26.2871 7.87353 26.1296 7.69486 25.9964 7.45663C25.8996 7.28987 25.7422 6.93252 25.5363 6.38459L24.5797 3.85934L23.8653 4.1214L23.4052 2.89451L24.1196 2.63245L23.6837 1.47703L24.9066 0L25.6816 2.0607L26.7593 1.66762Z" fill="#FF7D03"/>
    <Path d="M32.5251 0.190199H34.063V1.03592C34.6079 0.380784 35.2739 0.0472606 36.0246 0.0472606C36.4242 0.0472606 36.7754 0.130641 37.0781 0.285492C37.3808 0.440342 37.623 0.690484 37.8167 1.02401C38.0952 0.690484 38.3979 0.440342 38.7128 0.27358C39.0276 0.106818 39.3788 0.0234375 39.742 0.0234375C40.2022 0.0234375 40.6018 0.11873 40.9166 0.297403C41.2435 0.476076 41.4736 0.750042 41.6431 1.10739C41.7642 1.36944 41.8126 1.79826 41.8126 2.39384L41.8247 6.37229H40.1537L40.1416 2.82265C40.1416 2.20325 40.0811 1.81017 39.9721 1.6315C39.8147 1.39327 39.5846 1.28606 39.2577 1.28606C39.0276 1.28606 38.8096 1.35753 38.6038 1.50047C38.3979 1.64341 38.2526 1.8459 38.1558 2.11987C38.071 2.39384 38.0226 2.82265 38.0226 3.40632L38.0347 6.3842H36.3637L36.3515 2.9775C36.3515 2.37001 36.3152 1.98884 36.2547 1.81017C36.1941 1.6315 36.0973 1.50047 35.9762 1.41709C35.8551 1.33371 35.6856 1.28606 35.4676 1.28606C35.2133 1.28606 34.9832 1.35753 34.7774 1.48856C34.5715 1.6315 34.4262 1.82208 34.3415 2.08414C34.2567 2.34619 34.2083 2.76309 34.2083 3.37058L34.2204 6.3842H32.5494L32.5251 0.190199Z" fill="#FF7D03"/>
    <Path d="M43.361 3.56139C43.4821 3.02537 43.7364 2.54891 44.1238 2.10818C44.5113 1.66745 44.9715 1.38157 45.5285 1.22672C46.0734 1.07187 46.6546 1.07187 47.26 1.2029C48.1924 1.41731 48.8826 1.88186 49.3428 2.60846C49.8029 3.33507 49.924 4.15697 49.706 5.06224C49.4881 5.97943 49.0158 6.6703 48.2772 7.13485C47.5385 7.5994 46.703 7.73043 45.7949 7.52793C45.2257 7.39691 44.7172 7.15868 44.2691 6.78942C43.8211 6.42016 43.5184 5.96752 43.361 5.41959C43.2036 4.88357 43.2036 4.26417 43.361 3.56139ZM45.0199 4.02594C44.8746 4.62152 44.9109 5.1218 45.1289 5.50297C45.3468 5.88414 45.6617 6.12237 46.0855 6.22957C46.5093 6.32487 46.9089 6.24149 47.2721 5.99134C47.6354 5.7412 47.8897 5.30047 48.035 4.69299C48.1682 4.09741 48.1319 3.60903 47.926 3.22786C47.7081 2.84669 47.3932 2.60846 46.9694 2.50126C46.5456 2.40597 46.146 2.48935 45.7828 2.73949C45.4074 3.00154 45.1531 3.43036 45.0199 4.02594Z" fill="#FF7D03"/>
    <Path d="M52.6745 4.85965L51.3546 4.08539C51.73 3.58511 52.1659 3.2635 52.6503 3.14438C53.1467 3.01336 53.7764 3.09674 54.5393 3.38261C55.2416 3.64467 55.7259 3.90672 56.0044 4.20451C56.2829 4.49039 56.4525 4.78818 56.4888 5.08597C56.5372 5.38375 56.4282 5.87213 56.174 6.53917L55.4717 8.32591C55.2779 8.8381 55.1568 9.21927 55.1205 9.48133C55.0842 9.74338 55.0721 10.0412 55.1084 10.3628L53.5584 9.79103C53.5584 9.67191 53.5585 9.50515 53.5827 9.27883C53.5948 9.18354 53.5948 9.11207 53.5948 9.07633C53.2315 9.23118 52.8682 9.32648 52.5171 9.33839C52.1659 9.3503 51.8148 9.30265 51.4636 9.17163C50.8582 8.94531 50.4344 8.61178 50.2043 8.15914C49.9742 7.70651 49.9621 7.23004 50.1438 6.72976C50.2648 6.39624 50.4586 6.13418 50.7129 5.9436C50.9672 5.7411 51.2699 5.6339 51.6089 5.59816C51.948 5.56243 52.4081 5.59816 52.9893 5.69345C53.7764 5.82448 54.3213 5.88404 54.6482 5.87213L54.7088 5.71728C54.8178 5.41949 54.8299 5.18126 54.7209 5.00258C54.624 4.82391 54.3576 4.65715 53.9459 4.5023C53.6674 4.3951 53.4253 4.37127 53.2315 4.41892C53.0741 4.49039 52.8804 4.63333 52.6745 4.85965ZM54.2971 6.88461C54.067 6.8727 53.728 6.83696 53.2557 6.76549C52.7835 6.69402 52.4687 6.68211 52.2991 6.71785C52.0448 6.78932 51.8753 6.93226 51.7906 7.14666C51.7058 7.36107 51.7179 7.57548 51.8269 7.78989C51.9359 8.00429 52.1054 8.15915 52.3597 8.25444C52.6382 8.36164 52.9409 8.36164 53.2678 8.27826C53.51 8.20679 53.7038 8.08768 53.837 7.909C53.9217 7.78989 54.0428 7.55166 54.1881 7.1824L54.2971 6.88461Z" fill="#FF7D03"/>
  </Svg>
);
