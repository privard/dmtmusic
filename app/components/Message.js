import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 className="title is-grey">{this.props.message}</h1>
    );
  }
}

Message.defaultProps = {
  message: '',
};

Message.propTypes = {
  message: PropTypes.string
};

export default Message;
