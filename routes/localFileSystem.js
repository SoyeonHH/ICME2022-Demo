// return file list

module.exports = () => {
  var router = require('express').Router();
  var fs = require('fs');

  router.get('/', (req, res) => {
    var files = fs.readdirSync('./data/text');
    var fileList = [];
    for(var i=0; files[i]; i++) {
      fileList.push(files[i].split('.')[0])
    }
    res.json(fileList);
  });

  router.get('/clip', (req, res) => {
    var title = req.query.title;
    var files = fs.readdirSync('./data/text');
    var fileList = [];
    for(var i = 0; files[i]; i++) {
      if(files[i].includes('0')) {
        fileList.push(files[i]);
      }
    }
    res.json(fileList);
  });

  return router;
}