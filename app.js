/*
 @cast object will get automatically created by the Chomecast extension
  ONLY IF YOU HAVE THE CORRECT HTML TAG DECLARATIONS
 */
var cast, cast_api, cv_activity;

if (cast && cast.isAvailable) {
  // Cast is known to be available
  init();
} else {
  // Wait for API to post a message to us
  window.addEventListener("message", function(event) {
    if (event.source == window && event.data &&
      event.data.source == "CastApi" &&
      event.data.event == "Hello")
      init();
  });
}

function init(){
  alert('SHIZ WAS INIT\'D');
}