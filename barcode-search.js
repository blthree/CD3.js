    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;

    var resultsToDomMap = { "StockNum" : "stock-result", 
                            "CloneName": "clone-result", "Box": "box-result", 
                            "Position": "position-result", "searchCode": "barcode-result" };
    var defaultBarcode = {"StockNum":"Not Found","CloneName":"Not Found","Box":"Not Found","Position":"Not Found"};

    // search box element
    let searchBox = document.getElementById("search-box");

    function editString(domElement, jsonObj) {
        document.getElementById(domElement).textContent = JSON.stringify(jsonObj).replace(/\"/g, '');
    }

    function testWithSampleBarcode() {
        searchByBarcode("0055122673");
    }

    function searchByBarcode(searchCode) { 
        // open popup warning if no code was submitted
        if (searchCode === "") {
            let dialog2 = document.querySelector("x-dialog");
            dialog2.opened = true;
        } else {
        //get results
        results = store.get('barcode_data.' + searchCode);
        // set default "Not Found" values if barcode is found in data
        if (!results) {
            results = defaultBarcode;
        }
        // convert to text, clean up, and update DOM elements 
        // interating through DOM mappings and results by key 
        for (var key in results) {
            editString(resultsToDomMap[key], results[key]);
        }
        // reset focus to search box
        searchBox.value = "";
        searchBox.focus();
        // save results to search history
        searchHistory.push(results);
        }
    }

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

    searchBox.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            searchByBarcode(searchBox.value);
        }
    });