var mosiTable = document.querySelectorAll('#mosi-table tbody');
var moseiTable = document.querySelectorAll('#mosei-table tbody');

loadMosiScoreboard();
loadMoseiScoreboard();

function loadMosiScoreboard() {
  var mosiHTTPRequest = new XMLHttpRequest();
  mosiHTTPRequest.open('GET', 'http://localhost:3000/csv/list?dataset=mosi');
  mosiHTTPRequest.onreadystatechange = function() {
    if(this.readyState == 4) {
      setScoreboard(JSON.parse(mosiHTTPRequest.responseText), 'mosi');
    }
  }
  mosiHTTPRequest.send();
}

function loadMoseiScoreboard() {
  var moseiHTTPRequest = new XMLHttpRequest();
  moseiHTTPRequest.open('GET', 'http://localhost:3000/csv/list?dataset=mosei');
  moseiHTTPRequest.onreadystatechange = function() {
    if(this.readyState == 4) {
      setScoreboard(JSON.parse(moseiHTTPRequest.responseText), 'mosei');
    }
  }
  moseiHTTPRequest.send();
}

var scoreboardRowList = ['Model', 'MAE', 'Corr', 'Acc-7', 'Acc-2', 'F1'];

function setScoreboard(modelList, dataset) {
  var table = document.querySelectorAll(`#${dataset}-table tbody`)[0];
  modelList.map((model) => {
    let modelColumn = document.createElement('tr');
    scoreboardRowList.map((e) => {
      let modelTd = document.createElement('td');
      if(e == 'Model') modelTd.innerText = model;
      else modelTd.innerText = '0%';
      modelColumn.appendChild(modelTd);
    });
    table.appendChild(modelColumn);
  });
}