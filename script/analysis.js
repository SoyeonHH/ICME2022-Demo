import Chart from './chart.js-3.71/chart.js/auto'

var graph_2 = document.getElementById('#graph_class_2');
var graph_7 = document.getElementById('#graph_class_7');

const labels2class = [
  'Negative',
  'Positive'
]
const labels7class = [
  "Very Negative",
  "Negative",
  "Slightly Negative",
  "Neutral",
  "Slightly Positive",
  "Positive",
  "Very Positive",
]

const config = {
  type: 'bar',
  options: {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax:100
      }
    }
  },
};

function Model(modelName, publisher, result) {
  this.modelName = modelName
  this.publisher = publisher
  this.result = result //result on every segment

  this.uploadModel = function(modelName, publisher, inputFile) {
    //update attributes
    this.modelName = modelName
    this.publisher = publisher

    //process input file and make this.result
    this.result = [index_length][]
  }

  this.getClassAcc = function() {//return class accuracy from model's result file
    var returnAcc2 = [0,0]
    var returnAcc7 = [0,0,0,0,0,0,0]

    if(this.result) {//result exist.
      //2 class result
      var cnt2class = [0,0]
      var hit2class = [0,0]

      for (var i = 0; i < this.result.length; i++) {
        var j = -1
        switch(result[i][5]) {
          case 'negative'         : j = 0; break;
          case 'positive'         : j = 1; break;
          default : break; //err uknown class
        }

        cnt2class[j] = cnt2class[j] + 1
        if(result[i][5] == result[i][8]) {//hit
          hit2class[j] = hit2class[j] + 1
        }
      }

      for (var i = 0; i <2; i++) {
        returnAcc2[i] = hit2class[i] / cnt2class[i] * 100
      }


      var cnt7class = [0,0,0,0,0,0,0]
      var hit7class = [0,0,0,0,0,0,0]

      for (var i = 0; i < this.result.length; i++) {
        var j = -1
        switch(result[i][6]) {
          case 'very negative'    : j = 0; break;
          case 'negative'         : j = 1; break;
          case 'slightly negative': j = 2; break;
          case 'neutral'          : j = 3; break;
          case 'slightly positive': j = 4; break;
          case 'positive'         : j = 5; break;
          case 'very positive'    : j = 6; break;
          default : break; //err uknown class
        }

        cnt7class[j] = cnt7class[j] + 1
        if(result[i][6] == result[i][9]) {
          hit7class[j] = hit7class[j] + 1
        }
      }

      for (var i = 0; i <7; i++) {
        returnAcc7[i] = hit7class[i] / cnt7class[i] * 100
      }
    }

    return returnAcc2, returnAcc7
  }
}

function Analysis(goldModel, model) {

  this.goldModel = goldModel
  this.model = model
  this.graph2 = graph_2
  this.graph7 = graph_7
  this.currentVideo = 0
  this.currentClip = 0

  this.updateGraph = function(){
    //create class accuracy bar-graph
    var analysisDataset2;
    var analysisDataset7;

    if(this.model) {//our model is uploaded
      var goldData = this.goldModel.getClassAcc()
      var ourData = this.model.getClassAcc()

      analysisDataset2 = {
        labels: labels2class,
        datasets: [{
          label: 'Gold',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: goldData[0],
        },
        {
          label: 'Our',
          backgroundColor: 'rgb(122, 99, 132)',
          borderColor: 'rgb(122, 99, 132)',
          data: ourData[0],
        }]
      };

      analysisDataset7 = {
        labels: labels7class,
        datasets: [{
          label: 'Gold',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: goldData[1],
        },
        {
          label: 'Our',
          backgroundColor: 'rgb(122, 99, 132)',
          borderColor: 'rgb(122, 99, 132)',
          data: ourData[1],
        }]
      };

    } else {//no model has been uploaded show only gold Model results
      var goldData = this.goldModel.getClassAcc()

      analysisDataset2 = {
        labels: labels2class,
        datasets: [{
          label: 'Gold',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: goldData[0],
        }]
      };

      analysisDataset7 = {
        labels: labels7class,
        datasets: [{
          label: 'Gold',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: goldData[1],
        }]
      };
    }

    new Chart(
      this.graph2,
      data:analysisDataset2,
      config
    );
    new Chart(
      this.graph7,
      data:analysisDataset7,
      config
    );
  }

  this.updatePbarVideo = function(video_id){//Draw Progress Bar of a single Video
    //process this.result via video

    //create per video progress bar

  }

  this.updatePbarSegment = function(segment_id) {//Draw Progress Bar of a single Segment
    //process this.result via video

    //create per segment progress bar

  }

  this.updateView = function(video_id) { //Show Video's video, sound, text

  }

  this.changeVideo = function(video_id) {//When video is chosen hilgiht selected video, Update Prgroess bar for every Segment, update View
    //highlight Selected Video

    //create progress bar for every segment
    while(false) {
      this.updatePbarSegment()
    }

    //update View

  }
}

var goldTestResult = [[abcd,0,text1,-0.5,'negative','slightly negative',-0.4,"negative",'slightly negative']
                     ,[abcd,1,text1,-1.5,'negative','negative',-0.3,"negative",'slightly negative']
                     ,[abcd,2,text1, 2.5,'positive','very positive',0,'positive',"neutral"]
                     ,[abcd,3,text1, 0.5,'positive','slightly positive',0.7,"positive",'slightly positive']
                     ,[abcd,4,text1,-2.5,'negative','very negative',-2.4,"negative",'very negative']
                     ,[abcd,5,text1, 0.3,'positive','neutral',-0.4,"negative",'slightly negative']
                     ,[abcd,6,text1, 1.0,'positive','positive',1.0,"positive",'positive']];
var ourTestResult = [[abcd,0,text1,-0.5,'negative','slightly negative',-0.4,"negative",'slightly negative']
                     ,[abcd,1,text1,-1.5,'negative','negative',-0.3,"negative",'slightly negative']
                     ,[abcd,2,text1, 2.5,'positive','very positive',-0.3,"negative",'slightly negative']
                     ,[abcd,3,text1, 0.5,'positive','slightly positive',1.7,"positive",'positive']
                     ,[abcd,4,text1,-2.5,'negative','very negative',-2.4,"negative",'very negative']
                     ,[abcd,5,text1, 0.3,'positive','neutral',-0.4,"negative",'slightly negative']
                     ,[abcd,6,text1, 1.0,'positive','positive',1.0,"positive",'positive']];

var goldModel = new Model("GOLD", "donghoon", goldResult)
var ourModel = new Model("OUR","notDonghoon",ourTestResult)
var analysis = new Analysis(goldModel, ourModel)

analysis.updateGraph()