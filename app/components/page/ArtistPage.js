import React from 'react';

class ArtistPage extends React.Component {

  componentDidMount() {
    const { match } = this.props;
    this.fetchArtist(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    if (nextProps.location !== this.props.location) {
      this.fetchArtist(match.params.id);
    }
  }

  fetchArtist(id) {
    console.debug('Fetch artist id', id);
  }

  render() {
    return (
      <div>Artist page</div>
    );
  }
  
}

export default ArtistPage;