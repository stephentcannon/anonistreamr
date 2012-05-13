Subscribe = new Meteor.Collection("Subscribe");
Subscribe.Utils = new Utils();

Subscribe.validateParams = function(params) {
  this.Utils.validateParams(params);
}

Subscribe.validateEmail = function(email) {
  this.Utils.validateEmail(email);
}