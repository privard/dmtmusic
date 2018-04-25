import React from 'react';
import { Route, Switch } from 'react-router-dom'

import SearchBar from './layout/SearchBar';
import Container from './layout/Container';

import HomePage from './page/HomePage';
import ResultsPage from './page/ResultsPage';
import ArtistPage from './page/ArtistPage';
import AlbumPage from './page/AlbumPage';
import NotFoundPage from './page/NotFoundPage';

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    
    /*
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      isLoading: false
    }
    */
  }

  onSearch(value) {
    console.debug('Search artist', value);
  }

  render() {
    return (
    <div className="app">

        <Switch>
          <PropsRoute exact path="/" {...this.props.app} component={HomePage} />
          <Route exact path="/" {...this.props} component={HomePage} />
          <Route exact path="/search" component={ResultsPage} />
          <Route exact path="/artist/:id" component={ArtistPage} />
          <Route path="/album/:id" component={AlbumPage} />
          <Route component={NotFoundPage} />
        </Switch>
      
    </div>
    );
  }
}

export default App;
