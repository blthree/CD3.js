    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;

    var defaultBarcode = {"stockNum":"Not Found","cloneName":"Not Found","box":"Not Found","position":"Not Found"};
    var results = 'Hello Vue!';

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

    function test_func() {
        document.querySelector("#search-box").value = document.getElementById("sample-barcode").textContent; //"0055122673" 
        
        search_func();
    }

    function search_func() {
        var searchCode = document.querySelector("#search-box").value;
        console.log(searchCode);
        if (searchCode == "") {
            let dialog2 = document.querySelector("x-dialog");
            dialog2.opened = true;
        } else {
        console.log("Searching")
        results = store.get('barcode_data.' + searchCode);
        if (!results) {
            results = defaultBarcode;
        }
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    console.log(key, results[key]);
                    appResults[key] = results[key];
                }
                
            }
            
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

    document.getElementById("search-box").addEventListener('click', search_func);
    document.getElementById("search-box").addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            search_func();
        }
    });