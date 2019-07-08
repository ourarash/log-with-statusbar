/**
 * Demonstrate using status bar to show a spinner
 * To run:
 *  npm install progress-string
 * By: Ari Saif
 */

// Credit for the spinner frames: https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json
const spinners = Object.assign({}, require('../spinners.json'));

var log = require("../index.js")({
  ololog_configure: {
    locate: false,
    tag: true
  }
});
require("ansicolor").nice;

let i = 0;
let maxCount = 100;

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
  let frames = spinners.dots.frames;
  log.setStatusBarText([
    frames[i % frames.length].toString().bright.red +
      ` Generating random numbers: ` +
      `${Math.round((i / maxCount) * 100).toString()}%`.green
  ]);

  if (i == maxCount) {
    i = 0;
  }
}, 50);
