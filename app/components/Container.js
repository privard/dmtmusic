import React from 'react';
import PropTypes from 'prop-types';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="wrapper">
      {this.props.children}
    </div>
    );
  }
}

export default Container;