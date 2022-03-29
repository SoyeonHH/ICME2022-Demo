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
  xhr.open('POST', `http://210.107.197.59:3000/csv?name=${fileName}&dataset=${dataset}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {   
      let filename = JSON.parse(xhr.responseText)['filename'];
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