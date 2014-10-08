// TODO in future change to publish limits instead of slicing on the client side
Meteor.publish("allposts", function() {
  return Posts.find({}, {sort: {id: -1}, limit: 125});
});

Meteor.publish("allquestions", function() {
  return Questions.find();
});


