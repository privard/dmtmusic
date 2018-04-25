import AppDispatcher from './AppDispatcher';
import AppActionTypes from './AppActionTypes';
import spotify from '../api/spotify';

const cache = {
  artists: [],
  albums: [],
  tracks: []
};

const dispatchLoading = (isLoading) => {
  AppDispatcher.dispatch({
    type: AppActionTypes.SET_LOADING,
    payload: {
      isLoading: isLoading
    }
  });
};

const dispatchAction = (promiseCb) => {
  dispatchLoading(true);

  promiseCb()
  .then(() => {
    dispatchLoading(false);
  });
};

const Actions = {

  searchByArtist(artist) {
    dispatchAction(() => {
      return spotify.searchByArtist(artist)
        .then(({ data }) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.ARTISTS_LOADED,
            payload: data.artists
          });
        })
        .catch((error) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.ARTISTS_LOAD_ERROR,
            payload: {
              error: error
            }
          });
        })
    });
  },

  getArtistAlbums(id) {
    dispatchAction(() => {
      return spotify.getArtistAlbums(id)
        .then(({ data }) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.ALBUMS_LOADED,
            payload: data
          });
        })
        .catch((error) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.ALBUMS_LOAD_ERROR,
            payload: {
              error: error
            }
          });
        })
    });
  },

  getAlbumTracks(id) {
    dispatchAction(() => {
      return spotify.getAlbumTracks(id)
        .then(({ data }) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.TRACKS_LOADED,
            payload: data
          });
        })
        .catch((error) => {
          AppDispatcher.dispatch({
            type: AppActionTypes.TRACKS_LOAD_ERROR,
            payload: {
              error: error
            }
          });
        })
    });
  },

};

export default Actions;