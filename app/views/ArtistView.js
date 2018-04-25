import React from 'react';
import { Link } from 'react-router-dom';

class ArtistView extends React.Component {

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

  render() {
    const { app } = this.props;
    
    return (
      <div>
        Albums { app.get('albums').size }
        <ul>
          {
            app.get('albums').map((album) =>
              <li key={album.id}>
                <Link to={('/album/' + album.id)}>{album.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
  
}

export default ArtistView;