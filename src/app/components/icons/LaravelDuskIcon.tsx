import React from "react";

export const LaravelDuskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width="800px"
      height="800px"
      {...props}
    >
      <defs>
        <linearGradient
          id="dusk-grad"
          x1="40"
          y1="0"
          x2="40"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9B27AD" />
          <stop offset="1" stopColor="#F44F4F" />
        </linearGradient>
      </defs>
      <path
        d="M40 80C17.9 80 0 62.1 0 40C0 17.9 17.9 0 40 0C62.1 0 80 17.9 80 40C80 62.1 62.1 80 40 80Z"
        fill="url(#dusk-grad)"
      />
      <path
        d="M33.9 45.5C25.5 37.1 23.5 24.6 28.1 14.3C25.1 15.7 22.2 17.6 19.7 20.1C8.8 31 8.8 48.8 19.7 59.7C30.6 70.6 48.4 70.6 59.3 59.7C61.8 57.2 63.7 54.4 65.1 51.3C54.9 55.9 42.4 54 33.9 45.5ZM39.6 63.9C33.2 63.9 27.2 61.4 22.6 56.9C13.5 47.8 13.3 33.2 21.8 23.8C21.3 32.8 24.5 41.8 31.1 48.4C37.1 54.4 45.2 57.8 53.7 57.8C54.4 57.8 55 57.8 55.7 57.7C51.3 61.7 45.6 63.9 39.6 63.9Z"
        fill="white"
      />
    </svg>
  );
};