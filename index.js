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
  cursor = ansi(process.stdout);
var default_ololog_configure = {
  locate: false,
  tag: false
};
var ololog = require("ololog").configure(default_ololog_configure);

var defaultConfig = {
  ololog_configure: default_ololog_configure,
  initialStatusTextArray: [
    `Call log.setStatusBarText(["Your Text"]) to set this line.`
  ]
};
module.exports = function(config=defaultConfig) {
  var log = ololog.configure(
    config.ololog_configure || defaultConfig.ololog_configure
  );
  var statusTextArray =
    config.initialStatusTextArray || defaultConfig.initialStatusTextArray;

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

  log.methods({
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
    }
  });

  return log;
};
