import React, { SVGProps } from "react";

const MoonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 35 32"
      width="50px"
      height="50px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30.9,20.8c-2.2,6.1-8,10.2-14.5,10.2C7.9,31,1,24.2,1,15.8C1,8.7,5.9,2.6,12.9,1c0.3-0.1,0.7,0,1,0.3 c0.2,0.3,0.3,0.7,0.2,1c-0.5,1.4-0.8,2.9-0.8,4.4c0,7.3,6,13.2,13.4,13.2c1,0,2.1-0.1,3.1-0.4c0.3-0.1,0.7,0,1,0.3 C31,20.1,31.1,20.5,30.9,20.8z"
        fill="#FFC10A"
      />
    </svg>
  );
};

export default MoonIcon;