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
  baseUrl: 'https://api.spotify.com/{version}',
  version: 'v1',
  endpoint: {
    search: '/search',
    albums: '/albums/{id}',
    artistAlbums: '/artists/{id}/albums',
    albumTracks: '/albums/{id}/tracks'
  },
  
  getOptions: function(token, endpoint) {
    return {
      url: this.buildUrl(endpoint),
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
  },

  buildUrl: function(endpoint) {
    return this.baseUrl
      .replace('{version}', this.version)
      + endpoint;
  },

  sendRequest: function(request) {

  },

  //Search by artist
  searchByArtist: function(token, artist) {
    const url = this.endpoint.search + 
      '?q=' + encodeURI(artist) +
      '&type=artist';
      //'&limit=20';

    const options = this.getOptions(token, url);
    console.log('Spotify request', options);
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

  //Get artist albums
  getArtistAlbums: function(token, id) {
    const url = this.endpoint.artistAlbums
      .replace('{id}', id) +
      '?include_groups=album' +
      '&market=US';

    const options = this.getOptions(token, url);
    console.log('Spotify request', options);
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

  //Get album
  getAlbum: function(token, id) {
    const url = this.endpoint.albums
      .replace('{id}', id);

    const options = this.getOptions(token, url);
    console.log('Spotify request', options);
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

  //Get album tracks
  getAlbumTracks: function(token, id) {
    const url = this.endpoint.albumTracks
      .replace('{id}', id) +
      '?include_groups=album';

    const options = this.getOptions(token, url);
    console.log('Spotify request', options);
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

  //Search artist
  app.get('/api/artists/:id/albums', function(req, res) {
    const id = req.params.id;
    
    console.log('Get artist\'s albums', id);

    SpotifyClient.getArtistAlbums(token, id)
    .then((body) => {
      let promises = [];

      body.items.forEach((album) => {
        promises.push(SpotifyClient.getAlbum(token, album.id));
      });

      Promise.all(promises)
      .then((albums) => {
        res.send(albums);
      })
      .catch((error) => {
        console.log(error);
      })
      
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(400).send(error);
    });
  });

  //Search artist
  app.get('/api/albums/:id/tracks', function(req, res) {
    const id = req.params.id;
    console.log('Get artist\'s albums', id);

    SpotifyClient.getAlbumTracks(token, id)
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

