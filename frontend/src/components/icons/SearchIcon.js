import React from "react"

const SeaarchIcon = (props) => {
  const { width, height, fill, className, style, stroke } = props
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
      
    <circle fill={fill} strokeWidth={stroke} cx="17" cy="17" r="16"/>
	  <line  fill={fill} strokeWidth={stroke} x1="28.3" y1="28.3" x2="47" y2="47"/>
    </svg>
    
  )
}

export default SeaarchIcon;
