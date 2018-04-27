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
      artists: {
        items: [],
        limit: 21,
        offset: 0,
        total: 0,
      },
      albums: []
    });
  }

  reduce(state, action) {
    switch (action.type) {
      case AppActionTypes.SET_LOADING:
        return state.set('isLoading', action.payload.isLoading);

      case AppActionTypes.ARTISTS_LOADED:
        return state.updateIn(['artists'], () => {
          return Immutable.fromJS(action.payload);
        });

      case AppActionTypes.ARTISTS_MORE_LOADED:
        return state
          .updateIn(['artists'] , (list) => list.set('offset', action.payload.offset))
          .updateIn(['artists', 'items'], (list) => {
          action.payload.items.forEach((item) => {
            list = list.push(new Immutable.Map(item));
          });

          return list;
        });

      case AppActionTypes.ARTISTS_LOAD_ERROR:
        console.debug('Albums load error', action.error);

      case AppActionTypes.ALBUMS_LOADED:
        return state.updateIn(['albums'], () => {
          return Immutable.List(action.payload);
        });

      default:
        return state;
    }
  }
}

export default new AppStore();