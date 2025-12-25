import React, { SVGProps } from "react";

const SunIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 64 64"
      width="50px"
      height="50px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="32" cy="32" r="17" fill="#efcc00" />
      <g
        fill="none"
        stroke="#efcc00"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3px"
      >
        <line x1="32" x2="32" y1="5" y2="11" />
        <line x1="32" x2="32" y1="53" y2="59" />
        <line x1="59" x2="53" y1="32" y2="32" />
        <line x1="11" x2="5" y1="32" y2="32" />
        <line x1="51.09" x2="46.85" y1="12.91" y2="17.15" />
        <line x1="17.15" x2="12.91" y1="46.85" y2="51.09" />
        <line x1="51.09" x2="46.85" y1="51.09" y2="46.85" />
        <line x1="17.15" x2="12.91" y1="17.15" y2="12.91" />
      </g>
    </svg>
  );
};

export default SunIcon;