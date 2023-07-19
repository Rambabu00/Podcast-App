import { PODCASTS} from "../ActionCreator";
const initializeState={
    podcasts:[],
}
const podcastReduce=(state=initializeState, action)=>{
    switch(action.type){
        case PODCASTS:
            return state.podcasts=action.payload;
            default: return state
    }
}
export default podcastReduce