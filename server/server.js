// RELEASE: branch: fixemail

Meteor.methods({
  insertPost: insertPost,
  insertAddAQuestion: insertAddAQuestion,
});

function insertPost(args) {
  this.unblock();
  if(args) {
    if(!Posts.isQuestion(args.text)){
      post_text = args.text.slice(0,140);
      var ts = Date.now();
      id =  Posts.insert({
        post: post_text,
        created: ts
      });
      if(id){
        doSocialPosts(post_text, id);
        return result = 'Success';
      } else {
        return result = 'Failure';
      }
    }
  }
}


function doTweet(post_text, id){
  T.post('statuses/update', { status: post_text },
    function(err, reply) {
      if(reply){
        ts = Date.now();
        Fiber(function() {
          Posts.update({_id: id},
          {$set: {twitter_id_str: reply.id_str}});
        }).run();
      } else {
        sendEmail('anonistream Twitter Post Error',
        'anonistream Twitter Post Error',
        '<html><p>Post id: '+id+'></p><p>Error: '+JSON.stringify(err, 0, 4)+'</p></html>',
        config.email_to,
        config.email_from
        );
      }
    }
  );
}

function doFBPost(post_text, id){
  var result = Meteor.http.call('POST', config.fb.page_url, {
      params:{
        access_token: config.fb.access_token,
        message: post_text
      }
    }, function(error, result){
      if (result.statusCode === 200) {
        var content = JSON.parse(result.content);
        Fiber(function() {
          Posts.update({_id: id},
          {$set: {fb_id: content.id}});
        }).run();

      } else {
        sendEmail('anonistream FB Post Error',
        'anonistream FB Post Error',
        '<html><p>Post id: '+id+'</p><p>Error: '+error+'</p><p>Result:</p>'+JSON.stringify(result, 0, 4)+'</html>',
        config.email_to,
        config.email_from
        );
      }
    });
}

function doSocialPosts(post_text, id){
  //stubbed out to handle posts to all kinds of sites
  //not sure if these are going to destroy each other
  if(config.post_social){
    doFBPost(post_text, id);
    doTweet(post_text, id);
  }
  
}


function insertAddAQuestion(params){
  this.unblock();
  if(params){
    AddAQuestion.validateParams(params);
    AddAQuestion.validateEmail(params.email);
    var ts = Date.now();
    id = AddAQuestion.insert({
    created: ts,
    email: params.email.slice(0,100),
    question: params.question.slice(0,140)
    });
    if(id){
      sendEmail('Thank you submitting an anonistream question!',
        'Thank you for submitting an anonistream question.  If it is cool you will see it online soon. If it sucks, well oh well, sucks to be you cuz we will not pubish it!\nThe question you submitted was :\n'+params.question+'\n\nThanks,\nthe anonistream.in team',
        '<html><h1>Thank you for submitting an anonistream question.</h1><p> If it is cool you will see it online soon.</p><p>If it sucks, well oh well, sucks to be you cuz we will not pubish it!</p><p>The question you submitted was : '+params.question+'<p>Thanks,<br/>the anonistream.in team</p></html>',
        params.email,
        config.email_from
      );
      sendEmail('anonistream Question Submitted',
        'Question\n' + params.question,
        '<html><p>From: '+params.email+'</p><p>Question: '+params.question+'</p></html>',
        config.email_to,
        params.email
      );
      return result = 'domo arigato mister roboto!';
    } else {
      throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Failed to insert a "question". Please retry.');
    }
  } else {
    throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Missing params.');
  }
}

