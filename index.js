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

var ololog = require("ololog").configure({
  locate: false,
  tag:false
});

var g_statusTextArray = [
  `Call log.setStatusBarText(["Your Text"]) to set this line.`
];

var log = ololog.configure({
  "+render"(text) {
    g_statusTextArray.forEach((l, i) => {
      cursor.up();
      cursor.eraseLine();
    });
    return text;
  },
  "render+"(text) {
    g_statusTextArray.forEach(l => {
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
    g_statusTextArray = arrayOfStatusLines;
  }

});

module.exports = log;
