import React from 'react';
import PropTypes from 'prop-types';
import TracksLoader from './TracksLoader';
import AlbumTracks from './AlbumTracks';
import Popularity from './Popularity';

const Genres = (props) => {
  if (props.genres) {
    return null;
  } else {
    return <h2 className="subtitle is-6">{props.genres}</h2>
  }
};

const Cover = (props) => {
  return (
    <div className="image is-1by1">
      {props.src &&
        <img src={props.src} />
      }
    </div>
  );
};

class AlbumCover extends React.Component {
  constructor(props) {
    super(props);

    this.onTracksLoaded = this.onTracksLoaded.bind(this);
    this.onTracksLoadError = this.onTracksLoadError.bind(this);

    this.state = {
      tracks: {
        hasError: false,
        isLoaded: false,
        items: [],
      }
    }
  }

  getAlbumImageSource(images) {
    return (images.length > 0) ? images[0].url : null;
  }

  getAlbumGenres(genres) {
    genres = genres.join(',');
    return genres.slice(0, -1);
  }

  onTracksLoaded(tracks) {
    this.setState({
      tracks: {
        isLoaded: true,
        items: tracks.items
      }
    });
  }

  onTracksLoadError() {
    this.setState({
      tracks: {
        error: true,
        isLoaded: true,
      }
    });
  }

  calcPopularityPercentage(popularity) {
    return (popularity / 100);
  }

  releaseDateToYear(releaseDate) {
    return new Date(releaseDate).getFullYear();
  }

  render() {
    const { album } = this.props;
    const { tracks } = this.state;
    const image = this.getAlbumImageSource(album.images);
    const genres = this.getAlbumGenres(album.genres);
    const releaseDate = this.releaseDateToYear(album.release_date);
    const showTracks = (tracks.isLoaded);

    const albumTracks = (showTracks) ? (
      <AlbumTracks tracks={tracks.items} />
    ) : (
      <TracksLoader
        onTracksLoaded={this.onTracksLoaded}
        album={album}
      />
    );

    return (
    <div className="cover album">
      <Cover src={image} />
      
      <div className="details">
        <h2 className="subtitle is-5">{album.name}</h2>
        <Genres genres={genres} />
        
        
        <nav className="level">
          <div className="level-left">
            <Popularity percentage={this.calcPopularityPercentage(album.popularity)} />
          </div>
          <div className="level-right">
            <p className="released has-text-centered">{releaseDate}</p>
          </div>
        </nav>
      </div>

      {albumTracks}
    </div>
    );
  }
}

AlbumCover.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.array,
    genres: PropTypes.array,
    release_date: PropTypes.string
  })  
};

export default AlbumCover;
