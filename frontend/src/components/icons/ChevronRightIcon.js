import React from "react"

const ChevronRightIcon = (props) => {
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
      <polygon stroke-width="2" points="17.41 8 16 9.41 29.17 24 16 38.59 17.41 40 32 24 17.41 8"/>
    </svg>
  )
}

export default ChevronRightIcon;
