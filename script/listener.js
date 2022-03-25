// item select listener
function clickListener(name) {
  let prev = document.querySelectorAll('.selectWrapper .selectItem.clicked');
  for(var i=0; prev[i]; i++) {
    prev[i].classList.remove('clicked');
  }
  let next = document.querySelectorAll(`.selectWrapper .selectItem.item${name}`);
  for(var i=0; next[i]; i++) {
    next[i].classList.add('clicked');
  }

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `/data/text/${name}.txt`);
  xhr.onreadystatechange = function() {
    setText(xhr.responseText);
    setAudioVideo(name);
  }
  xhr.send();

  setClipItem(name);
}

function clickClipListener(name) {
  let prev = document.querySelectorAll('#clipSelectWrapper .selectItem.clicked');
  for(var i=0; prev[i]; i++) {
    prev[i].classList.remove('clicked');
  }
  let next = document.querySelectorAll(`#clipSelectWrapper .selectItem.item${name}`);
  for(var i=0; next[i]; i++) {
    next[i].classList.add('clicked');
  }
}

function setText(text) {
  var textView = document.querySelectorAll('#textView')[0];
  textView.innerText = text;
}

function setAudioVideo(name) {
  var audioView = document.querySelectorAll('#audioView')[0];
  audioView.replaceWith(audioView.cloneNode(true));
  audioView = document.querySelectorAll('#audioView')[0];
  audioView.style = 'display: block';
  audioView.src = `/data/audio/${name}.wav`;
  audioView.load();

  var videoView = document.querySelectorAll('#videoView')[0];
  videoView.replaceWith(videoView.cloneNode(true));
  videoView = document.querySelectorAll('#videoView')[0];
  videoView.style = 'display: block';
  videoView.src = `/data/video/${name}.mp4`;
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

// select second section
var workspace = document.querySelectorAll('#workspace')[0]

// header select listener
// var headerItemList = document.querySelectorAll('.header-item');
// for(let i=0; headerItemList[i]; i++) {
//   headerItemList[i].addEventListener('click', function() {
//     console.log(i);
//     setHeader(headerItemList[i]);
//   });
// }

// function setHeader(headerItem) {
//   let prev = document.querySelectorAll('.header-item.selected');
//   for(var i=0; prev[i]; i++) {
//     prev[i].classList.remove('selected');
//   }
//   headerItem.classList.add('selected');
// }