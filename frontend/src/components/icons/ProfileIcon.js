import React from "react"

const ProfileIcon = (props) => {
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
        d="M14.58,16.83C15.59,22.4,19.29,26,24,26s8.33-3.51,9.42-9.16c0.1-.54,1-5.31,1.07-6.41a9.65,9.65,0,0,0-2.71-7.15,10.86,10.86,0,0,0-15.63.07,9.47,9.47,0,0,0-2.63,7.1C13.58,11.53,14.48,16.3,14.58,16.83Zm3-12.1a8.86,8.86,0,0,1,12.73-.06,7.66,7.66,0,0,1,2.16,5.68c0,0.72-.64,4.05-1,6.12C30.76,20.11,28.43,24,24,24s-6.82-4.05-7.45-7.54c-0.4-2.07-1-5.41-1-6.13A7.49,7.49,0,0,1,17.6,4.73Z M46.88,38.62c-0.48-2.8-2.84-4.94-6.37-5.73L24,30,7.45,32.91c-3.42.71-5.84,2.91-6.33,5.76L0,48H48ZM2.14,46l0.95-7c0.41-2.38,2.73-3.68,4.74-4.1L24,32l16.12,2.83c1.28,0.29,4.3,1.27,4.78,4.07l1,7.08H2.14Z"
      />
    </svg>
  )
}

export default ProfileIcon;
