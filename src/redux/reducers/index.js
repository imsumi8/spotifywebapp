import playlistReducer from "./playlistReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  data:playlistReducer
});

export default rootReducer;
