import React from "react"

const TimeIcon = (props) => {
  const { width, height, fill="none", className, style, stroke="3" } = props
  return (
    <svg
      className={className}
      viewBox="-1 -1 50 50"
      width={width}
      height={height}
      style={style}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
    <g id="Clock">
      <circle strokeWidth={stroke} fill={fill} cx="24" cy="24" r="23"/>
      <polyline strokeWidth={stroke} fill={fill} points="25,7 25,25 13,25 	"/>
    </g>
    </svg>
  )
}

export default TimeIcon;
