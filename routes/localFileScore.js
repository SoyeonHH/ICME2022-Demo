module.exports = () => {
  var router = require('express').Router();
  const fs = require('fs');
  const path = require('path');

  router.get('/', (req, res) => {
    var name = req.query.name;
    var dataset = req.query.dataset;
    var score = req.query.score;
    if(dataset != 'mosi' && dataset != 'mosei') {
      res.json(false);
    }
    if(!score || score.split(',').length != 5) {
      res.json(false);
    }
    else{
      fs.writeFile(`./score/${dataset}/${name}.txt`, score, (err) => {
        if(err) {
          res.json(false);
        }
        else {
          res.json(true);
        }
      });
    }
  });

  return router;
}