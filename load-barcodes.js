var fs = require('fs');
var app = require('electron').remote; 
var dialog = app.dialog;
var session = app.session; 
const Store = require('electron-store');
const store = new Store();

function openFile () {
 dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['tab'] }
  ]}, function (fileNames, err) {
  if (fileNames === undefined) return;
  var fileName = fileNames[0];
  store.set('fileName2',fileName)
  location.href='file://' + __dirname + '/barcode-search.html';
 });
}

document.getElementById('openFileButton').addEventListener('click', openFile);

