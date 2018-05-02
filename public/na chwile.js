getAccessToken() {

    if (!accessToken) {
      //if access token doesnt' exist, check the URL to see if there is a token in it
      const url_string = window.location.href;
      const a = url_string.match(/access_token=([^&;]*)/);
      const e = url_string.match(/expires_in=([^&]*)/);
      //if there is a token in the url, then use that value
      if (a && e) {
        console.log(a);
        accessToken = a[1];
        expiresIn = e[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/')
      }
      //if not, redirect to spotify to request access
      else {
        window.location.href = https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI};
      }
    }
    return accessToken;
  },

  getAccessToken() {
    if (accessToken === String.Empty) {
          window.open(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
          accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
          expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        }
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    //url = window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
    console.log(accessToken + expiresIn);
  },
