import React from "react"

const ForkKnifeIcon = (props) => {
  const { width, height, fill="none", className, style, stroke="2" } = props
  return (
    <svg
      className={className}
      viewBox="0 -1 50 50"
      width={width}
      height={height}
      style={style}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
    <g id="ForkKnife">
      <path stroke-width={stroke} fill={fill} d="M41,0A11,11,0,0,0,30,11v7.19a8.94,8.94,0,0,0,2.64,6.36L34,25.91V44a4,4,0,0,0,8,0V0H41ZM40,44a2,2,0,0,1-4,0V25.09l-1.95-2A7,7,0,0,1,32,18.19V11a9,9,0,0,1,8-8.94V44Z"/>
      <path stroke-width={stroke} fill={fill} d="M23,1.08l1,13a7.45,7.45,0,0,1-2.08,4.44L18,22.6V44a2,2,0,0,1-4,0V22.6l-3.87-4A7.85,7.85,0,0,1,8,14.08l1-13L7,0.92,6,14c0,2.28,1.41,4.45,2.64,5.92L12,23.4V44a4,4,0,0,0,8,0V23.4l3.41-3.53C25.15,17.78,26,15.89,26,14L25,0.92Z"/>
      <rect stroke-width={stroke} fill={fill} x="12" y="2" width="1" height="14"/>
      <rect stroke-width={stroke} fill={fill} x="18" y="2" width="1" height="14"/>
    </g>
    </svg>
  )
}

export default ForkKnifeIcon;
