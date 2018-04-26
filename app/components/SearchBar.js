import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ENTER = 'Enter';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: this.props.search
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  onKeyPress(event) {
    if (event.key === ENTER) {
      this.onSubmit(event);
    }
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  onSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.value);
    }
    event.preventDefault();
  }

  render() {
    const controlClasses = classNames(
      'control is-expanded has-icons-left is-large',
      { 'is-loading': this.props.isLoading }
    );

    return (
      <div className="search-bar">
        <form onSubmit={this.onSubmit}>
          <div className="search">
            <div className="field has-addons">
              <div className={controlClasses}>
                  <input 
                    type="text"
                    className="input is-large"
                    value={this.state.value}
                    ref={el => this.input = el}
                    onChange={this.onChange}
                    onKeyPress={e => this.onKeyPress(e)} 
                    placeholder={this.props.placeholder} />
                  
                  <span className="icon is-large is-left">
                    <span className="ion-ionic ion-search"></span>
                  </span>
              </div>
              <div className="control">
                <input
                  type="submit" 
                  className="button is-search is-large"
                  value="Search" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  isLoading: false,
  search: '',
};

SearchBar.propTypes = {
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  search: PropTypes.string,
  onChange:PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchBar;
