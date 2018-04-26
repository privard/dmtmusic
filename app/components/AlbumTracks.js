import React from 'react';
import PropTypes from 'prop-types';

class AlbumTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  render() {
    const { album } = this.props;
    
    return (
    <div className="tracks">
      <button className="button is-emphazised is-fullwidth">View Album Tracks</button>
    </div>
    );
  }
}

AlbumTracks.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string
  })  
};

export default AlbumTracks;
