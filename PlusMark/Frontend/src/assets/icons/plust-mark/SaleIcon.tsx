import { colors } from "@utility/colors";

export const SaleIcon = ({ width = 154, height = 54, color = colors.darkOrange }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 154 54" fill="none">
            <path d="M122.784 27.0045L154 54H0V0H154L122.784 27.0045Z" fill={color} />
        </svg>
    )
}