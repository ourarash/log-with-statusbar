# log-with-statusbar
A light weight logger with a status bar on the bottom that does not disappear with scrolling.

- [x] Prints system log while showing a status line message at the bottom without scrolling
- [x] Supports multiple non-scrollable status lines
- [x] Integrates with [ololog](https://github.com/xpl/ololog)

![alt text](https://raw.githubusercontent.com/ourarash/log-with-statusbar/master/screenshot.gif)


# Install
```bash
npm install log-with-statusbar
```
# Usage
```javascript
const log = require("log-with-statusbar")();

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

```

# Configurations
You can set the following:

- `ololog_configure`: [ololog](https://github.com/xpl/ololog) configurations

```javascript
const log = require("log-with-statusbar")({
  ololog_configure: {
    locate: false,
    tag: true
  }
});
```

