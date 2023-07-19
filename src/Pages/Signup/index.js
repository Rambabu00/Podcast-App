import React,{useState} from 'react';
import Signup from '../../Component/SignupForm/Signup';
import Login from '../../Component/SignupForm/Login';
 import '../../index.css'
const Sign = () => {
     const [flag,setflag]=useState(false)
    return (
        <div className='main'>  
        <div className='input-wrapper'>
        {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <Signup /> : <Login />}
        {!flag ? <p onClick={()=>setflag(!flag)} style={{cursor: 'pointer', color: 'var(--grey)'}}>Do you have already an Account? Click Here To Login</p> : <p onClick={()=>setflag(!flag)} style={{cursor: 'pointer', color: 'var(--grey)'}} >Don't have an Account? Click Here To Signup</p>}
</div>
</div>
        
    );
};

export default Sign;
