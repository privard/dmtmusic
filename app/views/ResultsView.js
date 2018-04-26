import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ResultsView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    this.searchArtists(match.params.artist);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    if (nextProps.location !== this.props.location) {
      this.searchArtists(match.params.artist);
    }
  }

  searchArtists(artist) {
    this.props.onSearchByArtist(artist);
    console.debug('Search artist', artist);
  }

  render() {
    const { app } = this.props;
    
    return (
      <div>
        Number of results { app.get('artists').size }
        <ul>
          {
            app.get('artists').map((artist) =>
              <li key={artist.id}>
                <Link to={('/artist/' + artist.id)}>{artist.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
  
}

export default ResultsView;