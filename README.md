anonistreamr
------------
...anonistreamr is a real-time anonymous social stream of consciousness app written in javascript, html and css and made with meteor...[meteor.com](http://www.meteor.com) framework.

View live
----------
[anonistream.in](http://anonistream.in)

How to use
----------
So, you wanna run your own anonistreamr?

Install Meteor:

    [meteor.com](http://www.meteor.com)
    or
    [meteor on github](https://github.com/meteor/meteor)

Then you can clone the code onto your system:

    git clone git://github.com/stephentcannon/anonistreamr.git

Run or deploy:
    
    To run
    cd anonistream
    mv settings.bak settings.json
    vi settings.json
    meteor --settings settings.json

    To deploy - after you have it running properly
    cd anonistream
    meteor deploy [yourlocation].meteor.com

Setting up Facebook
--------------------
1. Setup a community page and application for your anonistreamr
2. Go to FB graph explorer
3. Select your application from drop down
4. Set GET to me/accounts
5. You will see something like this

````
"data": [
    {
      "category": "App page",
      "name": "anonistream.in Community",
      "access_token": "THIS WILL BE YOUR ACCESS TOKEN",
      "perms": [
        "ADMINISTER",
        "EDIT_PROFILE",
        "CREATE_CONTENT",
        "MODERATE_CONTENT",
        "CREATE_ADS",
        "BASIC_ADMIN"
      ],
      "id": "295166627236916"
    },
````

Reading
--------
https://developers.facebook.com/docs/facebook-login/access-tokens
https://developers.facebook.com/docs/facebook-login/access-tokens#extending

Extending Page Access Tokens
-----------------------------
Apps can retrieve a page access token from Page admin users when they authenticate with the manage_pages permission. If the user access token used to retrieve this page access token is short-lived, the page access token will also be short-lived.

To get a longer-lived page access token, exchange the User access token for a long-lived one, as above, and then request the Page token. The resulting page access token will not have any expiry time.

Setting Up Twitter
-------------------
1.  Read this https://dev.twitter.com/oauth/overview/application-owner-access-tokens
2.  And this https://dev.twitter.com/oauth/overview/single-user

License
----------
MIT
    feel free to setup your own anonistreamr