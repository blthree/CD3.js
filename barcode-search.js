    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;

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
            document.getElementById('search-results').textContent = JSON.stringify(results);
            document.getElementById('stock-result').textContent = JSON.stringify(results.StockNum).replace(/\"/g, '');
            document.getElementById('clone-result').textContent = JSON.stringify(results.CloneName).replace(/\"/g, '');
            document.getElementById('box-result').textContent = JSON.stringify(results.Box).replace(/\"/g, '');
            document.getElementById('position-result').textContent = JSON.stringify(results.Position).replace(/\"/g, '');
            document.getElementById('barcode-result').textContent = JSON.stringify(searchCode).replace(/\"/g, '');
        document.getElementById('search-box').value = "";
        document.getElementById('search-box').focus();
        }
    }
    document.getElementById("search-box").addEventListener('click', search_func);
    document.getElementById("search-box").addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            search_func();
        }
    });