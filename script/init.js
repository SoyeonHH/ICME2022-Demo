var workspace = document.querySelectorAll('#workspace')[0];
var result = document.querySelectorAll('#result')[0];

var items = ['video', 'audio', 'text']
items.map((e) => {
  tempBox = document.createElement('div');
  tempBox.className = 'box'
  tempBox.id = e + 'Box'
  tempTitle = document.createElement('h3');
  tempTitle.className = 'title';
  tempTitle.id = e + 'Title'; 
  tempTitle.innerText = e
  tempSelectWrapper = document.createElement('div');
  tempSelectWrapper.className = 'selectWrapper';
  tempSelectWrapper.id = e + 'SelectWrapper';

  tempBox.appendChild(tempTitle);
  tempBox.appendChild(tempSelectWrapper);
  workspace.appendChild(tempBox);
});

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
textView.id = 'textView'
textResultBox.appendChild(textView);