$(function() {
  $("#email").focus();
});

Template.addaquestion.events = {
  'click #btnAddAQuestion': function (event) {
    var params = $('#addaquestion-form').toJSON();
    try{
      AddAQuestion.validateParams(params);
      AddAQuestion.validateEmail(params.email);
      $('#buttons-question').fadeOut(1000, function(){
        $('#progress-question').fadeIn(1000, function(){
         $('#bar-question').width('66%');
         Meteor.call('insertAddAQuestion', params, function (error, result) { 
            if(result){
              $('#bar-question').width('100%');
              $('#progress-question').fadeOut(1000, function(){
                $('#bar-question').width('33%');
                $('#addaquestion-form').fadeOut(2000, function(){
                  $('#buttons-question').show();
                });
                Alert.setAlert('awesome!', result, 'alert-success', 'question');
                $('#AddAQuestionDialog').fadeOut(3000, function(){
                  $('#AddAQuestionDialog').modal('hide');
                  $('#addaquestion-form').show();
                  $("#addaquestion-form").reset();
                }) 
              });
            } else {
              $('#progress-question').fadeOut(1000, function(){
                $('#bar-question').width('33%');
                Alert.setAlert('uh-oh! ', error + error.reason, 'alert-error', 'question');
                $('#buttons').fadeIn(1000);
              });
            }
         });
        });
      }); 
    } catch(error) {
      Alert.setAlert('uh-oh! ', error.reason, 'alert-error', 'question');
    }
  }
}

function insertAddAQuestion(){
  this.is_simulation;
  // TODO not sure if this goes here
  this.unblock;
}