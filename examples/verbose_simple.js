var log = require("../index.js")({
  minVerbosity: 1,  //Minimum verbosity level
  verbosity: 1,     //Default verbosity level
  enableStatusBar: false
});

// We only print if verbosity is less than or equal minVerbosity
// Non-verbose mode. The lines with verbosity 2 and 3 won't print
log("This prints because (1 <= 1)= true");
log.verbosity(2).info("Less important line 1");
log.verbosity(3).info("Even less important line 2");

console.log("\nLet's be more verbose!\n");

// Let's be more verbose. The lines with verbosity 2 and 3 won't print
log = log.minVerbosity(3);
log("This prints because (1 <= 3)= true");
log.verbosity(2).info("Less important line 1");
log.verbosity(3).info("Even less important line 2");
