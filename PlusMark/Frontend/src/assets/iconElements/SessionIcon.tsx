import { colors } from "@utility/colors";
import { IconProps } from "@utility/types";
import React from "react";

const SessionIcon = ({
  width = 46,
  height = 42,
  color = colors.white,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 46 42"
      fill="none"
    >
      <g clipPath="url(#clip0_628_6913)">
        <path
          d="M32.3029 19.8376H32.8066C34.6513 19.8376 36.0203 18.4939 36.0203 16.9023V14.4133H28.8475V16.9023C28.8475 18.4939 30.4582 19.8376 32.3029 19.8376ZM20.739 35.6458H39.139V22.4723H20.739V35.6458ZM21.8305 23.5572H37.8915V34.5609H21.8305V23.5572ZM36.0203 2.89661C36.0203 1.30494 34.6497 0 32.8066 0H32.3029C30.4582 0 28.8475 1.30494 28.8475 2.89661V12.3985H36.0203V2.89661ZM26.5085 2.89661C26.5085 1.30494 25.3951 0 23.552 0H23.0483C21.2037 0 19.6475 1.30494 19.6475 2.89661V12.3985H26.5085V2.89661ZM43.8045 2.69823C43.3538 1.10037 42.2826 0 40.7981 0H40.413C38.9285 0 37.7356 1.30494 37.7356 2.89661V12.3985H45.9626L43.8045 2.69823ZM37.7356 14.4133V16.9023C37.7356 18.4831 39.4508 19.7663 41.7898 19.7834V36.1479C41.7898 38.4835 39.6193 40.2952 36.9123 40.2952H17.6203V22.4723H7.48475V39.9682C6.08136 39.2878 4.8339 37.8325 4.8339 36.1479V19.771C6.70508 19.6362 8.26441 18.4041 8.26441 16.9007V14.4133H0V16.9023C0 18.2041 0.935593 19.303 2.80678 19.661V36.1479C2.80678 39.4692 5.80224 42 9.6522 42H36.9138C40.7622 42 43.9744 39.4692 43.9744 36.1479V19.5912C45.2219 19.1759 46.0016 18.1282 46.0016 16.9007V14.4133H37.7356ZM10.1356 34.0556C10.1356 34.3889 9.84712 34.6601 9.51186 34.6601C9.17661 34.6601 8.88814 34.3889 8.88814 34.0556V29.8246C8.88814 29.4914 9.17661 29.2202 9.51186 29.2202C9.84712 29.2202 10.1356 29.4914 10.1356 29.8246V34.0556ZM8.26441 2.89661C8.26441 1.30494 7.52373 0 6.03925 0H5.6541C4.16963 0 3.09837 1.10037 2.64773 2.69823L0.213627 12.3985H8.26441V2.89661ZM23.0468 19.8376H23.5504C25.3951 19.8376 26.5069 18.4939 26.5069 16.9023V14.4133H19.6459V16.9023C19.6475 18.4939 21.2037 19.8376 23.0468 19.8376ZM13.7922 19.8376H14.2959C16.1405 19.8376 17.4644 18.4939 17.4644 16.9023V14.4133H10.1356V16.9023C10.1356 18.4939 11.9475 19.8376 13.7922 19.8376ZM17.4644 2.89661C17.4644 1.30494 16.1405 0 14.2959 0H13.7922C11.9475 0 10.1356 1.30494 10.1356 2.89661V12.3985H17.4644V2.89661ZM23.4226 27.128L25.47 25.0931C25.6586 24.9055 25.6586 24.6018 25.47 24.4142C25.2813 24.2267 24.9757 24.2267 24.787 24.4142L22.7396 26.4492C22.5509 26.6367 22.5509 26.9404 22.7396 27.128C22.9283 27.3155 23.2339 27.3155 23.4226 27.128ZM27.9727 27.5805L25.9253 29.6154C25.7366 29.803 25.7366 30.1067 25.9253 30.2942C26.114 30.4818 26.4196 30.4818 26.6083 30.2942L28.6557 28.2593C28.8443 28.0718 28.8443 27.768 28.6557 27.5805C28.4654 27.393 28.1614 27.393 27.9727 27.5805ZM28.4264 24.6421C28.2378 24.4545 27.9321 24.4545 27.7435 24.6421L22.9673 29.3892C22.7786 29.5767 22.7786 29.8804 22.9673 30.0664C23.1559 30.2539 23.4616 30.2539 23.6502 30.0664L28.4264 25.3193C28.6151 25.1318 28.6151 24.8296 28.4264 24.6421Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_628_6913">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SessionIcon;