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

function Analysis(goldModel, Model, classType) {
  this.classType = classType
  this.currentVideo = null

  this.updateGraph = function(){
    //create class accuracy bar-graph

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
