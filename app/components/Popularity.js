import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Popularity extends React.Component {
  constructor(props) {
    super(props);
  }

  getScore() {
    const { percentage } = this.props;
    const { total } = this.props;

    return (total * percentage);
  }

  getStars() {
    const { total } = this.props;
    const score = this.getScore();
    const stars = [];

    for (let i = 1; i <= total; i++) {
      const isFull = score >= i;
      const isHalf = (score >= (i - 0.5) && !isFull);

      stars.push({
        isFull: isFull,
        isHalf: isHalf
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
              <span className={classnames(
                  'ion-ionic',
                  { 'ion-star': star.isFull },
                  { 'ion-ios-star-half': star.isHalf },
                  { 'ion-ios-star-outline': (!star.isFull && !star.isHalf) },
              )}></span>
            </span>
          </div>
        )
        }
    </div>
    );
  }
}

Popularity.defaultProps = {
  percentage: 0,
  total: 5
};

Popularity.propTypes = {
  percentage:  PropTypes.number,
  total: PropTypes.number
};

export default Popularity;
