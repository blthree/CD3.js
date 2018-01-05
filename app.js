var electron = require('electron');
const Store = require('electron-store');
const store = new Store();

electron.app.on('ready', function () {
  var mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 500,
    title: "ABRC Barcode Tool",
    icon: "datamatrix_icon.png"
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

});