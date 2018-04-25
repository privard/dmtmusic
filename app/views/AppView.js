import React from 'react';
import classnames from 'classnames';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from '../components/layout/SearchBar';
import Container from '../components/layout/Container';

import ResultsView from './ResultsView';
import ArtistView from './ArtistView';
import AlbumView from './AlbumView';

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

          <Route exact path="/artist/:id" render={(routeProps) => {
            return <ArtistView {...routeProps} {...this.props} />;
          }} />

          <Route exact path="/album/:id" render={(routeProps) => {
            return <AlbumView {...routeProps} {...this.props} />;
          }} />

          <Route component={NotFoundPage} />
        </Switch>
      
    </div>
    );
  }
};

/*
<Route exact path="/artist/:id" component={ArtistPage} />
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
