import React from "react"

const CheckIcon = (props) => {
  const { width, height, fill, className, style } = props
  return (
    <svg
      className={className}
      viewBox="-4 -5 24 24"
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
        stroke="none"
        d="M5.98342301,8.62083755 L2.92113518,6.19075581 L2.92113518,6.19075581 C2.52475208,5.87620558 1.95586894,5.90732985 1.59616788,6.26324634 L0.959514871,6.89320083 L0.959514871,6.89320083 C0.594139673,7.25473175 0.562350154,7.83437344 0.885997743,8.23369271 L5.2466429,13.6138954 L5.2466429,13.6138954 C5.59439201,14.0429514 6.22411693,14.1088636 6.65317287,13.7611145 C6.69371383,13.7282561 6.73162055,13.6922747 6.76654568,13.6535 L17.0639568,2.22107107 L17.0639568,2.22107107 C17.4213804,1.82425092 17.4039137,1.21660822 17.0242859,0.840974635 L16.6411512,0.461871039 L16.6411512,0.461871039 C16.2672586,0.0919123331 15.6706798,0.0748389377 15.276241,0.422808882 L5.98342301,8.62083755 Z"
      />
    </svg>
  )
}

export default CheckIcon;
