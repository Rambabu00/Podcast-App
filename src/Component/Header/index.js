import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { auth } from "../../Firebase";
 

import {useAuthState} from "react-firebase-hooks/auth";
import './index.css'
const Header = () => {
    const currentPath=useLocation();
    const [user]=useAuthState(auth)
    return (
        <div className='navbar'>
            <div className='grad-nav'></div>
            <div className='Link'>
  {
    !user? <Link to='/' className={currentPath.pathname==="/" ? "active" : ""}>Signup</Link>: ""
  }
<Link to='/podcast' className={currentPath.pathname==="/podcast"? "active" : ""}>Podcasts</Link>
<Link to='/start-a-podcast' className={currentPath.pathname==="/start-a-podcast" ? "active" : ""}>Start A Podcasts</Link>
<Link to='/profile' className={currentPath.pathname==="/profile" ? "active" : ""}>Profile</Link>

            </div>
        </div>
    );
};

export default Header;
