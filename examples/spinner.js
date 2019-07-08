/**
 * Demonstrate how to use statusBarTextPush and statusBarTextPop
 * functions to add/remove lines
 * To run:
 *  npm install progress-string
 * By: Ari Saif
 */
var log = require("../index.js")({
  ololog_configure: {
    locate: false,
    tag: true
  }
});
require("ansicolor").nice;

var progressString;
try {
  progressString = require("progress-string");
} catch (error) {
  console.log(
    `Please run "npm install progress-string" before running the demo.`
  );
  process.exit();
}

let i = 0;
let maxCount = 100;

var pBar = progressString({
  width: 40,
  total: maxCount,
  complete: "█",
  incomplete: "░",
  style: function(complete, incomplete) {
    return complete + "▒" + incomplete;
  }
});
log.configure({
  tag: true,
  locate: false
});

log.info(`-----------------------------------------------------------------`);
var date = new Date();
log(date);
log(`Generating randome numbers`);
log.info(`-----------------------------------------------------------------`);

let frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

setInterval(() => {
  log.info(Math.round(Math.random() * 1000 * 1000 * 1000));
  i++;
  log.setStatusBarText([]);
  log.setStatusBarText([
    frames[i % frames.length] + 
    ` Generating random numbers:` +
      `${Math.round((i / maxCount) * 100).toString()}%`.green
      
  ]);

  if (i == maxCount) {
    i = 0;
  }
}, 50);
