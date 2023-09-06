import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const PolicyIcon = ({
  width = 24,
  height = 24,
  color = colors.black02,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17 11H16C15.7348 11 15.4804 11.1054 15.2929 11.2929C15.1054 11.4804 15 11.7348 15 12C15 12.2652 15.1054 12.5196 15.2929 12.7071C15.4804 12.8946 15.7348 13 16 13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11ZM17 15H16C15.7348 15 15.4804 15.1054 15.2929 15.2929C15.1054 15.4804 15 15.7348 15 16C15 16.2652 15.1054 16.5196 15.2929 16.7071C15.4804 16.8946 15.7348 17 16 17H17C17.2652 17 17.5196 16.8946 17.7071 16.7071C17.8946 16.5196 18 16.2652 18 16C18 15.7348 17.8946 15.4804 17.7071 15.2929C17.5196 15.1054 17.2652 15 17 15ZM11 9H17C17.2652 9 17.5196 8.89464 17.7071 8.70711C17.8946 8.51957 18 8.26522 18 8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7H11C10.7348 7 10.4804 7.10536 10.2929 7.29289C10.1054 7.48043 10 7.73478 10 8C10 8.26522 10.1054 8.51957 10.2929 8.70711C10.4804 8.89464 10.7348 9 11 9ZM21 3H7C6.73478 3 6.48043 3.10536 6.29289 3.29289C6.10536 3.48043 6 3.73478 6 4V7H3C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V18C2 18.7956 2.31607 19.5587 2.87868 20.1213C3.44129 20.6839 4.20435 21 5 21H18C19.0609 21 20.0783 20.5786 20.8284 19.8284C21.5786 19.0783 22 18.0609 22 17V4C22 3.73478 21.8946 3.48043 21.7071 3.29289C21.5196 3.10536 21.2652 3 21 3ZM6 18C6 18.2652 5.89464 18.5196 5.70711 18.7071C5.51957 18.8946 5.26522 19 5 19C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18V9H6V18ZM20 17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H7.82C7.93642 18.6793 7.9973 18.3411 8 18V5H20V17ZM11 13H12C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11H11C10.7348 11 10.4804 11.1054 10.2929 11.2929C10.1054 11.4804 10 11.7348 10 12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13ZM11 17H12C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15H11C10.7348 15 10.4804 15.1054 10.2929 15.2929C10.1054 15.4804 10 15.7348 10 16C10 16.2652 10.1054 16.5196 10.2929 16.7071C10.4804 16.8946 10.7348 17 11 17Z"
        fill={color}
      />
    </svg>
  );
};

export default PolicyIcon;
