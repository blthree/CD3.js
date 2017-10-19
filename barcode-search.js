    var loadtsv = require("./load-tsv")
    var app = require('electron').remote; 
    var dialog = app.dialog;
    var session = app.session;
    function getFileName () {
        session.defaultSession.cookies.get({name: 'fileName'}, function getFileNameCookie (err, cookies) {
            console.log("where are my cookies?")
            document.getElementById('data-file').textContent = cookies[0].value;
            return cookies[0].value;
          })
    }

    function test_func () {
        var searchCode = document.querySelector(".search-code").value;
        console.log(searchCode);
        
        fileName = getFileName(); //this is not returning the filename for some reason
        console.log(fileName); // but using the DIV textContent does work...
                                // maybe just use hidden DIV element to store the file URL
        loadtsv(document.getElementById('data-file').textContent, function (err, data) {
        console.log(data[searchCode]);
        document.getElementById('search-results').textContent = JSON.stringify(data[searchCode]);
        })
    }
    fileName = getFileName()
    document.querySelector("[id='testB']").addEventListener('click', test_func);
    document.getElementById("search-box").addEventListener('keypress', function (e) { if (e.keyCode === 13) { test_func(); } });



