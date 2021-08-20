
let information = "This is an information that was set"

chrome.runtime.onInstalled.addListener(() => {
 // We can use the storage
 chrome.storage.sync.set({
 	text: information
 });

 console.log('Information has been set to the application')
});