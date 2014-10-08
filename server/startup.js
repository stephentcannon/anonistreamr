Meteor.startup(function () {
  console.log('Meteor.settings.post_social: ' + Meteor.settings.post_social);
  
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
      "...share your inner most thoughts...",
      "...what are you looking for?",
      "...what do you expect to find?",
      "...what would you like to ask her?",
      "...what would you like to ask him?",
      "...needs unfulfilled?",
      "...what do you want to have happen?",
      "...your greatest accomplishment?",
      "...your greatest feat?",
      "...disasters you fear?",
      "...what is a challenge?",
      "...what would you rather be?",
      "...your meaning of life?",
      "...what is now?",
      "...why are you here?",
      "...why are you listening to that?",
      "...what do you think about?",
      "...what do you like?",
      "...what do you want to achieve?",
      "...how would you like your relationship?",
      "...my relationship is...",
      "...my lover is...",
      "...my child is...",
      "...my children are...",
      "...my wife is...",
      "...my girlfriend is...",
      "...my husband is...",
      "...my boyfriend is...",
      "...my father is...",
      "...my mother is...",
      "...my sister is...",
      "...my brother is...",
      "...i am...",
      "...my boss is...",
      "...my job is...",
      "...i am interesting because...",
      "...how do you get along?",
      "...how do you continue?",
      "...how do you survive?",
      "...tell me about your relationship...",
      "...tell me about your boss...",
      "...what did you do when you were drunk?",
      "...what did you do when you were high?",
      "...what did you steal?",
      "...how did you deceive?",
      "...if I want to be well, I will have to...",
      "...to feel better, I need to...",
      "...to have better friends, I need to...",
      "...to feel better about myself, I need to...",
      "...to get  along with my others better, I need to...",
      "...to handle peer pressure better, I need to...",
      "...to have a better sense of purpose for my life, I need to...",
      "...to handle stress better, I need to...",
      "...who are you? really...",
      "...what defines who you are...",
      "...who defines who you are...",
      "...how are you limiting yourself...",
      "...my biggest worry is...",
      "...it no longer matters that...",
      "...i am most proud of...",
      "...i don't care about...",
      "...i need to do something about...",
      "...what scares me most about life is...",
      "...what excites me most about life is...",
      "...i dream that one day...",
      "...stress is...",
      "...love is...",
      "...health is...",
      "...illness is...",
      "...loss is...",
      "...ruin is...",
      "...friends are...",
      "...family is...",
      "...parents are...",
      "...some friends are...",
      "...best friends are...",
      "...enemies are...",
      "...i see myself...",
      "...the things i like most about myself are...",
      "...the things i like least about myself are...",
      "...i look forward to...",
      "...i dread...",
      "...i regret...",
      "...other people are...",
      "...other people usually...",
      "...when people think of me they usually...",
      "...when people see me they usually...",
      "...when people speak of me they usually...",
      "...when i was a child...",
      "...i want to be...",
      "...i really want to be...",
      "...i really want...",
      "...my dream is to...",
      "...the most important thing in life is...",
      "...the most important thing in my life is...",
      "...my wish for the world is...",
      "...my wish for my family is...",
      "...my wish for myself is...",
      "...i need to be loved because...",
      "...i am loved because...",
      "...i am grateful for...",
      "...i like myself when...",
      "...i hate myself when...",
      "...i don't like myself when...",
      "...i like other people when...",
      "...i don't like other people when...",
      "...compassion is...",
      "...i hope...",
      "...i dream...",
      "...i wish...",
      "...i fear...",
      "...i want...",
      "...i am afraid of...",
      "...i envy...",
      "...most of us feel...",
      "...i hope to learn...",
      "...tomorrow...",
      "...next week...",
      "...next month...",
      "...next year...",
      "...in three years...",
      "...in five years...",
      "...in ten years....",
      "...i mean to...",
      "...look back, what do you miss?",
      "...look back, what did you fail to do?",
      "...i realize that...",
      "...i learned that...",
      "...i am surprised that...",
      "...i was pleased that...",
      "...what brings you here?",
      "...what circumstances brings you here?",
      "...how would your best friend describe you?",
      "...what is your greatest weakness?",
      "...how do you alleviate stress?",
      "...what do you want to accomplish?",
      "...how do you deal with conflict?",
      '...what do you need help with?',
      "...how could you improve things?",
      "...how would you like things different?",
      "...how should you change?",
      "...what are you angry about?",
      "...what betterment have you experienced?",
      "...what are you upset about?",
      "...what are you suffering from?",
      "...how will you fail?",
      "...how will you try?",
      "...how will you do more than you say you will?",
      "...how will you do the right things?",
      "...how will you get better?",
      "...worst crime?",
      "...one thing you have not done that you should...",
      "...what do you need to let go of?",
      "...why are you...you?",
      "...what kind of friend are you?",
      "...what kind of lover are you?",
      "...what kind of parent are you?",
      "...what kind of child are you?",
      "...what kind of boss are you?",
      "...what kind of person are you?",
      "...which memory would you keep if only allowed one?",
      "...happiest childhoold memory?",
      "...happiest memory?",
      "...what do you have to lose?",
      "...if everyone were to die tomorrow, one person you would visit today?",
      "...are you truly living?",
      "...who makes your decisions for you?",
      "...who is the most important person in your life?",
      "...what is your happiest moment?",
      "...what is your saddest moment?",
      "...what is your biggest influence?",
      "...what is your addiction?",
      "...your most important lesson learned?",
      "...your earliest memory?",
      "...your proudest moment in life?",
      "...when do you feel most alone?",
      "...when have you felt most alone?",
      "...what is different?",
      "...how will you be remembered?",
      "...a regret i have is...",
      "...my future holds...",
      "...what do you want to tell me?",
      "...the first person you remember?",
      "...my first friend was...",
      "...what makes good friends?",
      "...friends are important because...",
      "...i will be...",
      "...why have you lost touch?",
      "...wny are they proud of you?",
      "...the first time i saw my child i...",
      "...my dreams for my children are...",
      "...when i found out i was pregnant i...",
      "...being a parent...",
      "...i have...",
      "...i chose my childs name because...",
      "...i sang...",
      "...i saw...",
      "...what happened to you?",
      "...your nickname?",
      "...how do you remember yourself?",
      "...school is...",
      "...the other kids are...",
      "...the love of my life is...",
      "...when i first fell in love i...",
      "...my first kiss was...",
      "...my first relationship was...",
      "...my last relationship was...",
      "...love at first sight?",
      "...who do you think about and why?",
      "...what lessons have you learned about love?",
      "...i proposed by...",
      "...i knew she was the one because...",
      "...i knew he was the one because...",
      "...how did you meet?",
      "...i am thinking of divorce because...",
      "...i am thinking of breaking up because...",
      "...my job is...",
      "...my boss is...",
      "...i am a...",
      "...i believe in...",
      "...miracles are...",
      "...a profound moment?",
      "...god is...",
      "...when i die...",
      "...when i meet god...",
      "...what is your illness?",
      "...why are you sick?",
      "...i am dying an...",
      "...i imagine death is...",
      "...i imagine the after-life is...",
      "...what do you regret doing?",
      "...what do you regret not doing?",
      "...any last wishes?",
      "....what has life taught you?",
      "...how do you want to be remembered?",
      "...how do you wish you were different?",
      "...how  do you wish you were born different?",
      "...my family is...",
      "...war is...",
      "...how does fighting change you?",
      "...how does arguing change you?",
      "...how can people change?",
      "...tell me about it...",
      "...tell me about what you are thinking",
      "...whats cookin' good lookin'...",
      "...whatsup chickin'butt...",
      "...i miss...",
      "...it has been the hardest losing...",
      "...my most vidid memory is...",
      "...what have you always meant to do?",
      "...what did you mean to do?",
      "...what makes you smile?",
      "...what makes you laugh?",
      "...what makes you cry?",
      "...what makes you kill?",
      "...hopes and dreams?",
      "...shattered hopes and dreams?",
      "...i am lost because...",
      "...my hardest times were...",
      "...i am in grief because...",
      "...tell me a short joke please?"
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

  // if(Posts.find().count() === 0) {
  //   console.log('bootstrapping test messages.');
  //   console.log('remove from /server/startup.js in prod');
   	// for(i=0; i<126; i++){
   	// 	var ts = Date.now();
    // 	Posts.insert({
    // 		post: 'Test post #' +i,
    // 		created: ts
    // 	});
   	// }
  //   console.log('bootstrapping test messages completed.');
  // }
  // console.log('server running');
  
});