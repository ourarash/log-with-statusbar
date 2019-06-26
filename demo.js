/**
 * To run: 
 *  npm install progress-string
 *  node demo.js
 */
const log = require("./index.js");
var progressString;
try {
   progressString = require("progress-string");
} catch (error) {
  console.log(`Please run "npm install progress-string" before running the demo.`);
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
    return complete + "▒" + incomplete ;
  }
});


setInterval(() => {
  var date = new Date();
  log(date);
  log.info(`Hi this is log line ${i++}`);
  log.info(`Here is another log line ${i}`);
  log.info(`-----------------------------------------------------------------`);
  if(i<5){
    log.setStatusBarText([`Complete!`]);
  } else{
    log.setStatusBarText([`Progress: ${pBar(i)}`]);

  }
  if (i == maxCount) {
    i = 0;
    
  }

}, 100);
