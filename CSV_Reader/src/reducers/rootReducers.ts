import {combineReducers} from 'redux';
import importReducer from "./importReducer";
import exportReducer from "./exportReducer";
import processReducer from "./processReducer";
import {LOAD} from 'redux-storage';

const globalReducer = (state = {},action) => {
        switch(action.type){
                case LOAD:
                        return state;
                        break;

                default:
                        return state;
                        break;


        }
}

const rootReducer = combineReducers({
        importRecords: importReducer,
        exportRecords: exportReducer,
        processData: processReducer,
        global: globalReducer
})



export default rootReducer;