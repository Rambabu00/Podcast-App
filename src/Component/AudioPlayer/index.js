import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Button from '../Button'
function AudioPlayer({ audioSrc, image, state,setState}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();
 const imagRef=useRef()
 const spanRef=useRef()
 
  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };
 if(isPlaying){
  

 }
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
 imagRef.current.style.animation='rotate 4s linear infinite'
 spanRef.current.style.animation='bounce 2.2s ease infinite alternate'
 
    } else {
      audioRef.current.pause();
      imagRef.current.style.animation="none";
      spanRef.current.style.animation='none';
      
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);
 
  return (
    <div className={state===true ? "custom-audio-player" : "custom-audio-player1"}>
     
      <div className='music-bar-icon'>
  <span ref={spanRef}/>
  <span  ref={spanRef}/>
  <span ref={spanRef}/>
</div>
      <img src={image} ref={imagRef} className="display-image-player" id="display-image-audio" alt="audio-png"/>
      <audio ref={audioRef} src={audioSrc} />
      <p className="audio-btn" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          step={0.01}
          className="duration-range"
        />
        <p>-{formatTime(duration - currentTime)}</p>
      </div>
      <p className="audio-btn" onClick={toggleMute}>
        {!isMute ? <FaVolumeUp /> : <FaVolumeMute />}
      </p>
      <input
        type="range"
        value={volume}
        max={1}
        min={0}
        step={0.01}
        onChange={handleVolume}
        className="volume-range"
      />
 <Button text="close" onClick={()=>{setState(false)}} width='6rem'></Button>
    </div>
  );
}

export default AudioPlayer;