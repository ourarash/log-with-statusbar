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
var linesToDelete = 0;
var g_enableStatusBar = true;
//-----------------------------------------------------------------------------
var default_ololog_configure = {
  locate: false,
  tag: (
    lines,
    {
      level = "",
      minVerbosity = 1,
      verbosity = 1,
      enable = true,
      levelColor = {
        info: cyan,
        warn: yellow,
        error: red.bright.inverse,
        debug: blue
      }
    }
  ) => {
    if (!enable) {
      return [];
    }
    const levelStr =
      level && (levelColor[level] || (s => s))(level.toUpperCase());
    if (verbosity <= minVerbosity) {
      if (level) {
        return bullet(levelStr.padStart(6) + "  ", lines);
      } else {
        return lines;
      }
    } else {
      return [];
    }
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
    renderStatusbar();
  },
  /**
   *
   * Returns the current status bar
   * @returns {Array}
   */
  getStatusBarText() {
    return statusTextArray;
  },
  /**
   *
   * Adds one line to the status bar
   * @returns null
   */
  statusBarTextPush(text) {
    if (statusTextArray && Array.isArray(statusTextArray)) {
      statusTextArray.push(text);
    } else {
      statusTextArray = [text];
    }
    renderStatusbar();
  },
  /**
   *
   * Remove one line to the status bar
   * @returns null
   */
  statusBarTextPop() {
    if (statusTextArray && Array.isArray(statusTextArray)) {
      statusTextArray.pop();
      renderStatusbar();
    }
  },
  /**
   * Sets the default verbosity
   * We only print if verbosity is less than or equal minVerbosity
   * @param {Number} n
   */
  verbosity(n) {
    return this.configure({ tag: { verbosity: n } });
  },
  /**
   * Sets the minimum verbosity
   * We only print if verbosity is less than or equal minVerbosity
   * @param {Number} n
   */
  minVerbosity(n) {
    return this.configure({ tag: { minVerbosity: n } });
  },
  /**
   * Completely disables logging both scrollable and status bar
   */
  enable() {
    g_enableStatusBar = true;
    return this.configure({ tag: { enable: true } });
  },
  /**
   * Completely enables logging both scrollable and status bar
   */
  disable() {
    g_enableStatusBar = false;
    return this.configure({ tag: { enable: false } });
  },
  /**
   * Enables the status bar
   */
  enableStatusBar() {
    g_enableStatusBar = true;
    printStatusbar();
  },
  /**
   * Disables the status bar
   */
  disableStatusBar() {
    clearStatusBar();
    g_enableStatusBar = false;
  }
};
//-----------------------------------------------------------------------------
/**
 * Clears the status bar text
 */
function clearStatusBar() {
  if (g_enableStatusBar) {
    for (let index = 0; index < linesToDelete; index++) {
      cursor.up();
      cursor.eraseLine();
    }
  }
}
//-----------------------------------------------------------------------------
/**
 * Renders the status bar text
 */
function printStatusbar() {
  if (g_enableStatusBar) {
    statusTextArray.forEach(l => {
      let k = String.raw`${l}`;
      k = k.replace(/\n/, "\\n");
      k = k.substring(0, process.stdout.columns);
      console.log(k);
    });
    linesToDelete = statusTextArray.length;
  }
}

function renderStatusbar() {
  clearStatusBar();
  printStatusbar();
}
//-----------------------------------------------------------------------------
var ololog = require("ololog").configure(default_ololog_configure);

var defaultConfig = {
  g_enableStatusBar: true,
  ololog_configure: default_ololog_configure,
  ololog_methods: default_ololog_methods,
  initialStatusTextArray: [
    `Call log.setStatusBarText(["Your Text"]) to set this line.`
  ],
  minVerbosity: 1, //Minimum verbosity level
  verbosity: 1 //Default verbosity level
};
//-----------------------------------------------------------------------------
module.exports = function(config = defaultConfig) {
  var log = ololog.configure(
    config.ololog_configure || defaultConfig.ololog_configure
  );

  var methods = config.ololog_methods || defaultConfig.ololog_methods;

  statusTextArray =
    config.initialStatusTextArray || defaultConfig.initialStatusTextArray;

  g_enableStatusBar = config.g_enableStatusBar;
  if (g_enableStatusBar === undefined || g_enableStatusBar === null) {
    g_enableStatusBar = defaultConfig.g_enableStatusBar;
  }

  let minVerbosity = config.minVerbosity || defaultConfig.minVerbosity;
  let verbosity = config.verbosity || defaultConfig.verbosity;

  log = log.configure({
    "+render"(text) {
      clearStatusBar();

      return text;
    },
    "render+"(text) {
      printStatusbar();

      return text;
    }
  });

  log.methods(methods);
  log = log.minVerbosity(minVerbosity);
  log = log.verbosity(verbosity);

  return log;
};
