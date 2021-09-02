/**
 * 0.1 add the Amazon Button "Export to Shopify - Done"
 * 1. Get the url from the tab and get out the DP
 * 2. Add the item to the Storage
 * 3. Create UI in Amazon Skin - DOne
 * 4. Export to Shopify CSV
 * 5. Write validation for the custom rest endpoint
 * 6. Call the specific rest endpoint
 */
const PRODUCT_PRICE_DOM = "exports_desktop_qualifiedBuybox_priceInsideBuyBox"
const ADD_TO_SHOPIFY_BUTTON_TEXT="Export to Shopify" 
const READY_EVENT = "DOMContentLoaded";
const SHOPIFY_HEADER_TITLE = "Export to Shopify"
const STORAGE_SCHEMA = "asinproducts"
const SHOPIFY_HANDLE_EXPRESSION = /www\.amazon\.com\/(\w+.+)\/dp/;
const MONEY_FORMAT = /\W||,/
const CSV_HEADER_ROW =['Body (HTML)','Image Src','Title', 'Type,Variant Price', 'Vendor', 'Gift Card', 'Status'];
    
    //Get the exisiting map
    let mapOfProducts = {
        data: []
    };

    chrome.storage.local.get('asinproducts',(result) => {
        if('asinproducts' in result){
            mapOfProducts= result[STORAGE_SCHEMA];
            console.log(mapOfProducts.data)
            renderExportList(mapOfProducts.data)
        }
    })




    let amazonProductDom = document.getElementById(PRODUCT_PRICE_DOM);
    const parentDivOf = amazonProductDom.parentNode;
    console.log(amazonProductDom)

    // Create the amazon add to shopify button
    let addToShopifybtn = h('button',{'class': 'amazon-button',type: 'button'}, (dom) => dom.innerText = ADD_TO_SHOPIFY_BUTTON_TEXT)
    addToShopifybtn.onclick=addToStorage;
    parentDivOf.insertBefore(addToShopifybtn,amazonProductDom)

    //Create the sidebar to hold the list of shopify items
    let amazonDpElement = document.getElementById("dp");
    let partentOfDp = amazonDpElement.parentNode;
    let sidebarShopifyList = h('div',{id: 'side-shopifylist'},(dom) => {
        const h4Element  = h('h4',{},(d) => d.innerText= SHOPIFY_HEADER_TITLE)
        const divList = h('div',{id: "export-list"});
    let exportPane = h('div',{class: 'download-pane'}, (d => {
        const btn = h('button', { class: 'amazon-button'}, button => button.innerText = 'Download') 
        btn.onclick = e => downloadCsv()
        d.appendChild(btn);
    }));

        dom.appendChild(h4Element)
        dom.appendChild(divList)
        dom.appendChild(exportPane)
    })
    partentOfDp.insertBefore(sidebarShopifyList,amazonDpElement)




function h(dom,attrib, cb){
    let domNode = document.createElement(dom);
    for(var key in attrib){
        domNode.setAttribute(key ,  attrib[key])
    }
   //Create a callback to allow us embed inner dom in it
   if(cb){
       cb(domNode)
   }
   return domNode;
}

function renderExportList(exportList){
    //We need to get the parent node of the export list element
    const parentNode = document.getElementById("export-list");
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild)
    }
    var tempDocumentFragment = document.createDocumentFragment();
    exportList.forEach( item => tempDocumentFragment.appendChild(addToSideBar(item,true)))
    parentNode.appendChild(tempDocumentFragment);
}

async function extractData(){
    let shopifyItem = {};

    // Extract the information from the DOM Page
    shopifyItem['title'] = document.querySelector("#productTitle").innerText
    const handle = SHOPIFY_HANDLE_EXPRESSION.exec(location.href)
    console.log(handle)
    shopifyItem['body'] = document.getElementById("featurebullets_feature_div").innerHTML.replace(/\n||\s/gm,"");
    shopifyItem['vendor'] = ''
    shopifyItem['type'] = document.querySelector("#wayfinding-breadcrumbs_feature_div li:last-child span a").innerText
    //price
    let price = document.getElementById("price_inside_buybox").innerText.replace(MONEY_FORMAT,"")
    shopifyItem['variantPrice'] = price;
    //Get the image
    let productImage = document.querySelector("#imgTagWrapperId img");
    shopifyItem['imgSrc'] = productImage.src;
    shopifyItem['altText'] = productImage.altText;
    shopifyItem['status'] = 'draft';

    return shopifyItem;

}


