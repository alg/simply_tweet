// Simple Twitter wrapper for xAuth authentication and sending tweets.
// Requires: oauth.js, sha1.js
var SimplyTweet = function(consumerKey, consumerSecret) {
  var self = this;
  
  var accessor = {
    token: null,
    tokenSecret: null,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret
  }
  
  // Authenticates the user with xAuth
  //    username / password -- twitter name and password
  //    success -- success callback
  //    failure -- failure callback
  self.authenticate = function(username, password, success, failure) {
    sendRequest("https://api.twitter.com/oauth/access_token", {
      x_auth_username: username,
      x_auth_password: password,
      x_auth_mode: "client_auth"
    }, function(http) { // success
      var results = OAuth.decodeForm(http.responseText);
      accessor.token = OAuth.getParameter(results, "oauth_token");
      accessor.tokenSecret = OAuth.getParameter(results, "oauth_token_secret");
	    success();
    }, failure);
  }

  // Tweet a status update
  //    status  -- new status
  //    success -- success callback
  //    failure -- failure callback
  self.updateStatus = function(status, success, failure) {
    sendRequest("http://api.twitter.com/1/statuses/update.json", {
      status: status
    }, success, failure);
  }

  // Sends request to the given URL
  var sendRequest = function(url, parameters, success, failure) {
    var message = {
      method: "post",
      action: url,
      parameters: parameters
    }

    var params = OAuth.formEncode(parameters);

    OAuth.completeRequest(message, accessor);
    
    var http = new XMLHttpRequest();
    http.open("POST", message.action, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader('Accept-Encoding', 'none');
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");
    http.setRequestHeader("Authorization", OAuth.getAuthorizationHeader('twitter', message.parameters));
    http.onreadystatechange = function() {
    	if (parseInt(http.readyState) == XMLHttpRequest.DONE) {
    	  if (http.status == 200) {
          success(http);
  	    } else {
  	      failure(http);
  	    }
    	}
    }
    http.send(params);
  }
}