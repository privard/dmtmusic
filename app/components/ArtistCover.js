import React from 'react';
import PropTypes from 'prop-types';

const Cover = (props) => {
  return (
    <div className="image is-1by1">
      {props.src &&
        <img src={props.src} />
      }
    </div>
  );
};

class ArtistCover extends React.Component {
  constructor(props) {
    super(props);
  }

  getArtistImageSource(images) {
    return (images.size > 0) ? images.get(0).get('url') : null;
  }

  render() {
    const { artist } = this.props;
    const image = this.getArtistImageSource(artist.get('images'));

    return (
      <div className="cover artist">
        <Cover src={image} />

        <div className="details">
          <h2 className="subtitle is-5">{artist.get('name')}</h2>
        </div>
      </div>
    );
  }
}

ArtistCover.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.array
  })
  
};

export default ArtistCover;
