import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Section from '../components/Section'
import AlbumCover from '../components/AlbumCover';
import Message from '../components/Message';

class ArtistView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchArtist(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    if (nextProps.location !== this.props.location) {
      this.fetchArtist(match.params.id);
    }
  }

  fetchArtist(id) {
    this.props.onGetArtistAlbums(id);
    console.debug('Fetch artist id', id);
  }

  orderAlbumsByReleaseYear(albums) {
    return albums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  getArtistName() {
    const { app } = this.props;
    const albums = app.get('albums');
    return (albums.size > 0) ? albums.get(0).artists[0].name : '';
  }

  render() {
    const { app } = this.props;
    const isLoading = app.get('isLoading');
    const isEmpty = app.get('albums').size === 0;
    const albums = this.orderAlbumsByReleaseYear(app.get('albums'));

    const message = isLoading ? (
      <Message message="Searching for albums..." />
    ) : (
      <Message message="No albums available :(" />
    );

    const albumCovers = albums.map((album) => {
      const artist = album
      return (
        <div key={album.id} className="column is-half">
            <AlbumCover album={album} />
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
        <h1 className="title is-3">{this.getArtistName()}</h1>
        <div className="columns is-multiline">
          { albumCovers }
        </div>
      </Section>
    );
  }
  
}

export default ArtistView;