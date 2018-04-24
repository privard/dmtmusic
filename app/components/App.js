import React from 'react';
import { Route, Switch } from 'react-router-dom'

import SearchBar from './layout/SearchBar';
import Container from './layout/Container';

import ResultsPage from './page/ResultsPage';
import ArtistPage from './page/ArtistPage';
import AlbumPage from './page/AlbumPage';
import NotFoundPage from './page/NotFoundPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      isLoading: false
    }
  }

  onSearch(value) {
    console.debug('Search artist', value);
  }

  render() {
    return (
    <div className="app">
      <SearchBar
        isLoading={this.state.isLoading}
        onSubmit={this.onSearch}
        placeholder="Search for an artist" />

      <Container>
        <Switch>
          <Route exact path="/" component={ResultsPage} />
          <Route exact path="/artist/:id" component={ArtistPage} />
          <Route path="/album/:id" component={AlbumPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      
    </div>
    );
  }
}

export default App;
