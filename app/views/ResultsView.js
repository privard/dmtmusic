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
    console.debug('Search artist', artist);
    this.props.onSearchByArtist(artist);
  }

  getArtists() {
    const { app } = this.props;
    return app.get('artists');
  }

  render() {
    const { app } = this.props;
    const isLoading = app.get('isLoading');
    const artists = this.getArtists();
    const isEmpty = artists.size === 0;
    

    const message = isLoading ? (
      <Message message="Searching for artists..." />
    ) : (
      <Message message="No artist found :(" />
    );

    const artistCovers = artists.get('items').map((artist) => {
      return (
        <div key={artist.get('id')} className="column is-one-third">
          <Link to={('/artist/' + artist.get('id'))}>
            <ArtistCover artist={artist} />
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
        <h1 className="title is-3">About { artists.get('total') } artists</h1>
        <div className="columns is-multiline">
        {
          artists.get('items').map((artist) =>
            <div key={artist.get('id')} className="column is-one-third">
              <Link to={('/artist/' + artist.get('id'))}>
                <ArtistCover artist={artist} />
              </Link>
            </div>
          )
        }
        </div>
      </Section>
    );
    
    return null;
  }
  
}

export default ResultsView;