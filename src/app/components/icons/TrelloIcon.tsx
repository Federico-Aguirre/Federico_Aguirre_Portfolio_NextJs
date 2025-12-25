import React from "react";

export const TrelloIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="trello_linear_gradient"
        >
          <stop stopColor="#0091E6" offset="0%" />
          <stop stopColor="#0079BF" offset="100%" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <rect
            fill="url(#trello_linear_gradient)"
            x="0"
            y="0"
            width="256"
            height="256"
            rx="25"
          />
          <rect
            fill="#FFFFFF"
            x="144.64"
            y="33.28"
            width="78.08"
            height="112"
            rx="12"
          />
          <rect
            fill="#FFFFFF"
            x="33.28"
            y="33.28"
            width="78.08"
            height="176"
            rx="12"
          />
        </g>
      </g>
    </svg>
  );
};