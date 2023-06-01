import {ReducerAction} from "react";

export type ProcessReducer = {
    running: boolean
}




const initState =  {
   running: false
}

const processReducer = (state: ProcessReducer = initState, action: {type: string}) => {
    switch (action.type) {

        case 'STOP':

            return {
                ...state, running: false
            }
            break;

        case 'START':
            return {
                ...state,
                running: true
            }
        default:
            return {...state}

    }
}

export default processReducer;