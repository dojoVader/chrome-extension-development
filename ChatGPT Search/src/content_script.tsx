import React, {ChangeEvent, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import search = chrome.bookmarks.search;
import {CONFIGURATION} from "./configuration";
import ChatGptResult from "./components/chat-gpt-result";
import {legacy_createStore as createStore} from "redux";
import rootReducer from "./reducers/rootReducers";
import {Provider} from "react-redux";


const store = createStore(rootReducer);


// ReactDOM.render(
//         <React.StrictMode>
//
//         </React.StrictMode>
// , null);
//
// ReactDOM.render(
//     <React.StrictMode>
//
//     </React.StrictMode>
// ,null);

// Get a reference to the current url and read the query

const documentSearch = document.location.search;
const filteredSearchParams = documentSearch.split("&");
if(!filteredSearchParams.length){
    alert("Google Search contains no search query.")
}

let searchTerm: string = filteredSearchParams[0].replace("?q=","")

// @ts-ignore
searchTerm = searchTerm.replaceAll("+"," ");
console.log("Injected in Chrome")
console.log(searchTerm);

// Replace the DOM

const IconSvg = chrome.runtime.getURL('icon.svg');

const ImageLogo: HTMLImageElement | null = document.querySelector("a#logo > img");

if(ImageLogo !== null){
    ImageLogo.src = IconSvg;
    ImageLogo.style.width = '150px';
    ImageLogo.style.height = 'auto';
    ImageLogo.style.position = 'relative';
    ImageLogo.style.left='-20px';
    ImageLogo.style.top = '4px';
}

//block the search results
const googleResultContainer = document.getElementById('rcnt');
if(googleResultContainer)
    googleResultContainer.className+=' hide'; // Hide the default Google Search result

// create a DOM with a Loading indicator

const loadingIndicator = document.createElement('div');
loadingIndicator.id='loading-status';
loadingIndicator.innerHTML='<span>Awaiting Response from Server...</span>';

// Render the loading in the search section
googleResultContainer?.parentNode?.insertBefore(loadingIndicator,googleResultContainer);

(async() => {
    const response = await fetch(`${CONFIGURATION.baseUrl}/completions`,{
        headers: {
            'Authorization': `Bearer ${CONFIGURATION.apikey}`,
            'Content-type': 'application/json'
        },
        method:'POST',
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": searchTerm,
            "temperature": 1,
            "max_tokens": 500})
    });

    const result = await response.json();
    console.log(result);
    const googleResultContainer = document.getElementById('rcnt');
    const parentNode = googleResultContainer?.parentNode;

    // Create new div
    const chatGptDiv = document.createElement('div');
    chatGptDiv.id='chat-gpt-div';
    chatGptDiv.innerHTML = '<span>Fetching response from ChatGPT......</span>';

    ReactDOM.render(
        <Provider store={store}>
        <React.StrictMode>
            <ChatGptResult choices={result.choices}></ChatGptResult>
        </React.StrictMode>
        </Provider>,
        chatGptDiv
    );

    // Add the new div beside Google Search Result
    parentNode?.insertBefore(chatGptDiv,googleResultContainer);
    // Detach the loading indicator
    parentNode?.removeChild(loadingIndicator);

})();

