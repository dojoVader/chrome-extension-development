import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {SettingsReducer} from "../reducers/settingsReducer";
import SearchSwitch from "./search-switcher";

type OpenAIResult = {
    text: string;
}
type OpenAIResponse = {
    choices: [OpenAIResult];
}


const ChatGptResult = (props: OpenAIResponse) => {
    const googleSettings: any = useSelector<any>(state => state.settings);


    // @ts-ignore

    const dispatch = useDispatch();

    useEffect(()=> {
        const bodyDOM = document.getElementById('rcnt');
        if(googleSettings.isGoogle && bodyDOM){
                bodyDOM.className = "";

        }

        if(!googleSettings.isGoogle && bodyDOM){
                bodyDOM.className = "hide";
        }


    },[googleSettings.isGoogle])
    const { choices } = props;

    // @ts-ignore
    return (
        <>
            {googleSettings.isGoogle && <SearchSwitch></SearchSwitch>}
            <div className={`chat-gpt-section ${googleSettings.isGoogle ? 'hide' : ''}`}>
                <h5><em>Results from ChatGPT</em></h5>
                {choices.map((item, index) => (
                    React.createElement('div',{
                        dangerouslySetInnerHTML: {
                            __html:item.text
                        },
                        key: index
                    })
                ))}

                <div className="link-section">
                    <a onClick={ e => {
                        dispatch({type: !googleSettings.isGoogle ? 'GOOGLE' : 'OPENAI'})
                    }}>Take me to Google</a>
                </div>

            </div>
        </>
    );
};

export default ChatGptResult;