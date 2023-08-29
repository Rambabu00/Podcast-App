import { Outlet,useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import Loader1 from "./Loader";

import {useAuthState} from "react-firebase-hooks/auth";
const PrivateRouter1=()=>{
    const navigate=useNavigate()
    const [user, loading,error]=useAuthState(auth)
    if(loading)
    return <Loader1 />
    else if(!user || error)
    return <Outlet />
    else {
       return navigate("/podcast")
    }
}
export default PrivateRouter1