import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";

const PhoneIcon = ({
  width = 29,
  height = 26,
  color = colors.white,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M15.6338 12.8369H17.6338C17.6338 10.0769 15.3938 7.83685 12.6338 7.83685V9.83685C14.2938 9.83685 15.6338 11.1769 15.6338 12.8369ZM19.6338 12.8369H21.6338C21.6338 10.4499 20.6856 8.16072 18.9977 6.47289C17.3099 4.78506 15.0207 3.83685 12.6338 3.83685V5.83685C16.5038 5.83685 19.6338 8.96685 19.6338 12.8369ZM20.6338 16.3369C19.3838 16.3369 18.1838 16.1369 17.0638 15.7669C16.9638 15.7369 16.8538 15.7169 16.7538 15.7169C16.4938 15.7169 16.2438 15.8169 16.0438 16.0069L13.8438 18.2069C11.005 16.7631 8.69757 14.4557 7.25379 11.6169L9.45379 9.40685C9.58624 9.28119 9.68011 9.12037 9.72439 8.94325C9.76867 8.76613 9.76152 8.58006 9.70379 8.40685C9.32444 7.25491 9.132 6.04965 9.13379 4.83685C9.13379 4.28685 8.68379 3.83685 8.13379 3.83685H4.63379C4.08379 3.83685 3.63379 4.28685 3.63379 4.83685C3.63379 14.2269 11.2438 21.8369 20.6338 21.8369C21.1838 21.8369 21.6338 21.3869 21.6338 20.8369V17.3369C21.6338 16.7869 21.1838 16.3369 20.6338 16.3369ZM5.66379 5.83685H7.16379C7.23379 6.71685 7.38379 7.58685 7.61379 8.41685L6.41379 9.62685C6.01379 8.41685 5.75379 7.15685 5.66379 5.83685ZM19.6338 19.8069C18.3138 19.7169 17.0338 19.4569 15.8338 19.0469L17.0338 17.8469C17.8838 18.0869 18.7538 18.2369 19.6338 18.2969V19.8069Z"
        fill={color}
      />
    </svg>
  );
};

export default PhoneIcon;
