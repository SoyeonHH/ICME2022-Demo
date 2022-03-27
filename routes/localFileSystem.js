// return file list

const { resourceLimits } = require('worker_threads');

module.exports = () => {
  var router = require('express').Router();
  const fs = require('fs');
  const path = require('path');
  const multer = require('multer');

  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './userUpload');
    },
    filename: function(req, file, callback) {
      let extension = path.extname(file.originalname);
      let basename = path.basename(file.originalname, extension);
      callback(null, basename + "-" + Date.now() + extension);
    }
  });
  var upload = multer({
    storage: storage
  });

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
      if(files[i].includes(title)) {
        fileList.push(files[i].split('.')[0]);
      }
    }
    res.json(fileList);
  });

  router.get('/csv', (req, res) => {
    var data = fs.readFileSync('./predict/MAG-BERT-MOSI_result.csv', {encoding: 'utf8'});
    var rows = data.split('\n');
    var csv = [];

    for(var rowIndex in rows) {
      var row = rows[rowIndex].split(',');
      if(rowIndex === "0") {
        var columns = row;
      }
      else {
        var data = {};
        for(var columnIndex in columns) {
          var column = columns[columnIndex];
          data[column] = row[columnIndex];
        }
        csv.push(data);
      }
    }

    res.json(csv);
  });

  router.post('/csv', upload.single('file'), (req, res) => {
    var name = req.query.name;
    var newFileName = `${name}_${Date.now()}.csv`;
    fs.renameSync(req.file.path, `${req.file.destination}/${newFileName}`);
    res.json({
      'filename': newFileName
    });
  });

  return router;
}