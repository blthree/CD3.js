var electron = require('electron');
const Store = require('electron-store');
const store = new Store();

electron.app.on('ready', function () {
  var mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 800
  });
  mainWindow.loadURL('file://' + __dirname + '/barcode-search.html');
});