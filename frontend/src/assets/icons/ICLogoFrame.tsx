import type { IIcon } from "@typeRules/icon";
import { Colors } from "@constants/color";
import React from "react";

export const ICLogoFrame = ({
  width = 102,
  height = 94,
  color = Colors.primary,
}: IIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 102 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100.381 45.1599C100.031 45.0629 99.6586 45.0745 99.3146 45.1933C98.957 45.316 98.6468 45.5475 98.4275 45.8554C98.2082 46.1633 98.0907 46.5321 98.0916 46.9101C98.0925 47.2881 98.2117 47.6564 98.4324 47.9633C98.6532 48.2702 98.9644 48.5002 99.3226 48.6213C98.4666 73.0426 78.3332 92.6466 53.7052 92.6466C44.3225 92.6568 35.1672 89.7595 27.4986 84.3533C27.5532 84.2013 27.5999 84.0479 27.6412 83.8919C28.0479 82.3666 27.9626 80.7253 27.7906 79.1719C27.623 77.4375 27.1547 75.7456 26.4066 74.1719C26.0742 73.5027 25.6932 72.8587 25.2666 72.2453C25.0612 71.9493 24.8466 71.6599 24.6252 71.3759C24.5532 71.2839 23.9479 70.6586 23.9746 70.5839C23.8492 70.9346 23.7372 71.2906 23.6372 71.6506C22.6959 75.0386 22.9706 78.8613 24.7906 81.9173C24.9559 82.1964 25.1337 82.467 25.3239 82.7292C23.2132 81.0496 21.2545 79.1873 19.4706 77.1639C20.225 76.2969 20.8317 75.3118 21.2666 74.2479C22.9092 70.2479 22.5372 65.3466 20.1652 61.7146C20.2186 61.7946 19.4292 62.9613 19.3479 63.1106C19.0928 63.5755 18.8528 64.0475 18.6279 64.5266C18.1867 65.464 17.812 66.4313 17.5066 67.4212C16.8961 69.425 16.8289 71.555 17.3119 73.5933C17.4483 74.1803 17.6481 74.7508 17.9079 75.2946C16.2813 73.2423 14.8338 71.0543 13.5812 68.7546C13.8852 68.3546 14.1746 67.9546 14.4412 67.5239C15.0189 66.6124 15.4857 65.6353 15.8319 64.6133C16.2133 63.4746 16.3852 62.3026 16.5186 61.1146C16.7852 58.6666 16.2519 56.2079 15.3892 53.9266C15.4172 53.9999 14.9892 54.5119 14.9359 54.5933C14.7812 54.8279 14.6306 55.0653 14.4839 55.3053C14.1906 55.7839 13.9119 56.2719 13.6519 56.7719C12.5399 58.8933 11.6999 61.2013 11.6346 63.6173C11.6237 64.0151 11.6375 64.4132 11.6759 64.8093C11.0822 63.417 10.5593 61.9957 10.1093 60.5506C10.2159 60.2759 10.3106 60.0319 10.3266 59.9719C10.4771 59.4286 10.5802 58.8731 10.6346 58.3119C10.7845 56.5983 10.5733 54.8722 10.0146 53.2453C9.74612 52.4869 9.4003 51.7581 8.98258 51.0706C8.77592 50.7226 8.55325 50.3839 8.31592 50.0519C8.29192 50.0159 8.22525 49.9373 8.14125 49.8386C8.08392 48.9053 8.05058 47.9559 8.05058 47.0039C8.05058 21.8346 28.5279 1.35726 53.6972 1.35726C56.5676 1.35455 59.4318 1.62241 62.2519 2.15726C61.7906 3.45459 62.0652 5.00259 62.5546 6.24393C63.0234 7.43764 63.8067 8.48215 64.8212 9.26659C65.3711 9.68523 65.9648 10.0429 66.5919 10.3333C66.5706 10.3239 66.6759 9.70393 66.6826 9.63993C66.8639 7.91726 66.7252 6.03992 65.9292 4.47859C65.5771 3.79953 65.1108 3.18613 64.5506 2.66526C67.3551 3.35117 70.0876 4.30396 72.7106 5.51059C72.6612 5.67593 72.6212 5.81859 72.6146 5.84659C72.5396 6.20981 72.495 6.57864 72.4812 6.94926C72.467 7.36296 72.4795 7.77716 72.5186 8.18926C72.6679 9.81859 73.3652 11.4039 74.6519 12.4559C74.823 12.5966 75.0039 12.7249 75.1933 12.8399C75.3954 12.9627 75.6067 13.0696 75.8252 13.1599C75.8826 13.1839 76.5173 13.3973 76.5186 13.3879C76.7586 11.6999 76.6946 9.90926 76.0533 8.31059C75.8272 7.74289 75.5263 7.20793 75.1586 6.71992C77.398 7.91822 79.5338 9.30077 81.5439 10.8533C81.8559 12.2026 82.7439 13.3239 83.7679 14.2279C84.8346 15.1613 86.1132 16.0439 87.5239 16.3733C87.7956 16.4376 88.0721 16.48 88.3506 16.4999C88.3399 16.4999 88.2493 15.9666 88.2373 15.9066C88.1959 15.7319 88.1479 15.5573 88.0932 15.3853C87.9131 14.8113 87.6566 14.2642 87.3306 13.7586C86.8612 13.0346 86.2412 12.4599 85.6079 11.8813C85.0402 11.3619 84.3894 10.9414 83.6826 10.6373C83.3269 10.4857 82.96 10.3618 82.5853 10.2666H82.5612C81.4946 9.42481 80.3932 8.63415 79.2572 7.89459C80.496 8.19208 81.7725 8.30175 83.0439 8.21992C83.8603 8.1852 84.6694 8.05087 85.4532 7.81992C85.7996 7.71254 86.1357 7.57421 86.4572 7.40659C86.5359 7.36526 87.2959 6.85059 87.2959 6.85059C87.1079 6.71726 86.9146 6.58393 86.7172 6.45859C85.3202 5.58235 83.6849 5.16293 82.0386 5.25859C80.4732 5.35592 78.9791 5.94793 77.7719 6.94926C75.8871 5.81556 73.9244 4.81662 71.8986 3.95992C71.527 3.80259 71.1533 3.65059 70.7773 3.50393C70.8719 3.50393 70.9666 3.51192 71.0599 3.51326C72.2386 3.53059 73.4853 3.44659 74.6119 3.08393C75.3613 2.84126 76.0786 2.42526 76.5226 1.76393C76.5426 1.73593 75.2919 1.15326 75.1719 1.10659C74.1047 0.703273 72.9682 0.515214 71.8279 0.553259C70.8186 0.581259 69.8106 0.650592 68.8732 1.05726C68.3122 1.29563 67.8065 1.64744 67.3879 2.09059C67.3732 2.10526 67.3052 2.18659 67.2306 2.27459C60.2505 0.160202 52.8722 -0.289927 45.6868 0.960266C38.5014 2.21046 31.7087 5.12622 25.853 9.47394C19.9972 13.8217 15.2411 19.4805 11.9659 25.997C8.69057 32.5135 6.98709 39.7066 6.99192 46.9999C6.99192 48.2319 7.03947 49.4555 7.13458 50.6706C6.85337 51.7367 6.69369 52.8312 6.65858 53.9333C6.61893 56.3656 7.44924 58.7322 8.99992 60.6066C9.36525 61.8057 9.77903 62.9915 10.2412 64.1639C9.89657 63.6657 9.51977 63.1905 9.11325 62.7413C7.76125 61.2493 5.99325 59.9039 4.14792 59.0933C2.90764 58.5686 1.60977 58.1922 0.28125 57.9719C0.363917 57.9879 0.657249 59.1719 0.711916 59.3199C0.88436 59.8026 1.07592 60.2777 1.28658 60.7453C1.70219 61.6755 2.22244 62.5554 2.83725 63.3679C4.12658 65.0453 5.94258 66.2906 7.90392 67.0719C9.18838 67.5833 10.5515 67.8688 11.9332 67.9159C12.8505 69.7486 13.8878 71.5187 15.0386 73.2146C13.2386 71.8213 11.0252 70.8799 8.91592 70.6333C8.12232 70.5433 7.32236 70.5232 6.52525 70.5733C6.30658 70.5853 4.22258 70.9119 4.19858 70.8666C4.68889 71.8409 5.31763 72.7391 6.06525 73.5333C6.74415 74.2387 7.52754 74.8354 8.38792 75.3026C9.33127 75.8349 10.3239 76.2747 11.3519 76.6159C12.4285 76.9448 13.5522 77.0926 14.6772 77.0533C15.2441 77.0349 15.8088 76.9743 16.3666 76.8719C16.4666 76.8533 17.1252 76.6839 17.5506 76.5759C18.5284 77.7715 19.571 78.9226 20.6786 80.0293C21.2795 80.6301 21.8955 81.2128 22.5266 81.7773C21.0055 81.1471 19.3494 80.9132 17.7132 81.0973C15.3105 81.361 12.9312 81.8067 10.5959 82.4306C10.6292 82.4212 11.5532 83.4826 11.6706 83.5826C12.1014 83.9492 12.5729 84.2651 13.0759 84.5239C14.2759 85.1453 15.6093 85.4573 16.9426 85.5906C18.7294 85.7827 20.5297 85.8171 22.3226 85.6933C23.5728 85.6216 24.7762 85.1921 25.7892 84.4559C32.6218 89.5565 40.7206 92.6888 49.207 93.5133C57.6935 94.3378 66.2437 92.8229 73.9303 89.1329C81.6169 85.4429 88.1464 79.7187 92.8107 72.5812C97.475 65.4437 100.096 57.1653 100.389 48.6439C100.771 48.5389 101.109 48.3113 101.349 47.9961C101.589 47.6809 101.719 47.2956 101.719 46.8993C101.719 46.5029 101.589 46.1176 101.349 45.8024C101.109 45.4872 100.771 45.2596 100.389 45.1546L100.381 45.1599Z"
        fill={color}
      />
    </svg>
  );
};
