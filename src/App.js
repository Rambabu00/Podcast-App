import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { onSnapshot } from 'firebase/firestore';
import { doc} from 'firebase/firestore';
import  {setuser}  from './redux/ActionCreator';
import { db } from './Firebase';
import {Routes,Route} from 'react-router-dom';
import Sign from './Pages/Signup';
import Header from './Component/Header';
import Podcast from './Pages/Podcast';
import Profile from './Pages/Profile';
import PodcastDetails from './Pages/PodcastDeatil';
import CreateAnEpisodePage from './Pages/CreateAnEpisode';
import PrivateRouter from './Component/PrivateRouter';
import CreatePodcast from './Pages/Create-a-podcast';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRouter1 from './Component/PrivateRouter1';
import AudioPlayer from './Component/AudioPlayer';
 
 
 
 
 const App = () => {
   const dispatch = useDispatch();
 const [state,setState]=useState(false);
 const [flag, setFlag]=useState(false);
 const [audio,setAudio]=useState("");
 const [image, setImage]=useState("");
  useEffect(   () => {
    const unsubscribeAuth = onAuthStateChanged(auth,  (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
         async (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
           console.log('user data from App.js')
             if(userData){
dispatch(setuser(userData))
             }
          
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);
    return (
       <div className='App'>
      {
        flag && audio ?
      
       <AudioPlayer  audioSrc={audio} image={image} setState={setState} state={state}/>
       : ""
      }
        <Header />
        
        <ToastContainer />
<Routes>
    <Route element={<PrivateRouter1 />}>
    <Route path='/' element={<Sign />}></Route>
    </Route>
    <Route element={<PrivateRouter />}> 
     
    <Route path='/podcast' element={<Podcast />}>   
    </Route>
    <Route path='/profile' element={<Profile setFlag={setFlag}/>}></Route>
    <Route path='/start-a-podcast' element={<CreatePodcast />}></Route>
    <Route path="/podcast/:id" element={<PodcastDetails   setState={setState} setFlag={setFlag}  setAudio={setAudio} setImage={setImage} />} />
   <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage />}></Route>
    </Route>
 
   
</Routes>
       </div>
    );
 };
 
 export default App;
 