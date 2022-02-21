import { combineReducers } from "redux";
import reducer from "./reducers";


const reducers = combineReducers({
    allData: reducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>