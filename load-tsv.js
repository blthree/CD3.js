module.exports = function (fileName, callback) {
    var fs = require('fs')
    data = fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log(err)
            return(callback(err))
        }
        data = data.toString().replace(/\r/g, '').split('\n')
        json_data = {}
        for (i =0; i < data.length; i++) {
            line = data[i].split("\t")
            json_data[line[0]] = {"StockNum": line[1], "CloneName": line[2], "Box": line[3], "Position": line[4]}
            //console.log(json_data)
        }
        callback(null, json_data)
    })

}


