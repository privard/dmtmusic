import React from 'react';
import PropTypes from 'prop-types';

class ArtistCover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={this.props.image} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="subtitle is-7">{this.props.name}</p>
          </div>
        </div>
        <div className="media-right">
        </div>
      </article>
    );
  }
}

ArtistCover.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default ArtistCover;
