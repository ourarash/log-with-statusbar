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
  { cyan, yellow, red, blue } = require("ansicolor"),
  getCursorPosition = require("get-cursor-position");
const spinners = Object.assign({}, require("./spinners.json"));

var g_curPos;

var statusTextArray;
var linesToDelete = 0;
var g_enableStatusBar = true;
var g_position = "bottom";
var g_disableInput = true;

//-----------------------------------------------------------------------------
var default_ololog_configure = {
  locate: false,
  tag: (
    lines,
    {
      level = "",
      maxVerbosity = 1,
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
    if (verbosity <= maxVerbosity) {
      if (level) {
        // Add level only to the first line
        let retVal = lines.map((l, i) => {
          if (i === 0) {
            return levelStr.padStart(6) + ":  " + l;
          } else {
            return l;
          }
        });
        return retVal;
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
   * We only print if verbosity is less than or equal maxVerbosity
   * @param {Number} n
   */
  verbosity(n) {
    return this.configure({ tag: { verbosity: n } });
  },
  /**
   * Sets the maximum verbosity
   * We only print if verbosity is less than or equal maxVerbosity
   * @param {Number} n
   */
  maxVerbosity(n) {
    return this.configure({ tag: { maxVerbosity: n } });
  },
  /**
   * This function is kept only for compatibility. minVerbosity is deprecated.
   * It now only changes maxVerbosity
   * Sets the maximum verbosity 
   * We only print if verbosity is less than or equal maxVerbosity
   * @param {Number} n
   */
  minVerbosity(n) {
    return this.configure({ tag: { maxVerbosity: n } });
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
  },

  getSpinners() {
    return spinners;
  }
};
//-----------------------------------------------------------------------------
/**
 * Clears the status bar text
 */
function clearStatusBar() {
  if (g_enableStatusBar) {
    if (g_position === "bottom") {
      for (let index = 0; index < linesToDelete; index++) {
        cursor.up();
        cursor.eraseLine();
      }
    } else if (g_position === "top") {
      g_curPos = getCursorPosition.sync();
      cursor.goto(1, 1);
      for (let index = 0; index < linesToDelete; index++) {
        cursor.eraseLine();
        cursor.down();
      }
    }
  }
}
//-----------------------------------------------------------------------------
/**
 * Renders the status bar text
 */
function printStatusbar(curPos) {
  if (g_enableStatusBar) {
    if (g_position === "bottom") {
      statusTextArray.forEach(l => {
        let k = String.raw`${l}`;
        k = k.replace(/\n/, "\\n");
        k = k.substring(0, process.stdout.columns);
        console.log(k);
      });
    } else if (g_position === "top") {
      cursor.goto(1, 1);
      statusTextArray.forEach(l => {
        let k = String.raw`${l}`;
        k = k.replace(/\n/, "\\n");
        k = k.substring(0, process.stdout.columns);
        console.log(k);
      });

      if (g_curPos) {
        cursor.goto(1, g_curPos.row);
      }
    }
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
  enableStatusBar: true,
  ololog_configure: default_ololog_configure,
  ololog_methods: default_ololog_methods,
  initialStatusTextArray: [
    `Call log.setStatusBarText(["Your Text"]) to set this line.`
  ],
  maxVerbosity: 1, //maximum verbosity level
  verbosity: 1, //Default verbosity level
  position: "bottom", // top or bottom
  disableInput: false
};
//-----------------------------------------------------------------------------
module.exports = function(config = defaultConfig) {
  var log = ololog.configure(
    config.ololog_configure || defaultConfig.ololog_configure
  );

  var methods = config.ololog_methods || defaultConfig.ololog_methods;

  statusTextArray =
    config.initialStatusTextArray || defaultConfig.initialStatusTextArray;

  g_enableStatusBar = config.enableStatusBar;
  if (g_enableStatusBar === undefined || g_enableStatusBar === null) {
    g_enableStatusBar = defaultConfig.enableStatusBar;
  }

  let maxVerbosity = config.maxVerbosity || defaultConfig.maxVerbosity;
  let verbosity = config.verbosity || defaultConfig.verbosity;
  g_position = config.position || defaultConfig.position;

  g_disableInput = config.disableInput;
  if (g_disableInput === undefined || g_disableInput === null) {
    g_disableInput = defaultConfig.disableInput;
  }
  // We disable input so that pressing keys doesn't affect the displayed text
  // Pressing keys while displaying status bar disturbs the output specially when showing
  //the status bar on the top
  if (g_disableInput) {
    var keypress = require("keypress");
    keypress(process.stdin);
    process.stdin.on("keypress", function(ch, key) {
      if (key && key.ctrl && key.name == "c") {
        process.exit();
        process.exi;
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  log = log.configure({
    "+render"(text) {
      if (g_position === "bottom") {
        clearStatusBar();
      } else if (g_position === "top") {
      }
      return text;
    },
    "render+"(text) {
      if (g_position === "bottom") {
        printStatusbar();
      } else if (g_position === "top") {
        clearStatusBar();
        printStatusbar();
      }
      return text;
    }
  });

  log.methods(methods);
  log = log.maxVerbosity(maxVerbosity);
  log = log.verbosity(verbosity);

  return log;
};
