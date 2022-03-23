var test = Array.from(Array(30).keys())
var formatList = ['mp4', 'wav', 'txt']

selectList = document.querySelectorAll('.selectWrapper');

var clickName = '';

test.map((e) => {
  item = document.createElement('div');
  item.className = `selectItem item${e}`;
  item.innerText = 'testtesttesttest';
  itemC1 = item.cloneNode(true);
  itemC2 = item.cloneNode(true);
  item.innerText = 'testtest' + e + '.' + formatList[0]
  itemC1.innerText = 'testtesttest' + e + '.' + formatList[1]
  itemC2.innerText = 'testtesttesttest' + e + '.' + formatList[2]
  let name = e;
  item.addEventListener('click', function() {
    clickListener(name);
  });
  itemC1.addEventListener('click', function() {
    clickListener(name);
  });
  itemC2.addEventListener('click', function() {
    clickListener(name);
  });
  itemList = [item, itemC1, itemC2];
  for(var i=0; selectList[i]; i++) {
    selectList[i].appendChild(itemList[i]);
  }
});

function clickListener(name) {
  console.log(name);
  let prev = document.querySelectorAll('.selectItem.clicked');
  for(var i=0; prev[i]; i++) {
    prev[i].classList.remove('clicked');
  }
  let next = document.querySelectorAll(`.selectItem.item${name}`);
  for(var i=0; next[i]; i++) {
    next[i].classList.add('clicked');
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/data/test${name}.txt`);
  xhr.onreadystatechange = function() {
    setText(xhr.responseText);
    setAudioVideo();
  }
  xhr.send();
}

function setText(text) {
  var textView = document.querySelectorAll('#textView')[0];
  textView.innerText = text;
}

function setAudioVideo() {
  var audioView = document.querySelectorAll('#audioView')[0];
  audioView.replaceWith(audioView.cloneNode(true));
  audioView = document.querySelectorAll('#audioView')[0];
  audioView.style = 'display: block';
  audioView.src = "/data/test0.wav";
  audioView.load();

  var videoView = document.querySelectorAll('#videoView')[0];
  videoView.replaceWith(videoView.cloneNode(true));
  videoView = document.querySelectorAll('#videoView')[0];
  videoView.style = 'display: block';
  videoView.src = "/data/test0.mp4";
  videoView.load();

  audioView.addEventListener('play', function() {
    videoView.play();
    videoView.currentTime = audioView.currentTime;
  });
  audioView.addEventListener('pause', function() {
    videoView.pause();
  });
  audioView.addEventListener('ended', function() {
    videoView.ended();
  });

  videoView.addEventListener('play', function() {
    audioView.play();
    audioView.currentTime = videoView.currentTime;
  });
  videoView.addEventListener('pause', function() {
    audioView.pause();
  });
  videoView.addEventListener('ended', function() {
    audioView.ended();
  });
}