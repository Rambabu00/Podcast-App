import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
 import Fileinput from "../Component/Fileinput";
 import Input from "../Component/InputElement";
 import Button from "../Component/Button";
 import Loading from "../Component/Loading";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../Firebase";
 import { addDoc,collection } from "firebase/firestore";

function CreateAnEpisodePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
 

   

  const handleSubmit = async () => {
    setLoading(true);
    if ((title, desc, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);

        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioURL,
        };

        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Successfully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile("");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All Files Should Be There");
      setLoading(false);
    }
  };

  return (
    <div>
    
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <Input
          state={title}
          setState={setTitle}
          placeholder="Title"
          type="text"
          required={true}
        />
        <Input
          state={desc}
          setState={setDesc}
          placeholder="Description"
          type="text"
          required={true}
        />
        <Fileinput
          accept="audio/*"
          id="audio-file"
          setState={setAudioFile}
          text="Upload Audio File"
        />
        <Button
          text={loading ? <Loading /> : "Create Episode"}
       
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateAnEpisodePage;