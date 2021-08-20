//initialize a message that the extension is running

chrome.runtime.onInstalled.addListener(() => {
	 console.log('NotJustOk Ripper running....')
});