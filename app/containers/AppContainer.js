import React from 'react';
import { Container } from 'flux/utils';
import { withRouter } from 'react-router-dom';
import AppView from '../views/AppView';
import AppStore from '../data/AppStore';
import AppActions from '../data/AppActions';

class AppContainer extends React.Component {

  static getStores() {
    return [
      AppStore
    ];
  }

  static calculateState(prevState) {
    return {
      app: AppStore.getState(),
      onSearchByArtist: AppActions.searchByArtist,
      onSearchMoreByArtist: AppActions.searchMoreByArtist,
      onGetArtistAlbums: AppActions.getArtistAlbums,
      onGetAlbumTracks: AppActions.getAlbumTracks,
    };
  }

  render() {
    return <AppView {...this.state} />;
  }

}

export default withRouter(Container.create(AppContainer));
