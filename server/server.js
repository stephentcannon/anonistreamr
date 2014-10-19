// RELEASE: branch: fixemail

Meteor.methods({
  insertPost: insertPost,
  insertAddAQuestion: insertAddAQuestion,
  extendFBToken: extendFBToken
});


function insertPost(args) {
  this.unblock();
  if(args) {
    if(!Posts.isQuestion(args.text)){
      post_text = args.text.slice(0,140);
      var ts = Date.now();
      id =  Posts.insert({
        post: post_text,
        created: ts,
        id: new Date().valueOf()
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
  if(Meteor.settings.twitter_on){
    Twit = new TwitMaker({
      consumer_key: Meteor.settings.twit_consumer_key,
      consumer_secret: Meteor.settings.twit_consumer_secret,
      access_token: Meteor.settings.twit_access_token,
      access_token_secret: Meteor.settings.twit_access_token_secret
    });
  }
  var theId = id;
  Twit.post('statuses/update', { status: post_text },
    Meteor.bindEnvironment(
      function(err, reply) {
        if(reply){
          ts = Date.now();
         
            Posts.update({_id: theId},
            {$set: {twitter_id_str: reply.id_str}});
          
  
        } else if(err){
          console.log('Twit.post error');
          console.log(err);
        }
      }
    )
  );
}

function extendFBToken(token){
  console.log('extendFBToken fired');
  // Meteor.call('extendFBToken', token);
  // /oauth/access_token?
  //   grant_type=fb_exchange_token&
  //   client_id={app-id}&
  //   client_secret={app-secret}&
  //   fb_exchange_token={short-lived-token}
    HTTP.call('GET', "https://graph.facebook.com/oauth/access_token", {
      params:{
        grant_type: 'fb_exchange_token',
        client_id: Meteor.settings.fb_client_id,
        client_secret: Meteor.settings.fb_client_secret,
        fb_exchange_token: token,
      }
    }, function(error, result){
      if(error){
        console.log('extendFBToken error');
        console.log(error);
      } else {
        console.log('extendFBToken result');
        console.log(result);
      }
    });
}

function doFBPost(post_text, id){
  // console.log('doFBPost ');
  // console.log('Meteor.settings.fb_page_url: ' + Meteor.settings.fb_page_url);
  // console.log('Meteor.settings.fb_access_token: ' + Meteor.settings.fb_access_token);
  if(Meteor.settings.fb_on){
    var theId = id;
    HTTP.call('POST', Meteor.settings.fb_page_url, {
      params:{
        access_token: Meteor.settings.fb_access_token,
        message: post_text
      }
    }, function(error, result){
      if(error){
        console.log('doFBPost error');
        console.log(error);
      }
      if(result){
        // console.log('doFBPost result');
        // console.log(result);
        if (result.statusCode === 200) {
          var content = JSON.parse(result.content);
          // console.log(content);
          // console.log(content.id);
          // console.log(theId)
          try{
            Posts.update({_id: theId},
              {$set: {fb_id: content.id}});
          }catch(error){
            console.log('doFBPost error');
            console.log(error);
          }
        }
      }
    });
  }
}

function doSocialPosts(post_text, id){
  //stubbed out to handle posts to all kinds of sites
  //not sure if these are going to destroy each other
  if(Meteor.settings.post_social){
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
      // sendEmail('Thank you submitting an anonistream question!',
      //   'Thank you for submitting an anonistream question.  If it is cool you will see it online soon. If it sucks, well oh well, sucks to be you cuz we will not pubish it!\nThe question you submitted was :\n'+params.question+'\n\nThanks,\nthe anonistream.in team',
      //   '<html><h1>Thank you for submitting an anonistream question.</h1><p> If it is cool you will see it online soon.</p><p>If it sucks, well oh well, sucks to be you cuz we will not pubish it!</p><p>The question you submitted was : '+params.question+'<p>Thanks,<br/>the anonistream.in team</p></html>',
      //   params.email,
      //   config.email_from
      // );
      // sendEmail('anonistream Question Submitted',
      //   'Question\n' + params.question,
      //   '<html><p>From: '+params.email+'</p><p>Question: '+params.question+'</p></html>',
      //   config.email_to,
      //   params.email
      // );
      return result = 'domo arigato mister roboto!';
    } else {
      throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Failed to insert a "question". Please retry.');
    }
  } else {
    throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Missing params.');
  }
}

