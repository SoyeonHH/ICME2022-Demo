var mosiTable = document.querySelectorAll('#mosi-table tbody');
var moseiTable = document.querySelectorAll('#mosei-table tbody');

// initialize scoreboard
loadMosiScoreboard();
loadMoseiScoreboard();

function loadMosiScoreboard(isUpload=false) {
  var mosiHTTPRequest = new XMLHttpRequest();
  if(!isUpload) removeScoreboard('mosi');
  var uploadPath = isUpload ? '/upload' : '';
  mosiHTTPRequest.open('GET', `http://210.107.197.59:3000/csv${uploadPath}/list?dataset=mosi`);
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
  moseiHTTPRequest.open('GET', `http://210.107.197.59:3000/csv${uploadPath}/list?dataset=mosei`);
  moseiHTTPRequest.onreadystatechange = function() {
    if(this.readyState == 4) {
      setScoreboard(JSON.parse(moseiHTTPRequest.responseText), 'mosei', isUpload);
      if(!isUpload) loadMoseiScoreboard({isUpload: true});
    }
  }
  moseiHTTPRequest.send();
}

var scoreboardRowList = ['Model', 'MAE', 'Corr', 'Acc-7', 'Acc-2', 'F1'];

function setScoreboard(modelList, dataset, isUpload) {
  var table = document.querySelectorAll(`#${dataset}-table tbody`)[0];
  modelList.map((model) => {
    let modelColumn = document.createElement('tr');
    modelColumn.className = `tr-${dataset}`
    scoreboardRowList.map((e) => {
      let modelTd = document.createElement('td');
      if(e == 'Model') {
        modelTd.innerText = model;
        modelTd.addEventListener('click', function() {
          getModelCsv(model, dataset, isUpload);
        });
      }
      else modelTd.innerText = '0%';
      modelColumn.appendChild(modelTd);
    });
    table.appendChild(modelColumn);
  });
}

function getModelCsv(modelName, dataset, isUpload) {
  var xhr = new XMLHttpRequest();
  let uploadPath = isUpload ? '/upload' : '';
  xhr.open('GET', `http://210.107.197.59:3000/csv${uploadPath}?name=${modelName}&dataset=${dataset}`);
  console.log(`http://210.107.197.59:3000/csv${uploadPath}?name=${modelName}&dataset=${dataset}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      selectModel('temp', dataset, JSON.parse(xhr.responseText));
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
      console.log(xhr.responseText);
    }
  }
  xhr.send();
}

function postScoreText(dataset, name, score) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://210.107.197.59:3000/score?dataset=${dataset}&name=${name}&score=${score}`);
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      getScoreText(dataset, name);
    }
    xhr.send();
  }
}