var fs = require('fs');
var app = require('electron').remote; 
var dialog = app.dialog;
var session = app.session; 

function openFile () {
 dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['tab'] }
  ]}, function (fileNames, err) {
  if (fileNames === undefined) return;
  var fileName = fileNames[0];
  var cookie = {url: 'http://www.benson.fyi', name: 'fileName', value: fileName}
  console.log(cookie);
  
  session.defaultSession.cookies.set(cookie, (error) => {
    if (error) console.error(error);
    location.href='file://' + __dirname + '/barcode-search.html';
  });
 });
}

document.getElementById('openFileButton').addEventListener('click', openFile);

