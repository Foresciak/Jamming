const clientID = 'a3f3ce24b78f4e129d75ddd384eaedb8';
const redirectURI = "http://localhost:3000/";
let accessToken = '';
let expiresIn = '';
let url=';'

const Spotify = {
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
          window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
      }
      return accessToken;
    },

  search(term) {
    this.getAccessToken();
    console.log(term);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
      headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      console.log(jsonResponse)
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track =>({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          previewURL: track.preview_url
        }));
      }
    });
  },

  savePlaylist(playlistName,trackURIs) {
    if (playlistName === String.Empty && trackURIs=== Array.Empty) {
      return;
    }
    this.getAccessToken();
    const headers = {Authorization :`Bearer ${accessToken}`}
    let userID = '';
    let playlistID ='';
    console.log(accessToken)

     return fetch(`https://api.spotify.com/v1/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization :`Bearer ${accessToken}`,
        },
      }).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if(jsonResponse.id) {
        userID= jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
          headers: {
            "Content-Type": "application/json",
            Authorization :`Bearer ${accessToken}`,
          },
          method:'POST',
          body:JSON.stringify({
            name: playlistName,
            description: "New playlist description",
            }),
        })
      }}).then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      console.log(jsonResponse)
      if(jsonResponse) {
        playlistID = jsonResponse.id;
        console.log(playlistID);
          console.log(trackURIs);
          trackURIs = trackURIs.map(track => track.uri);
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          {
          headers: {
            "Content-Type": "application/json",
            Authorization :`Bearer ${accessToken}`,
          },
          method:'POST',
          body:JSON.stringify({
            uris: trackURIs,
          }),
        })
      }
    }).then(response => {
      console.log(response);

        if(response.ok) {
          return response.json();
        }
        response.json().then(json => console.log(json)).catch(err => console.log(err));
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      console.log(jsonResponse)
      if(jsonResponse) {
        return playlistID = jsonResponse.id;
      }
    });

  }




}

export default Spotify;
