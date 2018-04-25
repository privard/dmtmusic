import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ResultsView extends React.Component {

  constructor(props) {
    super(props);
    console.debug('ResultsView', props)
  }

  render() {
    const { app } = this.props;
    
    return (
      <div>
        Number of results { app.get('artists').size }
        <ul>
          {
            app.get('artists').map((artist) =>
              <li key={artist.id}>
                <Link to={('/artist/' + artist.id)}>{artist.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
  
}

export default ResultsView;