    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;


    var defaultBarcode = {"StockNum":"Not Found","CloneName":"Not Found","Box":"Not Found","Position":"Not Found"};

    var appResults = new Vue({
        el: '#results-box',
        data: {
          stockNum: 'Hello Vue!',
          cloneName: '',
          box: '',
          position: '',
          searchCode: ''
        }
      });


    // search box element
    let searchBox = document.getElementById("search-box");

    function test_func() {
        searchBox.value = "0055122673"
        search_func();
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

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                console.log(key, results[key]);
                appResults[key] = jsonObj[key];
            }

        }
        // reset focus to search box 
        document.getElementById('search-box').value = "";
        document.getElementById('search-box').focus();
        // save search results to history
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