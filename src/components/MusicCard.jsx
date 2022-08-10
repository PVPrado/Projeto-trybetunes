import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { music, favoritado } = this.props;
    this.setState({
      checked: favoritado.some((musica) => musica.trackId === music.trackId),
    });
  }

  favoring = async (event) => {
    event.preventDefault();
    const { checked } = event.target;
    const { music } = this.props;
    this.setState({ loading: true, checked });
    if (checked) await addSong(musica);
    else await removeSong(music);
    this.setState({ loading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        { loading && (<Loading />) }
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            nome={ trackId }
            type="checkbox"
            checked={ checked }
            onChange={ this.favoring }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favoritado: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
};
