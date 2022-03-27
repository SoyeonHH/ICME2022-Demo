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
  console.log(files);
  if(files.length == 0) {
    alert('no file');
    return
  }

  var formData = new FormData();
  formData.append('file', files[0]);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', `http://localhost:3000/file/csv?name=${fileName}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {   
      let filename = JSON.parse(xhr.responseText)['filename'];
      alert(`filename: ${filename}`);
    }
  }
  xhr.send(formData);
}
uploadButton.addEventListener('click', postCsv);