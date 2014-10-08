function sendEmail(subject, body, htmlbody, to, from, bcc){
  var mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: body,
      html: htmlbody
  }
  smtpTransport.sendMail(mailOptions
    //,function(error, response){
      //if(error){
       // console.log(error);
      //}else{
        //console.log("Message sent: " + response.message);
        //console.log("To: " + to);
      //}
      // if you don't want to use this transport object anymore, uncomment following line
      //smtpTransport.close(); // shut down the connection pool, no more messages
    //}
  );
}
