//this logic is shared on client and server, be careful editing logic
AddAQuestion = new Meteor.Collection("AddAQuestion");

AddAQuestion.validateParams = function(params) {
  this.Utils.validateParams(params);
}

AddAQuestion.validateEmail = function(email) {
  this.Utils.validateEmail(email);
}