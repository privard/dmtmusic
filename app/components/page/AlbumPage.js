import React from 'react';

class AlbumPage extends React.Component {

  componentDidMount() {
    const { match } = this.props;
    this.fetchAlbum(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    if (nextProps.location !== this.props.location) {
      this.fetchAlbum(match.params.id);
    }
  }

  fetchAlbum(id) {
    console.debug('Fetch album id', id);
  }

  render() {
    return (
      <div>Album page</div>
    );
  }
  
}

export default AlbumPage;