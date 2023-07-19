import {SET_USER} from "../ActionCreator";
const initializeState={
    user: null
}
const SetuserReduce=(state=initializeState, action)=>{
    switch(action.type){
        case SET_USER:
             return {
                ...state.user,
                ...action.payload
             }
           
            default: return state
    }
}
export default SetuserReduce