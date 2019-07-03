/**
 * To run:
 *  npm install progress-string
 *  node demo.js
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

log(`-----------------------------------------------------------------`);
var date = new Date();
log.info(date);
log.info(`Generating randome numbers`);
log(`-----------------------------------------------------------------`);

setInterval(() => {
  // This line will scroll
  log.info(Math.round(Math.random() * 1000 * 1000 * 1000));
  i++;

  // The following will not scroll
  if (i < 5) {
    log.setStatusBarText([`Complete!`]);
  } else {
    log.setStatusBarText([`Progress: ${pBar(i)}`]);
  }
  if (i == maxCount) {
    i = 0;
  }
}, 100);
