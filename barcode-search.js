    var app = require('electron').remote;
    var dialog = app.dialog;
    var session = app.session;

    function test_func() {
        document.querySelector(".search-code").value = document.getElementById("sample-barcode").textContent;
        search_func()
    }

    function search_func() {
        var searchCode = document.querySelector(".search-code").value;
        console.log(searchCode);

        document.getElementById('search-results').textContent = JSON.stringify(store.get('barcode_data.' + searchCode));
        document.getElementById('search-box').value = "";
        document.getElementById('search-box').focus();
    }
    document.querySelector("[id='testB']").addEventListener('click', search_func);
    document.getElementById("search-box").addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            search_func();
        }
    });