/**
 * Tests if the status bar gets updated at the very end
 * To run:
 *  npm install progress-string
 *
 */
const log = require("../index.js")({
  ololog_configure: {
    locate: false,
    tag: true
  }
});

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
let maxCount = 20;

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
const interval = setInterval(() => {
  var date = new Date();
  log(date);
  log.info(`Hi this is log line ${i++}: `, i);
  log.info(`Here is another log line ${i}`);
  log.info(`-----------------------------------------------------------------`);
  log.setStatusBarText([`Progress: ${pBar(i)}`]);
  // Tests if status bar gets updated when scrollable log is not enabled
  if (i == maxCount) {
    i = 0;
    log.setStatusBarText([`Complete!`]); // This should print
    log.statusBarTextPush([`Complete 2!`]); // This should print
    log.statusBarTextPush([`Complete 3!`]); // This should NOT print
    log.statusBarTextPop();
    clearInterval(interval);
  }
}, 100);
