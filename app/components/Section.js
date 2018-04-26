import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sectionClasses = classnames(
      'data',
      { 'has-text-centered': this.props.isMessage },
      { 'is-message': this.props.isMessage },
      {...this.props.className}
    );

    return (
      <section className={sectionClasses}>
        {this.props.children}
      </section>
    );
  }
}

Section.defaultProps = {
  isMessage: false
};

Section.propTypes = {
  isMessage: PropTypes.bool
};

export default Section;
