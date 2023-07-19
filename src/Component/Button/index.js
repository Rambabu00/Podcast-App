import React from 'react';
import './index.css'
const Button = ({text,onClick, width}) => {
    return (
       <button className='custom-btn' onClick={onClick}  style={{width: width}}>{text}</button>
    );
};

export default Button;
