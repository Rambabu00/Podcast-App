import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { db,auth, storage } from '../../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';
 import { getDownloadURL, uploadBytes } from 'firebase/storage';
 import { ref } from 'firebase/storage';
import { setuser } from '../../../redux/ActionCreator';
import {useDispatch} from 'react-redux'
import Input from '../../InputElement';
 import Loading from '../../Loading';
import Button from '../../Button';
  import Fileinput from '../../Fileinput';
 

const Signup = () => {
   const navigate=useNavigate()
   const dispatch=useDispatch();
    const [fullname,setfullName]=useState('');
    const[email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
   const [profile,setProfile]=useState(null)
    const [loading,setLoading] =useState(false)
   
    async function  handleSignup(){
    
      setLoading(true)
      if(fullname && email && password && confirmPassword && profile){
         if(password!==confirmPassword){
            toast.error('make sure password and confirm password same!')
            setLoading(false)
         }
        else if(password.length<6){
            toast.error('password must contains 6 characters')
            setLoading(false)
         }
         else{
            try {
            const creadentail=await createUserWithEmailAndPassword(auth,email,password)
            const user=creadentail.user;
           const profileRef=await ref(storage, `profile/${user.uid}`) 
           console.log(profileRef)    
           await uploadBytes(profileRef,profile)  
const imageUrl=await getDownloadURL(profileRef)
           await setDoc(doc(db,'users',user.uid),{
             name:fullname,
             email:user.email,
             uid:user.uid,
         imageUrl
            });
            dispatch(setuser({
               name: fullname,
               email:email,
               uid:user.uid,
               imageUrl
            }))
      toast.success('user created')
            setLoading(false)
            navigate('/profile')
            } catch (Error) {
              
               toast.error(`${Error}`)
               setLoading(false)
            }
         }
      }
      else{
         toast.error('All the fileds are important!')
         setLoading(false)
      }
   }
    return (
    <>
          
       <Input type='text' placeholder="Full Name" setState={setfullName} state={fullname} required={true}></Input>
       <Input type='email' placeholder="Enter Email" setState={setEmail} state={email} required={true}></Input>
 
       <Input type='password' placeholder="Password" setState={setPassword} state={password} required={true}></Input>
       <Input type='password' placeholder="Confirm Password" setState={setConfirmPassword} state={confirmPassword} required={true}></Input>
       <Fileinput text="upload profile picture" setState={setProfile} accept="image/*" id='profile-file'></Fileinput>
        <Button text={loading ? <Loading /> : 'Signup'} onClick={handleSignup}></Button>
       </>  
    );
};

export default Signup;