function ShopifyItem(shopifyItems){
    const bindToProps = item => this[item]=shopifyItems[item];
    Object.keys(shopifyItems).forEach( item => bindToProps(item))
}

function downloadCsv(){
    let dataArray = [];
    dataArray.push(CSV_HEADER_ROW)
    mapOfProducts.data.forEach( item => {
        //Refactor this section 
        item.body = item.body.replace(/\n||\s/gm,"").replace(/\"/gm,'\"\"')
        item.body=`"${item.body}"`

        item.title = item.title.replace(/\n||\s/gm,"").replace(/\"/gm,'\"\"');
        item.type = item.type.replace(/\n||\s/gm,"").replace(/\"/gm,'\"\"');

        item.title=`"${item.title}"`
        item.type=`"${item.type}"`
        item.status ='draft'
        //  ['Body (HTML)','Image Src','Title', 'Type,Variant Price', 'Vendor', 'Gift Card', 'Status'
        dataArray.push([item.body, item.imgSrc, item.title, item.type, item.variantPrice, item.vendor || "N/A", 'FALSE', 'draft'])
    });
    exportToCsv('import_shopify.csv',dataArray)

}

function ShopifyCsv(item){
     let ShopifyCsvJsonSchemaMapping = {
    "Handle": item.handle,
    "Title": item.title,
    "Body (HTML)": item.body || "",
    "Vendor": item.vendor,
    "Type": item.type,
    "Tags": item.tags || "",
    "Published": item.isPublished || 'FALSE',
    "Option1 Name": item.optionName || item.title,
    "Option1 Value": item.optionValue || item.title,
    "Option2 Name": item.secondOptionName || "",
    "Option2 Value": item.secondOptionValue || "",
    "Option3 Name": item.thirdOptionName || "",
    "Option3 Value": item.thirdOptionValue || "",
    "Variant SKU": item.variantSKU || "",
    "Variant Grams": item.grams || "",
    "Variant Inventory Tracker": item.Invtracker || "",
    "Variant Inventory Qty": item.InvQty || "",
    "Variant Inventory Policy": item.InvPolicy || "continue",
    "Variant Fulfillment Service": item.fufilmentService || "manual",
    "Variant Price":item.variantPrice,
    "Variant Compare At Price": item.compareAtPrice || item.variantPrice,
    "Variant Requires Shipping": item.variantRequireShipping || "",
    "Variant Taxable": item.varianTaxable || "",
    "Variant Barcode": item.vairantBarcode || "",
    "Image Src": item.imgSrc,
    "Image Position": item.imgPosition || "",
    "Image Alt Text": item.altText ,
    "Gift Card": item.giftCard || 'FALSE',
    "Status": "draft"
    } 
    return ShopifyCsvJsonSchemaMapping;
}

function getShopifyFields(){

}

//
async function addToStorage(e){
    //When the user has clicked show the object in the console
    const data = await extractData();
    //Get the Shopify Object
    mapOfProducts.data.push(data)
    console.log(JSON.stringify(mapOfProducts))
    chrome.storage.local.set({
        asinproducts: mapOfProducts
    }, e => {
        addToSideBar(data)
        raiseNotification(data)
    })
}

function raiseNotification(item){
     // Raise a notification bar in the chrome extension
     const data =  {
         iconUrl: item.imgSrc,
         title:item.title,
         message: "This product has been added to the Shopify Export List",
         type:'basic'
     };

     //Raise a notification bar to the worker
     chrome.runtime.sendMessage(event('notification',data))
}

//This allows us append to the Sidebar
function addToSideBar(item, capture = false){
    // Ref to item
    const div = h('div',{class: 'shopify-export-item'})
    const a = h('a',{class:'shopify-export-item-anchor'})
    const img = h('img',{src:item.imgSrc, class:'shopify-export-item-image'}, dom => dom.alt=item.altText)
    a.appendChild(img)
    div.appendChild(a)
    // Let us add to the sidebar
    if(!capture){
       document.getElementById("export-list").appendChild(div)     
    }
    else{
        return div;
    }
    
}

function event(type,data){
    return {
        type,
        data
    }
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
          finalVal+=row.join(',')
          finalVal[finalVal.length]='';
          finalVal+="\n";
          return finalVal;
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}


