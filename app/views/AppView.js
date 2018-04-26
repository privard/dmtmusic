import React from 'react';
import classnames from 'classnames';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import Container from '../components/Container';

import ResultsView from './ResultsView';
import ArtistView from './ArtistView';
import AlbumView from './AlbumView';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    
    console.debug('Application', this.props);
    this.onSearch = this.onSearch.bind(this);
    
    this.state = {
      fireRedirect: false,
      search: ''
    }
  }

  componentWillReceiveProps(newProps)	{
    this.setState({
      fireRedirect: false
    });
  }

  onSearch(value) {
    this.setState({
      fireRedirect: true,
      search: value
    });
  }

  render() {
    const { app } = this.props;
    const { fireRedirect } = this.state;
    const { search } = this.state;

    return (
    <Container>
        
        <header>
          <SearchBar
            isLoading={app.get('isLoading')}
            onSubmit={this.onSearch}
            placeholder="Search for an artist" />
        </header>

        { fireRedirect && <Redirect push to={('/search/' + search)} />}

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
          
        </Switch>
    </Container>
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
