import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import getMusics from '../services/musicsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  favoring = async (event) => {
    event.preventDefault();
    const { id, checked } = event.target;
    this.setState({
      loading: true,
    });
    const song = await getMusics(id);
    await addSong(song[0]);
    if (checked) {
      this.setState({
        checked: true,
        loading: false,
      });
    }
    if (!checked) {
      this.setState({
        checked: false,
        loading: false,
      });
    }
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
};
