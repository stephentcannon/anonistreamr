Questions = new Meteor.Collection("questions");

Questions.getQuestion = function(){
  // TODO when meteor collections support limit use below way of getting a random question
  // Questions.find().limit( -1 ).skip( _rand() * Questions.count() );
  // below is not very optimal if Questions collection grows as we dropped the double sequential key pattern
  // TODO try implement with something like _.shuffle
  var count = Questions.find({},{id:true}).count();
  if(count >0){
    var rand = $.randomBetween(1, count);
    var result =  Questions.findOne({id: rand}, {fields: {}});
    if(result){
      return result.question;
    }else{
      return '...share your inner most thoughts...';
    }
  }else{
    return '...share your inner most thoughts...';
  }
}
