import React, {useState,useEffect} from 'react';
 import { podcast } from '../../redux/ActionCreator';
 import { useSelector } from 'react-redux';
 
import { onSnapshot,query } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
 import { db } from '../../Firebase';
 import Input from '../../Component/InputElement';
 import { useDispatch } from 'react-redux';
 import PodcastCard from '../../Component/PodcastCard';
 
 
const Podcast = () => {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcastReduce);
    console.log('podcasts data',podcasts)
    const [search, setSearch] = useState("");
 const [Filter,setFilter]=useState([])
    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(collection(db, "podcasts")),
         (querySnapshot) => {
          const podcastsData = [];
          querySnapshot.forEach((doc) => {
            podcastsData.push({ id: doc.id, ...doc.data() });
          });
          dispatch(podcast(podcastsData));
          setFilter(podcastsData)
          
        },
        (error) => {
          console.error("Error fetching podcasts:", error);
        }
      );
   
    
  
    
      return () => {
        unsubscribe();
      };
    }, [dispatch]);
  
    let filterData=Filter.filter((item)=> item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
   
  
    return (
      <div>
         
        <div className="input-wrapper" style={{ marginTop: "2rem" }}>
          <h1>Discover Podcasts</h1>
           
          <Input
            state={search}
            setState={setSearch}
            placeholder="Search By Title"
            type="text"
          />
   
          {filterData.length > 0 ? (
            <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
              {filterData.map((item) => {
                return (
                  <PodcastCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    displayImage={item.displayImage}
                  />
                );
              })}
            </div>
          ) : (
            <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
          )}
        </div>
    
      </div>
    );
};

export default Podcast;
