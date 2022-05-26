/** root reducer */
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드.
// store에 저장되는 reducer는 오직 1개여야 함.
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
