/**
 * /csv
 * [POST] query: name, dataset (mosi, mosei)
 * requestBody: multipart data(csv)
 * save csv in local path, return saved filename
 * 
 * /csv
 * [GET] query: dataset (mosi, mosei) & name
 * return prepared csv file
 * 
 * /csv/upload
 * [GET] query: dataset (mosi, mosei) & name
 * return saved csv file
 * 
 * /csv/list
 * [GET] query: dataset (mosi, mosei)
 * return all csv name in predict
 * 
 * /csv/upload/list
 * [GET] query: dataset (mosi, mosei)
 * return filelist of uploaded csv
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
      callback(null, `${basename}-${Date.now()}${extension}`);
    }
  });
  var upload = multer({
    storage: storage
  });

  router.get('/list', (req, res) => {
    var dataset = req.query.dataset;
    if(dataset != 'mosi' && dataset != 'mosei') {
      res.json(false);
    }
    else{
      var files = fs.readdirSync(`./predict/${dataset}`);
      var fileList = files.filter(function(file) {
        if(file.split('.')[1] == 'csv') return true;
        else return false;
      }).map((e) => {
        return e.split('.')[0];
      });

      res.json(fileList);
    }
  });

  router.get('/upload/list', (req, res) => {
    var dataset = req.query.dataset;
    if(dataset != 'mosi' && dataset != 'mosei') {
      res.json(false);
    }
    else {
      var files = fs.readdirSync(`./userUpload/${dataset}`);
      var fileList = files.filter(function(file) {
        if(file.split('.')[1] == 'csv') return true;
        else return false;
      }).map((e) => {
        return e.split('.')[0];
      });

      res.json(fileList);
    }
  });

  router.get('/upload', (req, res) => {
    var dataset = req.query.dataset;
    var name = req.query.name;
    if(dataset != 'mosi' && dataset != 'mosei') {
      res.json(false);
    }
    else {
      try {
        data = fs.readFileSync(`./userUpload/${dataset}/${name}.csv`, {encoding: 'utf8'});
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
    }
  });

  router.get('/', (req, res) => {
    var dataset = req.query.dataset;
    var name = req.query.name;
    if(dataset != 'mosi' && dataset != 'mosei') {
      res.json(false);
    }
    else{
      try {
        var data;
        if(name == 'gold') data = fs.readFileSync(`./predict/${dataset}.csv`, {encoding: 'utf8'});
        else data = fs.readFileSync(`./predict/${dataset}/${name}.csv`, {encoding: 'utf8'});
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
    }
  });

  var dateContainList = [5,6,8,9,10,11,12,14,15,17,18];

  router.post('/', upload.single('file'), (req, res) => {
    var name = req.query.name;
    var dataset = req.query.dataset;
    var nowISODate = new Date().toISOString();
    var dateTime = '';
    dateContainList.map((e) => {
      if(nowISODate[e] == 'T') {
        dateTime = dateTime + '-';
      }
      else {
        dateTime = dateTime + nowISODate[e];
      }
    });
    var newFileName = `${name}_${dateTime}.csv`;
    fs.renameSync(req.file.path, `${req.file.destination}/${dataset}/${newFileName}`);
    res.json({
      'filename': newFileName
    });
  });
  
  return router;
}