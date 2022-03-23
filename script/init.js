var workspace = document.querySelectorAll('#workspace')[0];

var items = ['video', 'audio', 'text']
items.map((e) => {
  tempBox = document.createElement('div');
  tempBox.className = 'box'
  tempBox.id = e + 'Box'
  tempTitle = document.createElement('h2');
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