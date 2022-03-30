// item(video id) select listener
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
  xhr.open('GET', `./dataset/text/${name}.txt`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      setText(xhr.responseText);
      setAudioVideo(name);
    }
  }
  xhr.send();

  setClipItem(name);
}

// item(clip id) select listener
function clickClipListener(name) {
  let prev = document.querySelectorAll('#clipSelectWrapper .selectItem.clicked');
  for(var i=0; prev[i]; i++) {
    prev[i].classList.remove('clicked');
  }
  let next = document.querySelectorAll(`#clipSelectWrapper .selectItem.item${name}`);
  for(var i=0; next[i]; i++) {
    next[i].classList.add('clicked');
  }

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `./dataset/segment/text/${name}.txt`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      setText(xhr.responseText);
      setAudioVideo(name, {isClip: true});
    }
  }
  xhr.send();
}

// set Data Observation text
function setText(text) {
  var textView = document.querySelectorAll('#textView')[0];
  textView.innerText = text;
}

// set Data Observation audio & video
function setAudioVideo(name, isClip=false) {
  var audioView = document.querySelectorAll('#audioView')[0];
  audioView.replaceWith(audioView.cloneNode(true));
  audioView = document.querySelectorAll('#audioView')[0];
  audioView.style = 'display: block';
  if(!isClip) audioView.src = `./dataset/audio/${name}.wav`;
  else audioView.src = `./dataset/segment/audio/${name}.wav`;
  audioView.load();

  var videoView = document.querySelectorAll('#videoView')[0];
  videoView.replaceWith(videoView.cloneNode(true));
  videoView = document.querySelectorAll('#videoView')[0];
  videoView.style = 'display: block';
  if(!isClip) videoView.src = `./dataset/video/${name}.mp4`;
  else videoView.src = `./dataset/segment/video/${name}.mp4`;
  videoView.load();

  // DEPRECATED: video & audio sync parallel
  // audioView.addEventListener('play', function() {
  //   videoView.play();
  //   videoView.currentTime = audioView.currentTime;
  // });
  // audioView.addEventListener('pause', function() {
  //   videoView.pause();
  // });
  // audioView.addEventListener('ended', function() {
  //   videoView.ended();
  // });

  // videoView.addEventListener('play', function() {
  //   audioView.play();
  //   audioView.currentTime = videoView.currentTime;
  // });
  // videoView.addEventListener('pause', function() {
  //   audioView.pause();
  // });
  // videoView.addEventListener('ended', function() {
  //   audioView.ended();
  // });
}

// DEPRECATED: selected tab changed font weight
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