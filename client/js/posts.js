// TODO this could be more concise but it needs to be readable for now because of cough syrup
var rc_count = 100;
var font_size = 30;
var opacity = 1;
var img_size = 16;
var font_size_reducer = font_size / rc_count;
var opacity_reducer = opacity / rc_count;
var img_size_reducer = img_size /rc_count;
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

