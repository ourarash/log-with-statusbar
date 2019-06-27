const log = require("./index.js")();

// Set the bottom status lines
// Each line is an entry of the array
log.setStatusBarText([
  `This is non-scrollable status bar line 1`,
  `This is non-scrollable status bar line 2`
]);

// Normal scrollable system logs
let i=0;
setInterval(() => {
  log.info(`This is a normal scrollable log ${i++}`);  
}, 1);
