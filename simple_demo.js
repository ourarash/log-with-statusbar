
const log = require("./index.js");
let i = 0;
let maxCount = 20;


setInterval(() => {
  var date = new Date();
  log(date);
  log.info(`Hi this is log line ${i++}`);
  log.info(`Here is another log line ${i}`);
  log.info(`-----------------------------------------------------------------`);
  if(i<5){
    log.setStatusBarText([`Complete!`]);
  } else{
    log.setStatusBarText([`Progressing: ${(i)}`]);

  }
  if (i == maxCount) {
    i = 0;
    
  }

}, 100);
