var workspace = document.querySelectorAll('#workspace')[0];
var result = document.querySelectorAll('#result')[0];

// draw frame for selection
var tempBox = document.createElement('div');
tempBox.className = 'box';
tempBox.id = 'selectBox';
var tempTitle = document.createElement('h3');
tempTitle.className = 'title';
tempTitle.id = 'selectTitle';
tempTitle.innerText = 'select';
var tempSelectWrapper = document.createElement('div');
tempSelectWrapper.className = 'selectWrapper';
tempSelectWrapper.id = 'selectWrapper';

tempBox.appendChild(tempTitle);
tempBox.appendChild(tempSelectWrapper);
workspace.appendChild(tempBox);

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

let fileXHR = new XMLHttpRequest();
fileXHR.open('GET', 'http://localhost:3000/file');
fileXHR.onreadystatechange = function() {
  console.log(JSON.parse(fileXHR.responseText));
  setItem(JSON.parse(fileXHR.responseText));
}
fileXHR.send();

function setItem(fileList) {
  var selectWrapper = document.querySelectorAll('.selectWrapper')[0];
  fileList.map((e) => {
    var item = document.createElement('div');
    item.className = `selectItem item${e}`;
    item.innerText = 'testtest' + e;
    let name = e;
    item.addEventListener('click', function() {
      clickListener(name);
    });
    selectWrapper.appendChild(item);
  })
}