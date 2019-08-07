var log = require("../index.js")({
  maxVerbosity: 1,  //Minimum verbosity level
  verbosity: 1,     //Default verbosity level
  enableStatusBar: false
});

// We only print if verbosity is less than or equal maxVerbosity
log("This prints because (1 <= 1)= true");
log.verbosity(1).info("This will print, (1 <= 1) = true");

//Default verbosity level is 1
log.info("This will print, (1 <= 1) = true");

log.verbosity(17).info("This won't print, (17 <= 1) = false");

//Let's be more verbose now!
log.info("Changing maxVerbosity to 1000");
log = log.maxVerbosity(1000);
log.verbosity(17).info("This will print, (17 <= 1000) = ture");
log.verbosity(12).info("This will print, (12 <= 1000) = true");
log.verbosity(1).info("This will print, (1 <= 1000) = true");
log.verbosity(1500).info("This will not print, (1500 <= 1000) = false");
//Default verbosity level is 1
log.info("This will print, (1 <= 1) = true");

// Changing default verbosity level
log = log.verbosity(1600);
log.info("This won't print, (1600 <= 1500) = false");

