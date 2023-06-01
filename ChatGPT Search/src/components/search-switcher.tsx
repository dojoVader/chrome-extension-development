import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {SettingsReducer} from "../reducers/settingsReducer";

const SearchSwitch = () => {
    const dispatcher = useDispatch();
    const settings: any = useSelector<SettingsReducer>( state  => state.settings);

    return (
        <>
            <div>
                <span><a onClick={ e => dispatcher({type: settings.isGoogle ? 'OPENAI':'GOOGLE'})}>Switch to { !settings.isGoogle ? ' Google' : 'OpenAI'}</a></span>
            </div>
        </>
    )
}

export default SearchSwitch;