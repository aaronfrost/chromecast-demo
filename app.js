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

  /*
   AFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAF
        Now that the extension has recognized our page as a Chromecast enabled page,
        we need to discover all of the nearby devices
   AFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAF
   */

  // the @cast object get populated by the Chromecast extension once it validates that this is a true sender page
  cast_api = new cast.Api();

  // Find all devices that are nearby that are capable of performing "YouTube" activities, AKA: All Nearby Chromecasts
  cast_api.addReceiverListener("YouTube", onReceiverList);

}

function onReceiverList(list) {
  if(!list || !list.length) return;

  console.log("HERE IS THE BLOODY LIST OF RECEIVERS", list);

}
