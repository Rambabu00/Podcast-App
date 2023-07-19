import SetuserReduce from "./SetuserReduce";
import podcastReduce from "./PodcastReduce";
 
import { combineReducers} from "redux";
export const RootReduce=combineReducers({
    podcastReduce,
    SetuserReduce,
})