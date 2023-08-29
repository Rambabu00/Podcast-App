import React, {useState} from 'react';
 import {useSelector} from 'react-redux';
 import Button from '../Component/Button';
 import Loading from '../Component/Loading';
 import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { toast } from 'react-toastify';
 import Loader1 from '../Component/Loader';
const Profile = ({setFlag}) => {
    const user=useSelector((state)=>state.SetuserReduce);
  console.log('user data  from redux')
    const [loading,setLoading]=useState(false)
     
  
   

if(!user){
    return <Loader1 />
}

    async  function handleLogOut(){
        setLoading(true)
    try {
        await signOut(auth)
        setFlag(false)
        setLoading(false)
        toast.success('user logouted!')
    } catch (error) {
        toast.error(`${error}`)
        setLoading(false)
    }

    }
    return (
        <div className='input-wrapper-profile'>
        <h1 style={{marginTop: "1rem"}}>Profile</h1>
       
     <div style={{display: "flex", flexDirection: "column" ,gap: "1rem"}}>
        <img src={user.imageUrl} alt='profilePic' style={{width: "20rem", height: "20rem", borderRadius: "50%", padding: "1.5rem"}}></img> 
          <p> <h3 style={{display:"inline-block"}}>Name: </h3> {user.name}</p>
   <p><h3 style={{display: 'inline-block'}}>Email: </h3>   {user.email}</p>
   <Button text={loading ? <Loading /> : "Logout"} onClick={handleLogOut} width="20vw"></Button>      </div> 
       
   
         </div>
    
     
    );
};

export default Profile;
