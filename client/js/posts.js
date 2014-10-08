// TODO this could be more concise but it needs to be readable for now because of cough syrup
rc_count = 100;
font_size = 30;
opacity = 1;
img_size = 16;
font_size_reducer = font_size / rc_count;
opacity_reducer = opacity / rc_count;
img_size_reducer = img_size /rc_count;
font_size = 30 + (2 * font_size_reducer);
opacity = 1 + (2 * opacity_reducer);
// TODO - might have to do this IE8 and earlier supports an alternative, the filter property. Like: filter:Alpha(opacity=50).

Template.posts.posts = function() {
  font_size = 30 + (2 * font_size_reducer);
  opacity = 1 + (2 * opacity_reducer);
  // TODO when meteor supports .limit server side remove this to just find
  items = Posts.find({}, { sort: {created: -1} }).fetch();
  items = items.slice(0,rc_count);
  return items;
};



Template.posts.get_poststyle = function() {
  font_size = font_size - font_size_reducer;
  opacity = opacity - opacity_reducer;
  var j ='font-size:' + font_size +
  'px;opacity:' + opacity + ';' +
  'line-height:' + font_size + 'px;';
  return j;
}

Template.posts.get_imgheight = function() {
  img_size = img_size - img_size_reducer;
  return img_size;
}

Template.posts.events = {
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
