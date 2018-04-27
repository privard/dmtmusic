import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Disc = (props) => {
  const { tracks } = props;
  const durationToSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <table className="table is-fullwidth is-marginless">
      <tbody>
        {
          tracks.map((track) =>
            <tr key={track.id}>
              <td>{track.track_number}.</td>
              <td>{track.name}</td>
              <td className="has-text-right">
                {durationToSeconds(track.duration_ms)}
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

class AlbumTracks extends React.Component {
  constructor(props) {
    super(props);
  }

  groupTracksByDiscs(tracks) {
    const discs = [];

    tracks.forEach((track) => {
      const pos = track.disc_number - 1;
      if (!discs[pos]) {
        discs[pos] = [];
      }
      discs[pos].push(track);
    });

    return discs;
  }

  render() {
    const { tracks } = this.props;
    const discs = this.groupTracksByDiscs(tracks);

    const discsList = discs.map((disc, i) => {
      return (
        <React.Fragment key={i} >
          {(discs.length > 1) &&
            <div className="disc has-text-centered">
              Disc {i + 1}
            </div>
          }
          <Disc tracks={disc} />
        </React.Fragment>
      )
    });

    return (
    <div className="tracks">
      {discsList}
    </div>
    );
  }
}

AlbumTracks.propTypes = {
  tracks: PropTypes.array
};

export default AlbumTracks;
