const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

const SpotifyApplication = {
  id: '5eefa95a5f914ce9b792ea93d188abda',
  secret: 'f16bb0af73c247359cfb0b23b261dd28'
};

const SpotifyClientCredentials = {
  token: null,
  endpoint: 'https://accounts.spotify.com/api/token',
  authorize: function(clientId, secret) {
    const options = this.getAuthOptions(clientId, secret);
    
    return new Promise((resolve, reject) => {
      request.post(options, (error, response, body) => {
        if (response.statusCode === 200) {
          resolve(body.access_token);
        } else {
          reject(body);
        }
      });
    });
  },
  getAuthOptions: function(clientId, secret) {
    return {
      url: this.endpoint,
      headers: {
        'Authorization': 'Basic ' +
        (new Buffer(clientId + ':' + secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    }
  }
};

const SpotifyClient = {
  endpoint: {
    search: 'https://api.spotify.com/v1/search'
  },
  searchByArtist: function(token, artist) {
    const url = this.endpoint.search + 
      '?q=' + encodeURI(artist) +
      '&type=artist' +
      '&limit=20';

    const options = this.getOptions(token, url);
    return new Promise((resolve, reject) => {
      request.get(options, function(error, response, body) {
        if (response.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  },
  getOptions: function(token, url) {
    return {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
  }
};

SpotifyClientCredentials.authorize(SpotifyApplication.id, SpotifyApplication.secret)
.then((token) => {
  console.log('Successfully authorized with token', token);
  console.log('Initializing APIs');

  //Search artist
  app.get('/api/search/:artist', function(req, res) {
    const artist = req.params.artist;
    console.log('Searching for artist', artist);

    SpotifyClient.searchByArtist(token, artist)
    .then((body) => {
      res.send(body);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(400).send(error);
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
})
.catch((error) => {
  console.log('Authorization failed, shutting down server.');
  console.log(error);
});

