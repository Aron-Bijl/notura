import React from "react"

const BreadIcon = (props) => {
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
        strokeWidth="2"
        d="M24,1C10.54,1,0,6.07,0,12.55c0,3.31,1.5,5.86,4.58,7.79A3,3,0,0,1,6,22.88V38a9,9,0,0,0,9,9H33a9,9,0,0,0,9-9V22.93a3,3,0,0,1,1.46-2.57A8.92,8.92,0,0,0,48,12.55C48,6.07,37.46,1,24,1ZM42.4,18.66A5,5,0,0,0,40,22.93V38a7,7,0,0,1-7,7H15a7,7,0,0,1-7-7V22.88a5,5,0,0,0-2.36-4.24C3.12,17.06,2,15.18,2,12.55,2,7.37,12.07,3,24,3s22,4.37,22,9.55A6.93,6.93,0,0,1,42.4,18.66Z"
      />
    </svg>
  )
}

export default BreadIcon;
