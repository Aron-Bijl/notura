import React from "react"

const ChevronLeftIcon = (props) => {
  const { width, height, className, style } = props
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

    <polygon strokeWidth="2" points="30.59 8 32 9.41 18.83 24 32 38.59 30.59 40 16 24 30.59 8"/>
    </svg>
  )
}

export default ChevronLeftIcon;
