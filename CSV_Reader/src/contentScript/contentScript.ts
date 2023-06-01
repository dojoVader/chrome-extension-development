chrome.runtime.sendMessage("Hello from the content script", (response) => {
    console.log(response);
})