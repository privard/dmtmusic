import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import spotify from '../api/spotify';


class TracksLoader extends React.Component {
  constructor(props) {
    super(props);

    this.onViewAlbumTracks = this.onViewAlbumTracks.bind(this);

    this.state = {
      isLoading: false
    };
  }

  fetchTracks(id) {
    console.debug('Fetching tracks for album', id);

    spotify.getAlbumTracks(id)
    .then(({data}) => {
      this.setState({
        isLoading: false
      });
      if (this.props.onTracksLoaded) {
        this.props.onTracksLoaded(data);
      }
    })
    .catch((error) => {
      this.setState({
        isLoading: false
      });
      if (this.props.onTracksLoaded) {
        this.props.onTracksLoadError(error);
      }
    })    
  }

  onViewAlbumTracks(id) {
    this.setState({
        isLoading: true
    });
    this.fetchTracks(id);
  }

  render() {
    const { album } = this.props;
    const buttonClasses = classnames(
      'button is-emphazised is-fullwidth',
      { 'is-loading': this.state.isLoading }
    );

    return (
    <div className="discs">
      <button
        onClick={this.onViewAlbumTracks.bind(this, album.id)}
        className={buttonClasses}>View Album Tracks</button>
    </div>
    );
  }
}

TracksLoader.propTypes = {
  onTracksLoaded: PropTypes.func,
  onTracksLoadError: PropTypes.func,
  album: PropTypes.shape({
    id: PropTypes.string
  }),
};

export default TracksLoader;
