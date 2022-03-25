// return file list

const { resourceLimits } = require('worker_threads');

module.exports = () => {
  var router = require('express').Router();
  var fs = require('fs');
  var multer = require('multer');
  var upload = multer({dest: './userUpload'});

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
    var data = req.file;
    var name = req.query.name;
    res.json({
      'success': true
    });
  });


  return router;
}