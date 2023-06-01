import {combineReducers} from 'redux';
import sidebarReducer from "./settingsReducer";


const rootReducer = combineReducers({
        settings: sidebarReducer,
})

export default rootReducer;