Posts = new Meteor.Collection("posts");

Posts.isQuestion = function(text){
  return Questions.find({question: text}, {reactive: false}).count();
}