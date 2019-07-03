# log-with-statusbar

A light weight logger with a status bar on the bottom that does not disappear with scrolling.

You can also attach a verbosity level to each scrollable log call.

[![NPM](https://badge.fury.io/js/log-with-statusbar.svg)](https://www.npmjs.com/package/log-with-statusbar)

- [x] Prints system log while showing a status line message at the bottom without scrolling
- [x] Supports multiple non-scrollable status lines
- [x] Based on [ololog](https://github.com/xpl/ololog). All features of ololog are available.

![Demo picture](https://raw.githubusercontent.com/ourarash/log-with-statusbar/master/screenshot2.gif)

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
let i = 0;
setInterval(() => {
  log.info(`This is a normal scrollable log ${i++}`);
}, 1);
```

# Examples
Several examples are available in [examples](examples) folder

# Other Functions
```javascript
// Adds one line to the status bar (See examples/push_pop_demo.js)
log.statusBarTextPush(`Adding one line to the status bar`);

// Adds one line to the status bar (See examples/push_pop_demo.js)
log.statusBarTextPop(`Remove the last line from the status bar`);
```
# Configurations

If you just want to use the status bar and also setup ololog parameters, you can set the following:

```javascript
const log = require("log-with-statusbar")({
  ololog_configure: {
    locate: false,
    tag: true
  }
});
```

`ololog_configure`: sets the [ololog](https://github.com/xpl/ololog) configurations. All features of ololog are available.

## Status bar configurations:
The following settings are for the status bar behavior:

```javascript
const log = require("log-with-statusbar")({
  initialStatusTextArray: [`Please wait...`],
  enableStatusBar: true
});
```

## Bonus: Verbosity 

You can attach a verbosity level to each scrollable log call. Each log call will print out its output only if the attached verbosity level is higher than the global minimum verbosity leve:

- Calling `log.verbosity(n).info("Test");` attaches verbosity level `n` to this call.
- Calling `log.info("Test");` attaches verbosity the default verbosity level to this call.
- Calling `log = log.minVerbosity(1000);` will change the global minimum verbosity level

Below is an example:
```javascript
// We only print if verbosity is less than or equal minVerbosity

var log = require("log-with-statusbar")({
  minVerbosity: 1,  //Minimum verbosity level
  verbosity: 1,     //Default verbosity level
  enableStatusBar: false
});

// Non-verbose mode: The lines with verbosity 2 and 3 won't print
log("This prints because (1 <= 1)= true");
log.verbosity(2).info("Less important line 1");
log.verbosity(3).info("Even less important line 2");

console.log("\nLet's be more verbose!\n");

// Let's be more verbose: The lines with verbosity 2 and 3 will now print
log = log.minVerbosity(3);
log("This prints because (1 <= 3)= true");
log.verbosity(2).info("Less important line 1");
log.verbosity(3).info("Even less important line 2");

```

And here is a more complicated example:

```javascript
var log = require("log-with-statusbar")({
  minVerbosity: 1,      //Minimum verbosity level
  verbosity: 1,         //Default verbosity level
  enableStatusBar: false
});

// We only print if verbosity is less than or equal minVerbosity
log("This prints using default verbosity level: (1 <= 1)= true");

// Attaching verbosity level 1
log.verbosity(1).info("This will print, (1 <= 1) = true");

// Attaching verbosity level 17
log.verbosity(17).info("This won't print, (17 <= 1) = false");

//Let's be more verbose now!
log.info("Changing minVerbosity to 1000");
log = log.minVerbosity(1000);
log.verbosity(17).info("This will print, (17 <= 1000) = ture");
log.verbosity(12).info("This will print, (12 <= 1000) = true");
log.verbosity(1).info("This will print, (1 <= 1000) = true");
log.verbosity(1500).info("This won't print, (1500 <= 1000) = false");
//Default verbosity level is still 1
log.info("This will print, (1 <= 1000) = true");

// Changing default verbosity level
log = log.verbosity(1600);
log.info("This won't print, (1600 <= 1500) = false");
```
