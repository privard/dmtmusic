import React from 'react';
import SearchBar from '../layout/SearchBar';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    
    this.onSearch = this.onSearch.bind(this);
    console.debug(props);
    this.state = {
      isLoading: false
    }
  }

  onSearch(value) {
    console.debug('Search artist', value);
  }

  render() {
    return (
      <div>
        <SearchBar
          isLoading={this.state.isLoading}
          onSubmit={this.onSearch}
          placeholder="Search for an artist" />
      </div>
    );
  }
  
}

export default HomePage;