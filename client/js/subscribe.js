$(function() {
  $("#name").focus();
});

Template.subscribe.events = {
  'click #btnSubscribe': function (event) {
    var params = $('#subscribe-form').toJSON();
    try{
      Subscribe.validateParams(params);
      Subscribe.validateEmail(params.email);
      $('#buttons-subscribe').fadeOut(1000, function(){
        $('#progress-subscribe').fadeIn(1000, function(){
         $('#bar-subscribe').width('66%');
         Meteor.call('insertSubscribe', params, function (error, result) { 
            if(result){
              $('#bar-subscribe').width('100%');
              $('#progress-subscribe').fadeOut(1000, function(){
                $('#bar-subscribe').width('33%');
                $('#subscribe-form').fadeOut(2000, function(){
                  $('#buttons-subscribe').show();
                });
                Alert.setAlert('awesome!', result, 'alert-success', 'subscribe');
                $('#subscribeDialog').fadeOut(3000, function(){
                  $('#subscribeDialog').modal('hide');
                  $('#subscribe-form').show();
                  $("#subscribe-form").reset();
                }) 
              });
            } else {
              $('#progress-subscribe').fadeOut(1000, function(){
                $('#bar-subscribe').width('33%');
                Alert.setAlert('uh-oh!', error + error.reason, 'alert-error', 'subscribe');
                $('#buttons-subscribe').fadeIn(1000);
              });
            }
         });
        });
      }); 
    } catch(error) {
      Alert.setAlert('uh-oh!', error.reason, 'alert-error', 'subscribe');
    }
  }
}

function insertSubscribe(){
  // TODO not sure if this goes here
  this.unblock();
}