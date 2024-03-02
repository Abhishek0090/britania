import React from "react";

const CustomSvg = ({ color, text }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100px"
      height="100px"
      viewBox="0 0 981.25 981.25"
      xmlSpace="preserve"
    >
      <defs>
        <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <linearGradient id="bronze" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "rgb(184, 115, 51)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgb(139, 69, 19)", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "silver", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "gray", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#FDB931", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#9f7928", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="platinum" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "rgb(224, 224, 224)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#8894a8", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="diamond" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "#b9f2ff", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#6a89bd", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <g filter="url(#drop-shadow)">
        <path
          d="M946.23,206.651c-0.3-23-18-42-40.899-44.101c-190.3-17.8-345.601-119.5-396.8-156.7c-10.7-7.8-25.2-7.8-35.9,0
            c-51.1,37.2-206.4,138.9-396.7,156.7c-22.9,2.101-40.5,21.101-40.9,44.101c-2.3,150.1,21.8,659.699,444.1,773.1
            c7.5,2,15.4,2,22.9,0C924.331,866.451,948.43,356.75,946.23,206.651z"
          fill={`url(#${color})`}
        />
        <text
          x="50%"
          y="60%"
          fontFamily="Arial"
          fontSize="500"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

export default CustomSvg;
