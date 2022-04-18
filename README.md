# ICME2022-Demo

## Requirements
node >= v14.17.3

## Run Demo in Local
``` bash
$ git clone https://github.com/SoyeonHH/ICME2022-Demo.git
$ cd ICME2022-Demo
$ npm install
$ node app.js
```

## Run Demo in Background
Nodejs contains package that helps to run process in background. In this project, we use the package names 'forever' to run it.<br>For using it, you have to install the forever package in global. This section subscribes the commands, assuming that your device already has forever npm package globally.

### Run the process in background
``` bash
$ forever start app.js
```

### Stop the process
``` bash
$ forever list
$ forever stop {process number}
```

You can find the process number in bracket ''['' and '']'' . <br>The process number will be 0 as default, if you do not run any other process with forever.

``` bash
$ forever stop 0
```

You can find more information about forever package in the below link:<br>https://www.npmjs.com/package/forever

---


## Chart.js
We use [chart.js-3.7.1](https://www.chartjs.org/docs/latest/getting-started/installation.html) for models distribution representation referring to [https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)

![pie_chart](/image/pie_chart.png)



---

## Usage

### Download datasets

You can download the [raw datasets](http://immortal.multicomp.cs.cmu.edu/raw_datasets/) and [preprocessed csd format datasets](http://immortal.multicomp.cs.cmu.edu/raw_datasets/processed_data/) of CMU-MOSI and CMU-MOSEI.

If you want to process these data on high-level aligned computational sequences, please see the github page [https://github.com/A2Zadeh/CMU-MultimodalSDK](https://github.com/A2Zadeh/CMU-MultimodalSDK)

Also, you can download pkl files that are used in our demo model predictions in [hear](https://drive.google.com/drive/folders/1IBwWNH0XjPnZWaAlP1U2tIJH6Rb3noMI).

### Multimodal Sentiment Analysis Tasks

In DeMuSA, three MSA research models are used. You can reference the detail usage of prediction models in each Github page and papers.

* [MAG: Integrating Multimodal Information in Large Pretrained Transformers](https://github.com/SoyeonHH/ICME2022-Demo/tree/main/src/MAG) ([paper](https://aclanthology.org/2020.acl-main.214.pdf), [Github](https://github.com/WasifurRahman/BERT_multimodal_transformer))

* [MISA: Modality-Invariant and -Specific Representations for Multimodal Sentiment Analysis](https://github.com/SoyeonHH/ICME2022-Demo/tree/main/src/MISA) ([paper](https://arxiv.org/pdf/2005.03545.pdf), [Github](https://github.com/declare-lab/MISA))

* Multimodal-Infomax: Improving Multimodal Fusion with Hierarchical Mutual Information Maximization for Multimodal Sentiment Analysis ([paper](https://arxiv.org/pdf/2109.00412.pdf), [Github](https://github.com/declare-lab/Multimodal-Infomax))

---


## Contacts
* Soyeon Hong: sodus1102@ajou.ac.kr
* Jeonghoon Kim: kkk26hy@ajou.ac.kr
* Donghoon Lee: oss002@ajou.ac.kr
