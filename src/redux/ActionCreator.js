export const SET_USER='SET_USER';
 
export const PODCASTS='PODCASTS';



export const setuser=(data)=>(
    {
        type: SET_USER,
        payload: data
    }
);
 
export const podcast=(data)=>(
    {
        type: PODCASTS,
        payload: data

    }
)