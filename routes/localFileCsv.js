/**
 * /csv
 * [GET] no params
 * return base csv file
 * 
 * [POST] name, multipart data(csv)
 * save csv in local path, return saved filename
 * 
 * /csv/{filename}
 * [GET] no params
 * return saved csv file
 * 
 * /csv/list
 * [GET] no params
 * return all csv name in userUpload
 */

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

  router.get('/list', (req, res) => {
    var files = fs.readdirSync('./userUpload');
    var fileList = files.map((e) => {
      return e.split('.')[0]
    });

    res.json(fileList);
  });

  router.get('/:filename?', (req, res) => {
    var filename = req.params.filename;
    var data;
    try {
      if(filename) {
        data = fs.readFileSync(`./userUpload/${filename}.csv`, {encoding: 'utf8'});
      }
      else {
        data = fs.readFileSync('./predict/MAG-BERT_mosi_result.csv', {encoding: 'utf8'});
      }
      var rows = data.replace(/\r/gi, '').split('\n');
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
    } catch(e) {
      res.json(false);
    }
  });

  router.post('/', upload.single('file'), (req, res) => {
    var name = req.query.name;
    var newFileName = `${name}_${Date.now()}.csv`;
    fs.renameSync(req.file.path, `${req.file.destination}/${newFileName}`);
    res.json({
      'filename': newFileName
    });
  });
  
  return router;
}