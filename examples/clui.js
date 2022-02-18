var clui = require("clui");
// var log = require("log-with-statusbar")();
var log = require("./index.js")();
var reqsPerSec = [10,12,3,7,12,9,23,10,9,19,16,18,12,12];
var Sparkline = require('clui').Sparkline;

// console.log(Sparkline(reqsPerSec, 'reqs/sec'));

var Progress = clui.Progress;
var value = 50;

var thisProgressBar = new Progress(20);
// console.log(thisProgressBar.update(value, 100));
log.setStatusBarText([thisProgressBar.update(value, 100)]);

var intervalId = setInterval(function() {
  value++;
  // console.log("Updated value: " + value);
  log("Updated value: " + value);

  // process.stdout.write('\033c'); // clearing the console
  log.setStatusBarText([thisProgressBar.update(value, 100),
    Sparkline(reqsPerSec, 'reqs/sec')
  ]);
  // console.log(thisProgressBar.update(value, 100));
  if (value === 100) {
    clearInterval(intervalId);
  }
}, 500);
