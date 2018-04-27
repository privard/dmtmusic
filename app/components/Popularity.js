import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Popularity extends React.Component {
  constructor(props) {
    super(props);
  }

  getStars() {
    const { total } = this.props;
    const stars = [];

    for (let i = 0; i < total; i++) {
      stars.push({
        isFull: false,
        isHalf: false
      });
    }

    return stars;
  }

  render() {
    const { total } = this.props; 
    const stars = this.getStars();

    return (
    <div className="popularity">
        {
        stars.map((star, i) =>
          <div key={i} className="level-item">
            <span className="icon is-medium is-left">
              <span className="ion-ionic ion-star"></span>
            </span>
          </div>
        )
        }
    </div>
    );
  }
}

Popularity.defaultProps = {
  total: 5
};

Popularity.propTypes = {
  score:  PropTypes.number,
  total: PropTypes.number
};

export default Popularity;
