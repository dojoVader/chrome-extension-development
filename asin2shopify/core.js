const READY_EVENT = "DOMContentLoaded"

let xtensionConfig = null
document.addEventListener(READY_EVENT, (e) => {
    // Fetch the current configuration
    chrome.storage.sync.get('configuration', (data) => {
        xtensionConfig = data.configuration;
        bindConfiguration(data)
    })

    //Bind the events to listen for changes
    bindUIEvents();
});

function bindConfiguration(config) {
    //Get the Settings and Bind to the Check Box
    const checkBoxElement = document.getElementById('enable_shopify_export');
    checkBoxElement.checked = config.configuration.enableShopifyExport

    //Set the Url value to the text box
    const inputElement = document.getElementById('custom_rest_endpoint');
    inputElement.value = (config.configuration.customRestEndpoint ? config.configuration.customRestEndpoint : "")
}

function bindUIEvents() {
    //Listen to the event and save to the storage
    const checkBoxElement = document.getElementById('enable_shopify_export');
    checkBoxElement.addEventListener('change', (event) => {
        const enableShopifyExport = event.currentTarget.checked
        xtensionConfig = {...xtensionConfig, enableShopifyExport }
        chrome.storage.sync.set({ configuration: xtensionConfig })

    });
}