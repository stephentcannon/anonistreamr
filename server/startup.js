Meteor.startup(function () {
  _.each(['Posts', 'Questions', 'ContactUsFormPosts', 'AddAQuestion', 'Subscribe'], function(collection) {
    _.each(['insert', 'update', 'remove'], function(method) {
      Meteor.default_server.method_handlers['/' + collection + '/' + method] = function() {};
    });
  });

  if(Questions.find().count() === 0 ){
    var ts = Date.now();
    var questions = [
      "...watchya thinkin bout? ",
      "...your deepeset darkest secret? ",
      "...pour yer heart out! ",
      "...something bothering you? ",
      "...what have you done? ",
      "...what makes you happy? ",
      "...what are you happy about? ",
      "...how have you cheated? ",
      "...what most frightens you? ",
      "...dirty laundry? Hang it out here! ",
      "...whats a kickin' chiken? ",
      "...what is amazing about you? ",
      "...secretly envious about? ",
      "...what do you admire the most? ",
      "...what do you despise most? ",
      "...what lesson is best learned? ",
      "...how can we best teach? ",
      "...what do you wish for? ",
      "...what are you doing? ",
      "...why are you doing that? ",
      "...what cheers you up? ",
      "...how furious are you about that? ",
      "...what are you most proud of? ",
      "...what are you embarrassed about? ",
      "...what is fair? ",
      "...what is unfair? ",
      "...what would you change? ",
      "...what was best? ",
      "...what is good? ",
      "...what is bad? ",
      "...what brings you comfort? ",
      "...what brings you discomfort? ",
      "...what is beyond the stars? ",
      "...if heaven were a place, where would it be? ",
      "...what do couples have? ",
      "...what disgusts you? ",
      "...i love...",
      "...i like...",
      "...i hate...",
      "...i desire...",
      "...i am envious of...",
      "...i am jealous of...",
      "...i am...",
      "...what are you thinking? ",
      "...what would you love to do? ",
      "...whats up? ",
      "...what do you worry about? ",
      "...what is love? ",
      "...what is happiness? ",
      "...what is of importance? ",
      "...what is of value? ",
      "...what is of worth? ",
      "...what is beautiful? ",
      "...how did you cheat? ",
      "...what did you do to her? ",
      "...what did you do to him? ",
      "...what did you do to them? ",
      "...what is the worst you have done? ",
      "...why are you a liar? ",
      "...worst lie you told? ",
      "...worst chatacter trait? ",
      "...thing you did? ",
      "...i am so embarrassed of...",
      "...share your inner most thoughts..."
    ];
    i = questions.length;
    for (i;--i;) {
      //console.log('i: ' + i);
      //console.log(questions[i]);
      Questions.insert({
        question: questions.pop(),
        id : i,
        created: ts
      });
    }
  }

  // TODO comment out in production
  // used only to populate in testing env
  /**
   if(Posts.find().count() === 0) {
    console.log('bootstrapping test messages.');
    console.log('remove from /server/startup.js in prod');
   	for(i=0; i<126; i++){
   		var ts = Date.now();
    	Posts.insert({
    		post: 'Test post #' +i, 
    		created: ts
    	});
   	}
    console.log('bootstrapping test messages completed.');  
   }
   console.log('server running');
   **/
});