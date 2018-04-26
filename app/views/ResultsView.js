import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Section from '../components/Section'
import ArtistCover from '../components/ArtistCover';
import Message from '../components/Message';

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
    const isLoading = app.get('isLoading');
    const isEmpty = app.get('artists').size === 0;

    const message = isLoading ? (
      <Message message="Searching for artists..." />
    ) : (
      <Message message="No artist found :(" />
    );

    const artistCovers = app.get('artists').map((artist) => {
      return (
        <div key={artist.id} className="column is-one-third">
          <Link to={('/artist/' + artist.id)}>
            <ArtistCover artist={artist} name={artist.name} image={(artist.images.length) ? artist.images[0].url : null} />
          </Link>
        </div>
      );
    });

    if (isLoading || isEmpty) {
      return (
        <Section isMessage={true}>
          {message}
        </Section>
      );
    }

    return (
      <Section>
        <h1 className="title is-3">About { app.get('artists').size } artists</h1>
        <div className="columns is-multiline">
          { artistCovers }
        </div>
      </Section>
    );
  }
  
}

export default ResultsView;