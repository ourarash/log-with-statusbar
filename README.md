# log-with-statusbar
A light weight logger with a status bar on the bottom that does not disappear with scrolling.

- [x] Prints system log while showing a status line message at the bottom without scrolling
- [x] Supports multiple non-scrollable status lines
- [x] Integrates with [Ololog](https://github.com/xpl/ololog)


# Install
```bash
npm install log-with-statusbar
```
# Usage
```javascript

const log = require("./index.js");

// Set the bottom status lines
// Each line is an entry of the array
log.setStatusBarText([
  `This is non-scrollable status bar line 1`,
  `This is non-scrollable status bar line 2`
]);

// Normal scrollable system logs
log(`This is a normal scrollable log`);
```

# Another Example
```javascript

const log = require("./index.js");
let i = 0;
let maxCount = 20;

setInterval(() => {
  var date = new Date();
  log(date);
  log.info(`Hi this is log line ${i++}`);
  log.info(`Here is another log line ${i}`);
  log.info(`-----------------------------------------`);
  if(i<5){
    log.setStatusBarText([`Complete!`]);
  } else{
    log.setStatusBarText([`Progressing: ${(i)}`]);

  }
  if (i == maxCount) {
    i = 0;
  }

}, 100);

```
