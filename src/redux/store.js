import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { RootReduce } from "./Reduce/rootReduce";
const store=createStore(RootReduce,applyMiddleware(thunk));
export default store