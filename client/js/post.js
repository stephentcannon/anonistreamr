Template.post.get_poststyle = function() {
  font_size = font_size - font_size_reducer;
  opacity = opacity - opacity_reducer;
  var j ='font-size:' + font_size + 
  'px;opacity:' + opacity + ';' + 
  'line-height:' + font_size + 'px;';
  return j;
}

Template.post.get_imgheight = function() {
  img_size = img_size - img_size_reducer;
  return img_size;
}

Template.post.events = {
  'click .fb': function (event) {
    postToFacebookFeed(this.post);
  }
}

function postToFacebookFeed(varDesc) {
  var obj = {
    method: 'feed',
    display: 'popup',
    redirect_uri: 'http://anonistream.in/fbsharedone',
    link: 'http://anonistream.in/',
    picture: 'http://anonistream.in/img/logo.png',
    name: 'Shared from anonistream.in',
    //caption: 'a real time anonymous social stream of consciousness',
    description: varDesc
  };

  function callback(response) {
    // this is only needed if you don't do a popup
    //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
  }
  FB.ui(obj); //callback
}
