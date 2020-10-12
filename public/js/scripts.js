(function($){

  "use strict";

  // GET STARTED
  const twitch = window.Twitch.ext;
  const jQuery = window.jQuery;

  console.log('Twitch', twitch);
  console.log('jQuery', jQuery);

  console.log('Twitch Extensions Scaffold | Alex Hernandez');
  console.log('By Alex Hernandez 🤘');

  const title = "mw";
  const platform = "psn";
  const username = "oorangecchicken";
  const type = "mp";
  const tkn = "NzQ2MTQxNTg2MzA1ODMwOTIwMToxNjAzNzMyNTI0NDg5OmNkMTkwMTM4ZTUxNTcxMWY2YWU0Mzc0OGYyOWUyOWE5";

  const url = "https://www.callofduty.com/api/papi-client/stats/cod/v1";
    url += "/title/" + title;
    url += "/platform/" + platform;
    url += "/gamer/" + username + "/profile";
    url += "/type/" + type;

  const request = $.ajax({
    method: "GET",
    url: url,
    dataType: 'json',
    // xhrFields: {
    //   withCredentials: true
    // },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Atvi-Auth': `Bearer ${tkn}`,
    },
  });

  console.log('request', request);

  request.done(function( msg ) {
    console.log(msg)
  });

  request.fail(function( jqXHR, textStatus ) {
    console.log( "Request failed: " + textStatus );
  });

}(jQuery));
