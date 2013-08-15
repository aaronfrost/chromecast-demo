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
  // the @cast object get populated by the Chromecast extension once it validates that this is a true sender page
  cast_api = new cast.Api();

  // Find all devices that are nearby that are capable of performing "YouTube" activities, AKA: All Nearby Chromecasts
  cast_api.addReceiverListener("YouTube", onReceiverList);

}

function onReceiverList(list) {
  if(!list || !list.length) return;

  /*
   AFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAF
      Now that we have he receiver, we need to launch something to the Chromecast
   AFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAFAF
   */
  var receiver = list[0];
  sendSomethingToBloodyReceiver(receiver);
}

function sendSomethingToBloodyReceiver(r){
  console.log('Sending Launch Request');
  var request = new cast.LaunchRequest("YOUR_APP_ID", r);
  request.description = new cast.LaunchDescription();
  request.description.text = "HELLO GDG UTAH";
  request.description.url = "https://developers.google.com/groups/chapter/111917982940065392922/";
  cast_api.launch(request, onLaunch);
}

function onLaunch(activity){
  console.log('In Launch Request Callback')
  if (activity.status === 'running') {
    cv_activity = activity;

    //REMIND ME TO PUT IN A RANDOM WORD HERE
    cast_api.sendMessage(cv_activity.activityId, 'AF-GDG-GOOGLECAST-DEMO', {type: 'Hello GDG Utah', randomWord:''});
  }
}
