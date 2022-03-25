var workspace = document.querySelectorAll('#workspace')[0];
var result = document.querySelectorAll('#result')[0];

// draw frame for selection
var selectBox = document.createElement('div');
selectBox.className = 'box';
selectBox.id = 'selectBox';
var selectTitle = document.createElement('h3');
selectTitle.className = 'title';
selectTitle.id = 'selectTitle';
selectTitle.innerText = 'select';
var selectWrapper = document.createElement('div');
selectWrapper.className = 'selectWrapper';
selectWrapper.id = 'selectWrapper';

selectBox.appendChild(selectTitle);
selectBox.appendChild(selectWrapper);
workspace.appendChild(selectBox);

var clipSelectBox = document.createElement('div');
clipSelectBox.className = 'box';
clipSelectBox.id = 'clipSelectBox';
var clipSelectTitle = document.createElement('h3');
clipSelectTitle.className = 'title';
clipSelectTitle.id = 'clipSelectTitle';
clipSelectTitle.innerText = 'select';
var clipSelectWrapper = document.createElement('div');
clipSelectWrapper.className = 'selectWrapper';
clipSelectWrapper.id = 'clipSelectWrapper';

clipSelectBox.appendChild(clipSelectTitle);
clipSelectBox.appendChild(clipSelectWrapper);
workspace.appendChild(clipSelectBox);

// draw items for selection
let fileXHR = new XMLHttpRequest();
fileXHR.open('GET', 'http://localhost:3000/file');
fileXHR.onreadystatechange = function() {
  console.log(JSON.parse(fileXHR.responseText));
  setItem(JSON.parse(fileXHR.responseText));
}
fileXHR.send();

function setItem(fileList) {
  var selectWrapper = document.querySelectorAll('#selectWrapper')[0];
  while(selectWrapper.firstChild) {
    selectWrapper.removeChild(selectWrapper.lastChild);
  }
  fileList.map((e) => {
    var item = document.createElement('div');
    item.className = `selectItem item${e}`;
    item.innerText = e;
    let name = e;
    item.addEventListener('click', function() {
      clickListener(name);
    });
    selectWrapper.appendChild(item);
  });
}

function setClipItem(name) {
  let secondFileXHR = new XMLHttpRequest();
  secondFileXHR.open('GET', `http://localhost:3000/file/clip?title=${name}`);
  secondFileXHR.onreadystatechange = function() {
    responseJson = JSON.parse(fileXHR.responseText);
    let clipSelectWrapper = document.getElementById('clipSelectWrapper');
    clipSelectWrapper.replaceWith(clipSelectWrapper.cloneNode());
    clipSelectWrapper = document.getElementById('clipSelectWrapper');
    responseJson.map((e) => {
      var item = document.createElement('div');
      item.className = `selectItem item${e}`;
      item.innerText = e;
      let name = e;
      item.addEventListener('click', function() {
        clickClipListener(name);
      });
      clipSelectWrapper.appendChild(item);
    });
  }
  secondFileXHR.send();
}

// draw frame for output result
var items = ['video', 'audio', 'text']
items.map((e) => {
  var tempBox = document.createElement('div');
  tempBox.className = 'resultBox'
  tempBox.id = e + 'ResultBox'
  var tempTitle = document.createElement('h3');
  tempTitle.className = 'resultTitle';
  tempTitle.id = e + 'ResultTitle';
  tempTitle.innerText = e

  tempBox.appendChild(tempTitle);
  result.appendChild(tempBox);
});

var textResultBox = document.querySelectorAll('#textResultBox')[0];
var textView = document.createElement('div');
textView.id = 'textView';
textResultBox.appendChild(textView);

var audioResultBox = document.querySelectorAll('#audioResultBox')[0];
var audioView = document.createElement('audio');
audioView.id = 'audioView';
audioView.style = 'display: none';
audioView.controls = 'controls';
audioResultBox.appendChild(audioView);

var videoResultBox = document.querySelectorAll('#videoResultBox')[0];
var videoView = document.createElement('video');
videoView.id = 'videoView';
videoView.style = 'display: none';
videoView.controls = 'controls';
videoResultBox.appendChild(videoView);
