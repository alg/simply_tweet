Simple Tweet
============

Simple library that lets you authenticate your app with Twitter using xAuth and
then update the status. That's all it does at the moment.

Sample usage
------------

# Add sha1.js, oauth.js and simple_tweet.js to your project

# Initialize Twitter instance with your consumer key and secret:
    var st = new SimplyTweet(<consumerKey>, <consumerSecret>);

# Authenticate user with his Twitter username and password. Update his status afterwards.

    var failureCallback = function(msg) { alert(msg); }
    st.authenticate('mark', 'smith', function() {
      st.updateStatus('new status', function() {
        alert('Status updated');
      }, failureCallback);
    }, failureCallback);

License
-------

Copyright (c) 2011 Aleksey Gureiev, released under the MIT license
