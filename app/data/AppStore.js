//import Counter from './Counter';
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import AppActionTypes from './AppActionTypes';

/*
  Cache ?
*/

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({
      isLoading: false,
      artists: [],
      albums: [],
      tracks: []
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.SET_LOADING:
        return state.set('isLoading', action.payload.isLoading);

      case AppActionTypes.ARTISTS_LOADED:
        return state.updateIn(['artists'], () => {
          return Immutable.List(action.payload.items);
        });

      case AppActionTypes.ARTISTS_LOAD_ERROR:
        console.debug('Albums load error', action.error);

      case AppActionTypes.ALBUMS_LOADED:
        return state.updateIn(['albums'], () => {
          return Immutable.List(action.payload);
        });

      case AppActionTypes.TRACKS_LOADED:
        return state.updateIn(['tracks'], () => {
          return Immutable.List(action.payload.items);
        });

      default:
        return state;
    }
  }
}

export default new AppStore();