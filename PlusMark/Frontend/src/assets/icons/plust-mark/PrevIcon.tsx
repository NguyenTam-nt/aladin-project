import { colors } from "@utility/colors";

export const PrevIcon = ({
  width = 24,
  height = 24,
  color = colors.neutral80,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.77 17.77L2 16L12 5.99999L22 16L20.23 17.77L12 9.53999L3.77 17.77Z"
        fill={color}
      />
    </svg>
  );
};
