var fs = require('fs');
//var app = require('electron').remote;
//var dialog = app.dialog;
//var session = app.session;
const Store = require('electron-store');
const store = new Store();

function loadtsv(fileName, callback) {
    var fs = require('fs');
    data = fs.readFile(fileName, function (err, data) {
        // catch err and pass upwardss
        if (err) {
            console.log(err);
            alert("Error while loading barcode file:\n " + err)
            return (callback(err));
        }
        data = data.toString().replace(/\r/g, '').split('\n');
        json_data = {}
        for (i = 0; i < data.length; i++) {
            line = data[i].split("\t");
            json_data[line[0]] = {
                "stockNum": line[1],
                "cloneName": line[2],
                "box": line[3],
                "position": line[4]
            };
        }
        callback(null, json_data);
    });

}

function openFile() {
    dialog.showOpenDialog({
        filters: [{
            name: 'text',
            extensions: ['tab', 'tsv']
        }]
    }, function (fileNames, err) {
        if (fileNames === undefined) return;
        var fileName = fileNames[0];
        store.set('fileName2', fileName);
        // save the date and time the electron-stre was last updated
        date = new Date();
        store.set('updated', date.toGMTString());
        console.log(store.get('fileName2'));
        // load and parse data from file, than store using electron-store
        loadtsv(store.get('fileName2'), function (err, data) {
            if (err) {
                console.log(err);
            }
            // clear current data
            store.set('barcode_data', {});
            // save the new data
            store.set('barcode_data', data);
        });
        // reset cursor focus to search box
        document.getElementById('search-box').focus();
    });
}

function exportJSON() {
    var fs = require('fs');
    var loadBar = document.querySelector("#waiting-progress-bar");
    fileName = dialog.showSaveDialog();

    if (fileName) {
        loadBar.style.visibility = "visible";
        fs.writeFile(fileName, JSON.stringify(store.get()), function (err) {
            if (err) {
                console.log(err);
                return (callback(err));
            }
            loadBar.style.visibility = "hidden";
        });
    }

}

document.getElementById('openFileButton').addEventListener('click', openFile);
document.querySelector("#export-barcodes-json").addEventListener('click', exportJSON);