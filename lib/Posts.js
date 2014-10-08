Posts = new Meteor.Collection("Posts");

Posts.isQuestion = function(text){
  return Questions.find({question: text}, {reactive: false}).count();
}