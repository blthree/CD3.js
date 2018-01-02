    let app = require('electron').remote;
    let dialog = app.dialog;
    let session = app.session;

    // map the properties of stored JSON objects to the appropriate DOM elements
    let resultsToDomMap = { "stockNum" : "stock-result", 
                            "cloneName": "clone-result", "box": "box-result", 
                            "position": "position-result", "searchCode": "barcode-result" };
    
    // in case no results are found, display this default result
    let defaultBarcode = {"StockNum":"Not Found","CloneName":"Not Found","Box":"Not Found","Position":"Not Found"};

    // search box element
    let searchBox = document.getElementById("search-box");

    // utility function
    function editString(domElement, jsonObj) {
        document.getElementById(domElement).textContent = JSON.stringify(jsonObj).replace(/\"/g, '');
    }

    // searches with a sample barcode for stock number G17904
    function testWithSampleBarcode() {
        searchByBarcode("0055122673");
    }

    // the main function
    function searchByBarcode(searchCode) { 
        // open popup warning if no code was submitted
        if (searchCode === "") {
            let dialog2 = document.querySelector("x-dialog");
            dialog2.opened = true;
        } else {
        //get results
        results = store.get('barcode_data.' + searchCode);
        results.searchCode = searchCode;
        // set default "Not Found" values if barcode is found in data
        if (!results) {
            results = defaultBarcode;
        }
        // convert to text, clean up, and update DOM elements 
        // interating through DOM mappings and results by key 
        for (var key in results) {
            console.log(key);
            editString(resultsToDomMap[key], results[key]);
        }
        document.getElementById("results-box").style.visibility = "visible";
        // reset focus to search box
        searchBox.value = "";
        searchBox.focus();
        // save results to search history
        searchHistory.push(results);
        }
    }

    // gets information on the current barcode file in use
    function getBarcodeInfo () {
        var last_updated = store.get('updated');
        console.log(last_updated);
        var num_records = Object.keys(store.get('barcode_data')).length;
        console.log(num_records);
        document.querySelector("#barcode-info-popup").opened = true;
        document.querySelector("#barcodes-count").textContent = num_records;
        document.querySelector("#barcodes-last-updated").textContent = last_updated;
        return {'last updated': last_updated,
                    'number of barcodes': num_records}
    }

    // set event listener so that return keypress will run a serch
    searchBox.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            searchByBarcode(searchBox.value);
        }
    });