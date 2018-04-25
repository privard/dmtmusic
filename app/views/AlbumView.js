import React from 'react';
import { Link } from 'react-router-dom';

class AlbumView extends React.Component {

  componentDidMount() {
    const { match } = this.props;
    this.fetchTracks(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    if (nextProps.location !== this.props.location) {
      this.fetchTracks(match.params.id);
    }
  }

  fetchTracks(id) {
    this.props.onGetAlbumTracks(id);
    console.debug('Fetch tracks for album id', id);
  }

  render() {
    const { app } = this.props;
    
    return (
      <div>
        Tracks { app.get('tracks').size }
        <ul>
          {
            app.get('tracks').map((track) =>
              <li key={track.id}>
                {track.name}
              </li>
            )
          }
        </ul>
      </div>
    );
  }
  
}

export default AlbumView;