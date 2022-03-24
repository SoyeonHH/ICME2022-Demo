import Chart from './chart.js-3.71/chart.js/auto'

var context=document
  .getElementByld('graph_class_2')
  .getContext('2d');

function Model(classType, modelName, publisher, result) {
  this.classType = classType //2 or 7 class
  this.modelName = modelName
  this.publisher = publisher
  this.result = result //result on every segment

  this.uploadModel = function(classType, modelName, publisher, inputFile) {
    //update attributes
    this.classType = classType
    this.modelName = modelName
    this.publisher = publisher

    //process input file and make this.result
  }
}

function Analysis(goldModel, model, classType) {
  this.classType = classType
  this.currentVideo = 0
  this.goldModel = goldModel
  this.model = model

  this.updateGraph = function(){
    //create class accuracy bar-graph
    var graph_2class = new Chart(context,{
      type:bar,
      data:{labels:['0','1'], datasets:[{
        lable:'2class',
        fill:false,
        data:[80,60],
        borderColor:['black','black'],
        borderWidth:1
      }

    )
    if(this.model) {//our model is uploaded

    } else {


    }
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

var goldResult
var ourResult

var goldModel = new Model(2, "GOLD", "donghoon", goldResult)
var ourModel = new Model(2, "OUR", "ME", ourResult)
var analysis = new Analysis(goldModel, ourModel, 2)

analysis.updateGraph
