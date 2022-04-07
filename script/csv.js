var radioMosi = document.getElementById('radio-mosi');
var radioMosei = document.getElementById('radio-mosei');

radioMosi.addEventListener('click', function() {
  if(radioMosei.checked) {
    radioMosi.checked = true;
    radioMosei.checked = false;
  }
});

radioMosei.addEventListener('click', function() {
  if(radioMosi.checked) {
    radioMosi.checked = false;
    radioMosei.checked = true;
  }
});

var uploadButton = document.getElementById('uploadButton');

function postCsv() {
  var files = document.getElementById('inputModelFile').files;
  console.log(files);
  var fileName = document.getElementById('inputModelName').value;
  if(fileName == '') {
    alert('no file name');
    return
  }
  var files = document.getElementById('inputModelFile').files;
  if(files.length == 0) {
    alert('no file');
    return
  }
  if(radioMosei.checked == false && radioMosi.checked == false) {
    alert('no dataset');
    return
  }
  var dataset = radioMosi.checked ? 'mosi' : 'mosei';

  var formData = new FormData();
  formData.append('file', files[0]);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `http://210.107.197.59:80/csv?name=${fileName}&dataset=${dataset}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {   
      let filename = JSON.parse(xhr.responseText)['filename'].split('.')[0];
      readCsv(filename, dataset, true);
      alert(`filename: ${filename}`);
      if(dataset == 'mosi') {
        loadMosiScoreboard();
      }
      else if(dataset == 'mosei') {
        loadMoseiScoreboard();
      }
    }
  }
  xhr.send(formData);
}
uploadButton.addEventListener('click', postCsv);

function readCsv(filename, dataset, isUpload) {
  var uploadPath = isUpload ? '/upload' : ''
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `http://210.107.197.59:80/csv${uploadPath}?name=${filename}&dataset=${dataset}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      var model = new Model('temp', dataset, jsonToResult(JSON.parse(xhr.responseText)));
      var score = model.getScores().toString().substr(5);
      postScoreText(dataset, filename, score);
    }
  }
  xhr.send();
}