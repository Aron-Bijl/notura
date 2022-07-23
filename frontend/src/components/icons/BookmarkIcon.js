import React from "react"

const BoookmarkIcon = (props) => {
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
      <path
        fill="none"
        fillRule="evenodd"
        stroke-width="2"
        d="M10,0V48l13.51-4.93L38,48V0H10ZM36,45.13l-12.51-4.2L12,45V2H36V45.13Z"
      />
    </svg>
  )
}

export default BoookmarkIcon;
