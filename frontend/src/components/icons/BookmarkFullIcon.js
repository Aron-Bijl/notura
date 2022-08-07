import React from "react"

const BoookmarkFullIcon = (props) => {
  const { width, height, className, style, fill } = props
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
    <polygon id="Bookmark"  fill={fill} strokeWidth="2" points="37 47 23.5 42 11 47 11 1 37 1 37 47"/>
    </svg>
  )
}

export default BoookmarkFullIcon;
