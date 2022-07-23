import React from "react"

const EmailIcon = (props) => {
  const { width, height, fill, className, style, stroke="2" } = props
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
        stroke-width={stroke}
        d="M39.75,0H8.25L0,29,1.9,40.48A9,9,0,0,0,10.78,48H37.22a9,9,0,0,0,8.88-7.52L48,29Zm-30,2H38.25l7.43,26H30.25l-0.83,2.92a5.63,5.63,0,0,1-10.82,0L17.75,28H2.33ZM37.22,46H10.78a7,7,0,0,1-6.9-5.85L2.18,30H16.25l0.42,1.47a7.63,7.63,0,0,0,14.67,0L31.75,30H45.82L44.13,40.15A7,7,0,0,1,37.22,46Z"
      />
    </svg>
  )
}

export default EmailIcon;
