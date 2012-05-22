////////// Helpers for in-place editing //////////

// Returns an event_map key for attaching "ok/cancel" events to
// a text input (given by selector)
var okcancel_events = function (selector) {
  return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
};

// Creates an event handler for interpreting "escape", "return", and "blur"
// on a text field and calling "ok" or "cancel" callbacks.
var make_okcancel_handler = function (options) {
  var ok = options.ok || function () {};
  var cancel = options.cancel || function () {};

  return function (evt) {
    if (evt.type === "keydown" && evt.which === 27) {
      // escape = cancel
      cancel.call(this, evt);

    } else if (evt.type === "keyup" && evt.which === 13 ) {
      var value = String(evt.target.value || "");
      if (value)
        ok.call(this, value, evt);
      else
        cancel.call(this, evt);
    }
  };
};

var btnclick_events = function(selector) {
  return 'click '+selector;
};

var make_btnclick_handler = function(options) {
  var ok = options.ok || function() {};
  var cancel = options.cancel || function () {};

  return function (evt){
    if (evt.type === "click"){
      var postEntry = $("#messageBox");
      var postEntryValue = $("#messageBox").val();
      if (postEntryValue !== ""){d
        ok.call(this, postEntryValue, postEntry);
      }else{
        cancel.call(this, evt);
      }
    } else {
      cancel.call(this, evt);
    }
  }
}

Template.entry.events = {
  'focus, blur': function (event) { 
    $('#messageBox').css('color','#555');
    //.css('color','#000');
  }
};

Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
  ok: function(text, event){
    insertLocalPost(text);
  }
});

Template.entry.events[btnclick_events('#messageBtn')] = make_btnclick_handler({
  ok: function(text, event){
    insertLocalPost(text);
  }
});

Meteor.setInterval(autoUpdateQuestion, 5000);

function autoUpdateQuestion(){
  if ( $("*:focus").is("input, button") ) {
    return;
  } 
  updateQuestion();
}

function updateQuestion(){
  $('#messageBox').animate({color: '#FFFFFF'  }, 1000, 'linear', function(){
    $('#messageBox').animate({ color: '#555' }, 1000, 'linear').val(Questions.getQuestion()); 
  });

}

function insertLocalPost(vtext){
  if(!Posts.isQuestion(vtext)){
    Meteor.call('insertPost', {text: vtext});
  }
  updateQuestion();
}

function insertPost(){
  // TODO not sure if this goes here
  this.unblock();
}