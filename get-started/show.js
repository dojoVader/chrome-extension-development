let buttonReference = document.getElementById("showText");


buttonReference.addEventListener('click', async() => {

 chrome.storage.sync.get('text',(payload) => {
 	let span = document.getElementById('message');
 	span.innerHTML = payload.text
 });

});