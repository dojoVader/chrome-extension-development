import {ReducerAction} from "react";

export type SettingsReducer = {
    settings : SearchOption;
}

type SearchOption = {
    isGoogle: boolean;
}

const initState = {
    isGoogle: false,
}

const settingsReducer = (state = initState, action: {type: string}) => {
    switch (action.type) {
        case 'GOOGLE':
            return {...state,
                isGoogle:true
            }
        case 'OPENAI':
            return {...state,
                isGoogle:false
            }
        default:
            return state

    }
}

export default settingsReducer;