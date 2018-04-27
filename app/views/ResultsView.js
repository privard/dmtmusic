import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Section from '../components/Section'
import ArtistCover from '../components/ArtistCover';
import Message from '../components/Message';

const SEARCH_LIMIT = 21;

class ResultsView extends React.Component {

  constructor(props) {
    super(props);

    this.fetchMoreArtists = this.fetchMoreArtists.bind(this);

    this.state = {
      newSearch: true,
      search: ''
    };
  }

  getArtists() {
    const { app } = this.props;
    return app.get('artists');
  }

  componentDidMount() {
    const { match } = this.props;
    this.searchArtists(match.params.artist);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;

    if (nextProps.location !== this.props.location) {
      this.searchArtists(match.params.artist);
    }
  }

  searchArtists(artist) {
    console.debug('Search artist', artist);
    this.setState({
      search: artist,
      newSearch: true
    });
    this.props.onSearchByArtist(artist, SEARCH_LIMIT, 0);
  }

  fetchMoreArtists() {
    const { search } = this.state;
    const offset = this.getArtists().get('offset') + SEARCH_LIMIT;

    this.setState({
      newSearch: false
    });
    this.props.onSearchMoreByArtist(search, SEARCH_LIMIT, offset);
  }

  renderLoadMore() {
    const isLoading = this.props.app.get('isLoading');
    const artists = this.getArtists();
    const offset = artists.get('offset');
    const limit = artists.get('limit');
    const total = artists.get('total');
    const buttonClasses = classnames(
      'button is-emphazised is-fullwidth',
      { 'is-loading': isLoading }
    );

    if ((offset + limit) >= total) {
      return null;
    }

    return (
      <button
        onClick={this.fetchMoreArtists}
        className={buttonClasses}>Load More Results</button>
    );
  }

  render() {
    const { app } = this.props;
    const { newSearch } = this.state;
    const isLoading = app.get('isLoading');
    const artists = this.getArtists();
    const total = artists.get('total');
    const isEmpty = total === 0;
    

    const message = (isLoading) ? (
      <Message message="Searching for artists..." />
    ) : (
      <Message message="No artist found :(" />
    );

    if ((isLoading && newSearch) || isEmpty) {
      return (
        <Section isMessage={true}>
          {
            (isLoading) ? (
              <Message message="Searching for artists..." />
            ) : (
              <Message message="No artist found :(" />
            )
          }
        </Section>
      );
    }

    return (
      <Section>
        <h1 className="title is-3">About { artists.get('total') } artists</h1>
        <div className="columns is-multiline">
        {
          artists.get('items').map((artist) =>
            <div key={artist.get('id')} className="column is-one-third">
              <Link to={('/artist/' + artist.get('id'))}>
                <ArtistCover artist={artist} />
              </Link>
            </div>
          )
        }
        </div>

        { this.renderLoadMore() }
      </Section>
    );
    
    return null;
  }
  
}

export default ResultsView;