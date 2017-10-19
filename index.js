    var loadtsv = require("./load-tsv")
    function test_func () {
        var searchCode = document.querySelector(".search-code").value
        console.log(searchCode)
        loadtsv(function (err, data) {
        console.log(data[searchCode])
        document.getElementById('search-results').textContent = JSON.stringify(data[searchCode])
        })
    }
    document.querySelector("[id='testB']").addEventListener('click', test_func)
    document.getElementById("search-box").addEventListener('keypress', function (e) { if (e.keyCode === 13) { test_func() } })



