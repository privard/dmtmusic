import React from 'react';
import classnames from 'classnames';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from '../components/layout/SearchBar';
import Container from '../components/layout/Container';

import ResultsView from './ResultsView';

import HomePage from '../components/page/HomePage';
import ArtistPage from '../components/page/ArtistPage';
import AlbumPage from '../components/page/AlbumPage';
import NotFoundPage from '../components/page/NotFoundPage';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    
    console.debug('Application', this.props);
    this.onSearch = this.onSearch.bind(this);
    
    this.state = {
      isSearching: false,
      search: ''
    }
  }

  onSearch(value) {
    /*this.setState({
      isSearching: true,
      search: value
    });*/
    this.props.onSearchByArtist(value);
    console.debug('Search artist', value);
  }

  render() {
    return (
    <div className="app">
        
        <SearchBar
          isLoading={this.props.app.get('isLoading')}
          onSubmit={this.onSearch}
          placeholder="Search for an artist" />

        <Switch>

          <Route exact path="/search/:artist" render={(routeProps) => {
            return <ResultsView {...routeProps} {...this.props} />;
          }} />

          <Route exact path="/artist/:id" component={ArtistPage} />
          <Route path="/album/:id" component={AlbumPage} />
          <Route component={NotFoundPage} />
        </Switch>
      
    </div>
    );
  }
};

/*
<Route exact path="/" render={(routeProps) => {
  return (
    <SearchBar
      isLoading={this.props.app.isLoading}
      onSubmit={this.onSearch}
      placeholder="Search for an artist" />
  );
  
  if (isSearching) {
    return <Redirect to={('/search/' + search)} />
  } else {
    return (
      <SearchBar
        isLoading={this.props.app.isLoading}
        onSubmit={this.onSearch}
        placeholder="Search for an artist" />
    );
  }
  
}} />
*/

export default AppView;
