import http from '../service/http';

const Endpoint = {
  searchByArtist: '/search/{artist}',
  artistAlbums: '/artists/{id}/albums',
  albumTracks: '/albums/{id}/tracks'
};

export default {

  searchByArtist(artist) {
    const url = Endpoint.searchByArtist.replace('{artist}', encodeURI(artist));
    return http.get(url);
  },

  getArtistAlbums(id) {
    const url = Endpoint.artistAlbums.replace('{id}', id);
    return http.get(url);
  },

  getAlbumTracks(artist) {
    const url = Endpoint.albumTracks.replace('{id}', id);
    return http.get(url);
  }

};