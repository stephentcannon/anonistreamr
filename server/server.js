var require = __meteor_bootstrap__.require;

var path = require("path");
var fs = require('fs');
var base = path.resolve('.');
if (base == '/'){
  base = path.dirname(global.require.main.filename);   
}

var Twit;
var twitPath = 'node_modules/twit';
var publicTwitPath = path.resolve(base+'/public/'+twitPath);
var staticTwitPath = path.resolve(base+'/static/'+twitPath);
if (path.existsSync(publicTwitPath)){
  Twit = require(publicTwitPath);
}
else if (path.existsSync(staticTwitPath)){
  Twit = require(staticTwitPath);
}
else{
  console.log('WARNING Twit not loaded. Node_modules not found');
}
var T = new Twit(config.twit.options);


function doTweet(post_text, id){
  T.post('statuses/update', { status: post_text }, 
    function(err, reply) {  
      if(reply){
        ts = Date.now();
        Fiber(function() {
          Posts.update({_id: id},   
          {$set: {twitter_id_str: reply.id_str}});
        }).run();
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

var email;
var emailjsPath = 'node_modules/emailjs';
var publicEmailJSPath = path.resolve(base+'/public/'+emailjsPath);
var staticEmailJSPath = path.resolve(base+'/static/'+emailjsPath);
if (path.existsSync(publicEmailJSPath)){
  email = require(publicEmailJSPath);
}
else if (path.existsSync(staticEmailJSPath)){
  email = require(staticEmailJSPath);
}
else{
  console.log('WARNING EmailJs not loaded. Node_modules not found');
}

var server  = email.server.connect(config.mailjs.server_options);
function sendEmail(subject, body, htmlbody, to, from, bcc){
  var headers = {
    subject: subject,
    text:    body, 
    to:      to,
    from:    from, 
    bcc:     bcc, 
  };
  var message = email.message.create(headers);
  // attach an alternative html email for those with advanced email clients
  message.attach({data: htmlbody, alternative:true});
  server.send(message, function(err, message) { 
    //TODO implement logging of errors
    //console.log(err || message); 
  });
}

Meteor.methods({
  insertPost: insertPost,
  insertContactUs: insertContactUs,
  insertAddAQuestion: insertAddAQuestion,
  insertSubscribe: insertSubscribe
});

function insertPost(args) {
  this.unblock;
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
        //return result = 'done';
      } else {
        //return result = 'did not work';
      }
    }
  }
}

function insertContactUs(params){
  this.unblock;
  if(params){
    ContactUs.validateParams(params);
    ContactUs.validateEmail(params.email);
    var ts = Date.now();
    id = ContactUs.insert({
    created: ts, 
    name: params.name.slice(0,100),
    email: params.email.slice(0,100),
    subject: params.subject.slice(0,30),
    comments: params.comments.slice(0,1000)
    });
    if(id){
      sendEmail('Thank you for contacting us', 
        'Thank you for contacting us.  We will review your request and get back to you if necessary. Subject type:\n'+params.subject+'\nComments:\n'+params.comments+'\n\nThanks,\nthe anonistream.in team',
        '<html><h1>Thank you for contacting us.</h1><p>We will review your comments and get back to you if necessary.</p><p>Subject: '+params.subject+'</p><p>Comments:</p>'+params.comments+'<p>Thanks,<br/>the anonistream.in team</p></html>',
        params.name+'<'+params.email+'>',
        config.email_from
      );
      sendEmail('anonistream Contact Form Submission: ' + params.subject,
        'Comments\n' + params.comments,
        '<html><p>From: '+params.name+'<'+params.email+'></p><p>Subject: '+params.subject+'</p><p>Comments:</p>'+params.comments+'</html>',
        config.email_to,
        params.name+'<'+params.email+'>'
      );
      return result = 'thanks a million gagillions';
    } else {
      throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Failed to insert "contact us" request. Please retry.');
    }
  } else {
    throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Missing params.');
  }
}

function insertAddAQuestion(params){
  this.unblock;
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
function insertSubscribe(params){
  this.unblock;
  if(params){
    Subscribe.validateParams(params);
    Subscribe.validateEmail(params.email);
    var ts = Date.now();
    id = Subscribe.insert({
    created: ts, 
    name: params.name.slice(0,100),
    email: params.email.slice(0,100)
    });
    if(id){
      sendEmail('anonistream newsletter subscription confirmation', 
        'Thank you for subscribing to the anonistream newsletter.  We will try to our hardest to bother you often...just kidding.\nIf you ever want to unsubscribe send us a check for a million dollars and a hand written note by carrier pigeon.\nJokes aside, you can unsubscribe in the newsletter footer.\nEnjoy...and do not print it out when you get it because a tree dies when you do.\nThanks,\nthe anonistream.in team',
        '<html><h1>Thank you for subscribing to the anonistream newsletter.</h1><p>We will try to our hardest to bother you often...just kidding.</p><p>If you ever want to unsubscribe send us a check for a million dollars and a hand written note by carrier pigeon.<p>Enjoy...and do not print it out when you get it because a tree dies when you do.</p><p>Thanks,<br/>the anonistream.in team</p></html>',
        params.name+'<'+params.email+'>',
        config.email_from
      );
      return result = '...thank you easter bunny...';
    } else {
      throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Failed to insert "subscription" request. Please retry.');
    }
  } else {
    throw new Meteor.Error(500, 'Zoinkies! Internal Server Error. Missing params.');
  }
}