import React, {useState} from 'react';
import { doc,getDoc } from 'firebase/firestore';
import { auth } from '../../../Firebase';
import { setuser } from '../../../redux/ActionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Input from '../../InputElement';
import Button from '../../Button';
 import Loading from '../../Loading';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password, setPassword]= useState('');
    const [loading,setLoading] =useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
      console.log("Handling Login");
      setLoading(true);
      if (email && password) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
  
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          console.log("userData from login.js");
   if(userData){
    dispatch(setuser(userData))
   }
          toast.success("Login Successful!");
          setLoading(false);
          navigate("/profile");
          // Navigate to the profile page
        } catch (error) {
          console.error("Error signing in:", error);
          setLoading(false);
          toast.error(error.message);
        }
      } else {
        toast.error("Make sure email and password are not empty");
        setLoading(false);
      }
    };
    return (
        <>
            <Input type='email' placeholder='Enter Email' setState={setEmail} state={email}></Input>
            <Input type='password' placeholder='Enter password' setState={setPassword} state={password}></Input>
            <Button text={loading ? <Loading /> : 'Login'} onClick={handleLogin}></Button>
        </>
    );
};

export default Login;
