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


## Chart.js
We use [chart.js-3.7.1](https://www.chartjs.org/docs/latest/getting-started/installation.html) for models distribution representation referring to [https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)



## Contacts
* Soyeon Hong: sodus1102@ajou.ac.kr
* Jeonghoon Kim: kkk26hy@ajou.ac.kr
* Donghoon Lee: oss002@ajou.ac.kr
