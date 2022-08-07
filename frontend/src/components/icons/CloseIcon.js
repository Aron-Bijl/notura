import React from "react"

const CloseIcon = (props) => {
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
      <polygon fill={fill} strokeWidth={stroke} points="39 10.44 37.56 9 24 22.56 10.44 9 9 10.44 22.56 24 9 37.56 10.44 39 24 25.44 37.56 39 39 37.56 25.44 24 39 10.44"/>
    </svg>
    
  )
}

export default CloseIcon;
