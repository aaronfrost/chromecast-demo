/*
 @cast object will get automatically created by the Chomecast extension
  ONLY IF YOU HAVE THE CORRECT HTML TAG DECLARATIONS
 */
var cast, cast_api, cv_activity, receivers, selectedReceiver, sending;

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

  $('.btn.btn-success').show().on('click', function(){
    sendSomethingToBloodyReceiver(selectedReceiver);
  });

}

function onReceiverList(list) {
  if((receivers && receivers.length) || !list || !list.length) return;
  receivers = list;
  $('.receivers').empty();
  receivers.forEach(function(receiver) {
    $listItem = $('<li><a data-id="' + receiver.id + '">' + receiver.name + '</a></li>');
    $listItem.on('click', function(e){
      var $target = $(e.target);
      selectedReceiver = _.find(receivers, function(receiver){
        return receiver.id === $target.data('id');
      });
      console.log('selectedReceiver', selectedReceiver);
      
    });
    $('.receivers').append($listItem);

  });
}

function sendSomethingToBloodyReceiver(r){
  if(sending) return;
  sending = true;
  console.log('Sending Launch Request');
  var request = new cast.LaunchRequest("36575150-be79-4eae-a940-11b0ed0ae78b_1", r);
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
    cast_api.sendMessage(cv_activity.activityId, 'AF-GDG-GOOGLECAST-DEMO', {
      type: 'Hello GDG Utah',
      name: $('#name').val(),
      email: $('#email').val(),
      favorite: $('#favorite').val(),
      randomWord:'Queen is the best band EVAR!!!'
    });
  }
}
