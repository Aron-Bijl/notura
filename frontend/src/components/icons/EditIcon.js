import React from "react"

const EditIcon = (props) => {
  const { width, height, fill="none", className, style, stroke="3" } = props
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

    <g id="Compose">
      <polyline strokeWidth={stroke} fill={fill} points="43,21 43,47 5,47 5,7 26,7 	"/>
      <polygon strokeWidth={stroke} fill={fill} points="27.3,32.7 19.9,38.4 21.1,29.2 32,10.2 38.2,13.8 	"/>
      <path stroke-width={stroke} fill={fill} d="M41.2,1.5L41.2,1.5c1.7,1,2.3,3.2,1.3,4.9l-2.1,3.7l0,0l-6.2-3.6l0,0l2.2-3.8C37.3,1.1,39.5,0.5,41.2,1.5z"/>
    </g>
    </svg>
  )
}

export default EditIcon;
