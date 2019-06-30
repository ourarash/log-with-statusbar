/**
 * A light weight logger with a status bar on the bottom that does not disappear with scrolling
 * The status bar can be multiple lines.
 * Use setStatusBarText() function to set the lines.
 * This is based on npm ololog package
 * By: Ari Saif
 */
/**
 * @module testModule
 */
const ansi = require("ansi"),
  assert = require("assert"),
  cursor = ansi(process.stdout),
  { cyan, yellow, red, dim, blue } = require("ansicolor"),
  bullet = require("string.bullet");

var statusTextArray;
//-----------------------------------------------------------------------------
var default_ololog_configure = {
  locate: false,
  tag: (
    lines,
    {
      level = "",
      minVerbosity = 1,
      verbosity = 1,
      levelColor = {
        info: cyan,
        warn: yellow,
        error: red.bright.inverse,
        debug: blue
      }
    }
  ) => {
    const levelStr =
      level && (levelColor[level] || (s => s))(level.toUpperCase());
    if (verbosity <= minVerbosity) {
      if (level) {
        return bullet(levelStr.padStart(6) + "  ", lines);
      } else {
        return lines;
      }
    } else return [];
  }
};
//-----------------------------------------------------------------------------
var default_ololog_methods = {
  /**
   *
   * @param {Array} arrayOfStatusLines An array of values.
   * Each value will be printed in a separate line.
   * New lines will be escaped
   * @returns {null}
   */
  setStatusBarText(arrayOfStatusLines) {
    assert(
      Array.isArray(arrayOfStatusLines),
      "Error: The parameter to setStatusBarText should be an array."
    );
    statusTextArray = arrayOfStatusLines;
  },
  verbosity(n) {
    return this.configure({ tag: { verbosity: n } });
  },
  minVerbosity(n) {
    return this.configure({ tag: { minVerbosity: n } });
  }
};
//-----------------------------------------------------------------------------
var ololog = require("ololog").configure(default_ololog_configure);

var defaultConfig = {
  enableStatusBar: true,
  ololog_configure: default_ololog_configure,
  ololog_methods: default_ololog_methods,
  initialStatusTextArray: [
    `Call log.setStatusBarText(["Your Text"]) to set this line.`
  ],
  minVerbosity: 1,  //Minimum verbosity level
  verbosity: 1,     //Default verbosity level
};
//-----------------------------------------------------------------------------
module.exports = function(config = defaultConfig) {
  var log = ololog.configure(
    config.ololog_configure || defaultConfig.ololog_configure
  );

  var methods = config.ololog_methods || defaultConfig.ololog_methods;

  statusTextArray =
    config.initialStatusTextArray || defaultConfig.initialStatusTextArray;

  let enableStatusBar = config.enableStatusBar;
  if (enableStatusBar === undefined || enableStatusBar === null) {
    enableStatusBar = defaultConfig.enableStatusBar;
  }

  let minVerbosity = config.minVerbosity || defaultConfig.minVerbosity;
  let verbosity = config.verbosity || defaultConfig.verbosity;


  if (enableStatusBar) {
    log = log.configure({
      "+render"(text) {
        statusTextArray.forEach((l, i) => {
          cursor.up();
          cursor.eraseLine();
        });
        return text;
      },
      "render+"(text) {
        statusTextArray.forEach(l => {
          let k = String.raw`${l}`;
          k = k.replace(/\n/, "\\n");
          k = k.substring(0, process.stdout.columns);
          console.log(k);
        });
        return text;
      }
    });
  }

  log.methods(methods);
  log = log.minVerbosity(minVerbosity);
  log = log.verbosity(verbosity);


  return log;
};
