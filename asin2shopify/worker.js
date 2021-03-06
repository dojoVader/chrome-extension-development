//AsinConfiguration
const configuration = {
    enableShopifyExport: false,
    customRestEndpoint: "https://fake.rest.endpoint.io"
}

// When the Extension is installed set the default details
chrome.runtime.onInstalled.addListener(() => {
    //Persist default configuration
    chrome.storage.sync.set({
        configuration
    });
});

chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    switch(request.type){
        case "notification":
            chrome.notifications.create('',request.data);
        break;    
    }
})