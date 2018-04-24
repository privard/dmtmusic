import React from 'react';
import PropTypes from 'prop-types';

class ResultsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false
    };
  }

  componentWillReceiveProps(newProps) {
    console.debug(newProps)
  }

  render() {
    if (this.props.artists.length > 0) {
      return <div>Results page</div>;
    }
    return  <div>No results found...</div>;
  }
  
}

ResultsPage.defaultProps = {
  artists: []
};

ResultsPage.propTypes = {
  artists: PropTypes.array
};

export default ResultsPage;