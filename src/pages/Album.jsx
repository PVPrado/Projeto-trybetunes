import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
      loading: false,
      songs: [],
    };
  }

  async componentDidMount() {
    const favoritado = await getFavoriteSongs();
    this.setState({
      favoritado,
    });
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      content: data,
      loading: true,
      songs: data.filter((_element, index) => index !== 0),
    });
  }

  render() {
    const { content, loading, songs, favoritado } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">
          {loading && content[0].artistName}
        </div>
        <div data-testid="album-name">
          {loading && (`${content[0].collectionName} ${content[0].artistName}`)}
        </div>
        <div>
          {songs.map((music) => (
            <div key={ music.trackId } className="tracks">
              <MusicCard
                favoritado={ favoritado }
                music={ music }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                trackId={ music.trackId }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
