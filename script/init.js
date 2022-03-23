var workspace = document.querySelectorAll('#workspace')[0];
var result = document.querySelectorAll('#result')[0];


tempBox = document.createElement('div');
tempBox.className = 'box';
tempBox.id = 'selectBox';
tempTitle = document.createElement('h3');
tempTitle.className = 'title';
tempTitle.id = 'selectTitle';
tempTitle.innerText = 'select';
tempSelectWrapper = document.createElement('div');
tempSelectWrapper.className = 'selectWrapper';
tempSelectWrapper.id = 'selectWrapper';

tempBox.appendChild(tempTitle);
tempBox.appendChild(tempSelectWrapper);
workspace.appendChild(tempBox);

var items = ['video', 'audio', 'text']
items.map((e) => {
  tempBox = document.createElement('div');
  tempBox.className = 'resultBox'
  tempBox.id = e + 'ResultBox'
  tempTitle = document.createElement('h3');
  tempTitle.className = 'resultTitle';
  tempTitle.id = e + 'ResultTitle';
  tempTitle.innerText = e

  tempBox.appendChild(tempTitle);
  result.appendChild(tempBox);
});

var textResultBox = document.querySelectorAll('#textResultBox')[0];
textView = document.createElement('div');
textView.id = 'textView';
textResultBox.appendChild(textView);

var audioResultBox = document.querySelectorAll('#audioResultBox')[0];
audioView = document.createElement('audio');
audioView.id = 'audioView';
audioView.style = 'display: none';
audioView.controls = 'controls';
audioResultBox.appendChild(audioView);

var videoResultBox = document.querySelectorAll('#videoResultBox')[0];
videoView = document.createElement('video');
videoView.id = 'videoView';
videoView.style = 'display: none';
videoView.controls = 'controls';
videoResultBox.appendChild(videoView);