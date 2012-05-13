Meteor.subscribe("allposts");
Meteor.subscribe("allquestions");

//confirm required
Meteor.methods({
  insertContactUs: insertContactUs,
  insertAddAQuestion: insertAddAQuestion,
  insertSubscribe: insertSubscribe,
  insertPost: insertPost
});

$(document).ready(
  function() {
    // hack to close fb pop up bcuz using their dialog plugin rather than straight api calls
    if(window.location.pathname.indexOf("fbsharedone") >= 1){
      console.log('fbsharedone found on doc ready');
      window.opener='x';
      window.close();
      //self.close(); 
      //this.close();
    }

});