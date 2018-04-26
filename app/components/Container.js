import React from 'react';
import PropTypes from 'prop-types';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <section className="section">
      {this.props.children}
    </section>
    );
  }
}

export default Container;