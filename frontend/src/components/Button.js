import React from "react";
import './Button.css';

const STYLES = [
    'btn--primary', 
    'btn--outline',
    'btn--tertairy',
    'btn'
];

const SIZES = [
    'btn-medium',
    'btn-large'
]
const ACTIVITY = [
    'active',
    'inactive'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    activity,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const checkButtonActivity = ACTIVITY.includes(activity) ? activity : ACTIVITY[0];

    let value = false;
    if(checkButtonActivity === "inactive"){
        value = true;
    }else{
        value = false;
    }

    return(
        <button disabled={value} className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonActivity}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}