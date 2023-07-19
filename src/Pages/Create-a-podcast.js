import React, {useState}from 'react';
import Input from '../Component/InputElement';
import Button from '../Component/Button';
import Fileinput from '../Component/Fileinput';
import Loading from '../Component/Loading';
 
 import { useNavigate } from 'react-router-dom';
import { ref} from 'firebase/storage';
import { storage } from '../Firebase';
import { uploadBytes,getDownloadURL } from 'firebase/storage';
import { auth } from '../Firebase';
import { addDoc } from 'firebase/firestore';
import { db } from '../Firebase';
 import { toast } from 'react-toastify';
 import { collection } from 'firebase/firestore';
const CreatePodcast = () => {
    const [title,setTitle]= useState('')
    const [desc,setDesc]= useState('')
    const [disImage,setDisImage]= useState('')
    const [bannerImage,setBannerImage]= useState('')
    const [loading,setLoading] =useState(false);
 const navigate=useNavigate()
 
    
  
  
    const handleSubmit = async () => {
      if (title && desc && disImage && bannerImage) {
        setLoading(true);
        // 1. Upload files -> get downloadable links
        try {
          const bannerImageRef = ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(bannerImageRef, bannerImage);
  
          const bannerImageUrl = await getDownloadURL(bannerImageRef);
  
          const displayImageRef = ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(displayImageRef, disImage);
  
          const displayImageUrl = await getDownloadURL(displayImageRef);
          const podcastData = {
            title: title,
            description: desc,
            bannerImage: bannerImageUrl,
            displayImage: displayImageUrl,
            createdBy: auth.currentUser.uid,
          };
  
           await addDoc(collection(db, "podcasts"), podcastData);
          setTitle("");
          setDesc("");
          setBannerImage(null);
          setDisImage(null);
         
          toast.success("Podcast Created!");
          setLoading(false);
          navigate('/podcast')
        } catch (e) {
          toast.error(e.message);
          console.log(e);
          setLoading(false);
        }
  
        // 2. create a new doc iin a new collection called podcasts
        // 3. save this new podcast episodes states in our podcasts
      } else {
        toast.error("Please Enter All Values");
        setLoading(false);
      }
    };
  

    return (
         <div>
            <div className='input-wrapper'>
                <h1>Create Podcast</h1>
              <Input type='text' placeholder='Enter Title' setState={setTitle} state={title}></Input>
              <Input type='text' placeholder='Enter Discription' setState={setDesc} state={desc}></Input>
              <Fileinput text='Select the displayImage' setState={setDisImage} accept={'image/*'} id='file'></Fileinput>
              <Fileinput text='Select the BannerImage' setState={setBannerImage} accept='image/*' id='banner-file'></Fileinput>
              <Button text={loading ? <Loading /> : 'Create Podcast' } onClick={handleSubmit}></Button>
            </div>
         </div>
    );
};

export default CreatePodcast;
