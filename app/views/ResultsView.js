import React from 'react';
import PropTypes from 'prop-types';

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
              <li key={artist.id}>{artist.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
  
}

export default ResultsView;