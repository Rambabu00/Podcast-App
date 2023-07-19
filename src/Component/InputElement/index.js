import React from 'react';
import './index.css'
const Input = ({type,placeholder,required,state,setState}) => {
    return (
        <input type={type} placeholder={placeholder} required={required} className='input-class' value={state} onChange={(e)=>setState(e.target.value)}>
           
             
        </input>
    );
};

export default Input;
