//import Counter from './Counter';
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import AppActionTypes from './AppActionTypes';

class AppStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.fromJS({
      isLoading: false,
      artists: []
      /*artists: {},
      albums: {},
      tracks: {}*/
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.SET_LOADING:
        return state.set('isLoading', action.payload.isLoading);

      case AppActionTypes.ALBUMS_LOADED:
        //console.debug('Albums loaded', action.payload.items);
        
        //console.debug('ICI!', state.get('artists').push({name: 'allo'}));
        return state.updateIn(['artists'], () => {
          return Immutable.List(action.payload.items);
        });

      case AppActionTypes.ALBUMS_LOAD_ERROR:
        console.debug('Albums load error', action.error);

      default:
        return state;
    }
  }
}

export default new AppStore();