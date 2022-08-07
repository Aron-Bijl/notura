import React from "react"

const SwapIcon = (props) => {
  const { width, height, fill="none", className, style, stroke="3" } = props
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
    <g id="Swap">
	    <path  strokeWidth={stroke} fill={fill}  d="M41,43V14.1c0-3.9-3.2-7.1-7.1-7.1l0,0c-3.4,0-6.4,2.4-7,5.8L23,35.2c-0.6,3.4-3.6,5.9-7,5.8l0,0
		c-3.9,0-7-3.2-7-7.1V5"/>
	    <polyline  strokeWidth={stroke} fill={fill} points="33,35 41,43 49,35 	"/>
	    <polyline  strokeWidth={stroke} fill={fill}  points="17,13 9,5 1,13 	"/>
    </g>
    </svg>
  )
}

export default SwapIcon;
