var mosiTable = document.querySelectorAll('#mosi-table tbody');
var moseiTable = document.querySelectorAll('#mosei-table tbody');

// initialize scoreboard
loadMosiScoreboard();
loadMoseiScoreboard();

function loadMosiScoreboard(isUpload=false) {
  var mosiHTTPRequest = new XMLHttpRequest();
  if(!isUpload) removeScoreboard('mosi');
  var uploadPath = isUpload ? '/upload' : '';
  mosiHTTPRequest.open('GET', `http://210.107.197.59:80/csv${uploadPath}/list?dataset=mosi`);
  mosiHTTPRequest.onreadystatechange = function() {
    if(this.readyState == 4) {
      setScoreboard(JSON.parse(mosiHTTPRequest.responseText), 'mosi', isUpload);
      if(!isUpload) loadMosiScoreboard({isUpload: true});
    }
  }
  mosiHTTPRequest.send();
}

function loadMoseiScoreboard(isUpload=false) {
  var moseiHTTPRequest = new XMLHttpRequest();
  if(!isUpload) removeScoreboard('mosei');
  var uploadPath = isUpload ? '/upload' : '';
  moseiHTTPRequest.open('GET', `http://210.107.197.59:80/csv${uploadPath}/list?dataset=mosei`);
  moseiHTTPRequest.onreadystatechange = function() {
    if(this.readyState == 4) {
      setScoreboard(JSON.parse(moseiHTTPRequest.responseText), 'mosei', isUpload);
      if(!isUpload) loadMoseiScoreboard({isUpload: true});
    }
  }
  moseiHTTPRequest.send();
}

var scoreboardRowList = ['Model', 'MAE', 'Corr', 'Acc-2', 'Acc-7', 'F1'];

function setScoreboard(modelList, dataset, isUpload) {
  var table = document.querySelectorAll(`#${dataset}-table tbody`)[0];
  modelList.map((model) => {
    let modelColumn = document.createElement('tr');
    modelColumn.className = `tr-${dataset} ${model}`
    scoreboardRowList.map((e) => {
      let modelTd = document.createElement('td');
      if(e == 'Model') {
        modelTd.innerText = model; 
        modelTd.addEventListener('click', function() {
          getModelCsv(model, dataset, isUpload);

          let prev_mosi = document.querySelectorAll('.tr-mosi.clicked');
          for(var i=0; prev_mosi[i]; i++) {
            prev_mosi[i].classList.remove('clicked');
          }
          let prev_mosei = document.querySelectorAll('.tr-mosei.clicked');
          for(var i=0; prev_mosei[i]; i++) {
            prev_mosei[i].classList.remove('clicked');
          }
          document.querySelectorAll(`.tr-${dataset}.${model}`)[0].classList.add('clicked');
        });
      }
      else modelTd.innerText = '-';
      modelTd.className = `td-${dataset} ${model}`;
      modelColumn.appendChild(modelTd);
    });
    table.appendChild(modelColumn);
    getScoreText(dataset, model);
  });
}

function getModelCsv(modelName, dataset, isUpload) {
  var xhr = new XMLHttpRequest();
  let uploadPath = isUpload ? '/upload' : '';
  xhr.open('GET', `http://210.107.197.59:80/csv${uploadPath}?name=${modelName}&dataset=${dataset}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      readCsv(modelName, dataset, isUpload);
      selectModel(modelName, dataset, JSON.parse(xhr.responseText));
    }
  }
  xhr.send();
}

function removeScoreboard(dataset) {
  var trList = document.querySelectorAll(`.tr-${dataset}`);
  for(var i=0; trList[i]; i++) {
    trList[i].parentElement.removeChild(trList[i]);
  }
}

function getScoreText(dataset, name) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `./score/${dataset}/${name}.txt`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      let scores = xhr.responseText.split(',');
      if(scores.length == 5) {
        let tdList = Array.from(document.querySelectorAll(`.td-${dataset}.${name}`));
        tdList.shift();
        for(let i = 0; i < 5; i++) {
          tdList[i].innerText = scores[i];
        }
      }
    }
  }
  xhr.send();
}

function postScoreText(dataset, name, score) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://210.107.197.59:80/score?dataset=${dataset}&name=${name}&score=${score}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      getScoreText(dataset, name);
    }
  }
  xhr.send();
}