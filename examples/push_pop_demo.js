/**
 * Demonstrate how to use statusBarTextPush and statusBarTextPop functions to add/remove lines
 * To run:
 *  npm install progress-string
 * By: Ari Saif
 */
const log = require("../index.js")({
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

setInterval(() => {
  log.info(Math.round(Math.random() * 1000 * 1000 * 1000));
  i++;
  log.setStatusBarText([]);
  if (i < 5) {
    log.statusBarTextPush(`Start...`);
  } else {
    log.statusBarTextPush(
      `Generating random numbers: ${pBar(i)}:`+ `${Math.round(
        (i / maxCount) * 100
      ).toString()}%`.green
    );
  }

  if (i > maxCount / 4) {
    log.statusBarTextPush("Pushing a line at 25%!".red);
  }

  if (i > maxCount / 2) {
    log.statusBarTextPush("Pushing a line at 50%!".yellow);
  }

  if (i > (maxCount * 3) / 4) {
    log.statusBarTextPop();
    log.statusBarTextPop();
    log.statusBarTextPush("Popping 2 lines at 75%!".green);
  }

  if (i == maxCount) {
    i = 0;
  }
}, 50);
