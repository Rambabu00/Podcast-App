import React,{useState}from 'react';
import './index.css';
 
const Fileinput = ({setState,accept,text, id}) => {
  
    const [SelectedImage,setSelectedImage]= useState('')
 
 
    return (
        <>
        <label htmlFor={id} className='file-label'>{SelectedImage ? `The File ${SelectedImage} was selected` : text}</label>
               <input type='file' id={id}  accept={accept} className='input-class1'  onChange={(e)=>{
            
                setState(e.target.files[0])
               setSelectedImage(e.target.files[0].name)
            }}></input>
        </>
    );
};

export default Fileinput;
