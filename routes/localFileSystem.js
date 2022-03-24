// return file list

module.exports = () => {
  var router = require('express').Router();
  var fs = require('fs');

  router.get('/', (req, res) => {
    var files = fs.readdirSync('./data/text');
    var fileList = []
    for(var i=0; files[i]; i++) {
      fileList.push(files[i].split('.')[0])
    }
    res.json(fileList);
  });

  return router;
}