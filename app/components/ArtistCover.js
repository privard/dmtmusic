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
    return (images.length > 0) ? images[0].url : null;
  }

  render() {
    const { artist } = this.props;
    const image = this.getArtistImageSource(artist.images);

    return (
      <div className="cover artist">
        <Cover src={image} />

        <div className="details">
          <h2 className="subtitle is-5">{artist.name}</h2>
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
