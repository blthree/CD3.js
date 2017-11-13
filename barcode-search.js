    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;

    var resultsToDomMap = { "StockNum" : "stock-result", 
                            "CloneName": "clone-result", "Box": "box-result", 
                            "Position": "position-result", "searchCode": "barcode-result" };
    var defaultBarcode = {"StockNum":"Not Found","CloneName":"Not Found","Box":"Not Found","Position":"Not Found"};

    function editString(domElement, jsonObj) {
        document.getElementById(domElement).textContent = JSON.stringify(jsonObj).replace(/\"/g, '');
    }

    function test_func() {
        document.querySelector("#search-box").value = document.getElementById("sample-barcode").textContent; //"0055122673" 
        
        search_func();
    }

    // TODO: generalize to search_func(searchCode) 
    function search_func() {
        var searchCode = document.querySelector("#search-box").value;
        if (searchCode === "") {
            let dialog2 = document.querySelector("x-dialog");
            dialog2.opened = true;
        } else {
        console.log("Searching")
        results = store.get('barcode_data.' + searchCode);
        if (!results) {
            results = defaultBarcode;
        }
            // keeping this for debugging for now
            document.getElementById('search-results').textContent = JSON.stringify(results);
            for (var key in results) {
                editString(resultsToDomMap[key], results[key]);
            }
        // reset focus to search box
        document.getElementById('search-box').value = "";
        document.getElementById('search-box').focus();
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

    document.getElementById("search-box").addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            search_func();
        }
    });