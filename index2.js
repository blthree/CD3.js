var fs = require('fs');

function openFile () {
 dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['tab'] }
  ]}, function (fileNames) {
  if (fileNames === undefined) return;
  var fileName = fileNames[0];
  var cookie = {url: 'http://www.benson.fyi', name: 'fileName', value: fileName}
  console.log(cookie)
  session.defaultSession.cookies.set(cookie, (error) => {
    if (error) console.error(error)
})
 }); 
}



