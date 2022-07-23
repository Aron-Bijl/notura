import React from "react"

const KeyIcon = (props) => {
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
      <path
        fill={fill}
        fillRule="evenodd"
        stroke={stroke}
        stroke-width="2"
        d="M36,9a4,4,0,1,0,4,4A4,4,0,0,0,36,9Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,36,15Z M42.66,4.88a15.53,15.53,0,0,0-20.5,0,15.86,15.86,0,0,0-4.05,18.2l-3.59,3.62-0.6,4.25-4.63.67L8.63,36.27l-4.22.61L0,41.32l4,4a5.7,5.7,0,0,0,8.1,0L26.13,31.14a15.5,15.5,0,0,0,17.3-3.28A15.86,15.86,0,0,0,48,16.21,15.66,15.66,0,0,0,42.66,4.88ZM42,26.45A13.53,13.53,0,0,1,26.36,29l-0.64-.32L10.66,43.9a3.81,3.81,0,0,1-5.3,0L2.8,41.32l2.54-2.56,5-.73L11,33.37l4.63-.67,0.72-5.08,4.12-4.15-0.32-.64A13.84,13.84,0,0,1,23.47,6.36,13.62,13.62,0,0,1,46,16.28,13.66,13.66,0,0,1,42,26.45Z"
      />
    </svg>
  )
}

export default KeyIcon;
