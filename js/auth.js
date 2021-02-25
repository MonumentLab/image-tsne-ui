'use strict';

(function() {
  window.Util = {};

  Util.cookieGet = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };

  Util.cookieSet = function(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  };

  Util.cookieRemove = function(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

})();


(function() {
  window.Auth = {};

  Auth.authenticate = function(msg){
    var isValid = false;
    msg = msg || 'Please enter password:';

    var authenticated = Util.cookieGet('authenticated');

    if (!authenticated) {
      var answer = prompt(msg);
      if (answer != null) {
        var hash = CryptoJS.MD5(answer).toString();
        if (hash === '293577d3615f67c577ed0f19075555b5') isValid = true;
      }
    } else {
      isValid = true;
    }

    if (isValid) {
      Util.cookieSet('authenticated', 1, 30); // keep for 30 days
      return true;
    } else {
      return Auth.authenticate('Incorrect password. Please try again:');
    }
  };

})();
