import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      button: true,
      artist: '',
      loading: false,
      artistList: [],
    };
  }

  resetFormSearch = (event) => {
    event.preventDefault();
  }

  enableButton = ({ target }) => {
    this.setState({ artist: target.value });
    const value = target.value.length;
    const number = 2;
    this.setState({ button: value < number });
  }

searchArtist = async () => {
  this.setState({ loading: true });
  const { artist } = this.state;
  const lista = await searchAlbumsAPI(artist);
  this.setState({ loading: false, artistList: lista });
}

render() {
  const { button, loading, artistList, artist } = this.state;
  return (
    <div>
      <form onSubmit={ this.resetFormSearch }>
        { loading && <Loading />}
        { !loading && (
          <div data-testid="page-search">
            <Header />
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.enableButton }
            />
            <br />
            <button
              disabled={ button }
              type="submit"
              data-testid="search-artist-button"
              onClick={ this.searchArtist }
            >
              Pesquisar
            </button>
            {(artistList.length === 0)
              ? <p>Nenhum álbum foi encontrado</p> : <p>Curta o resultado da busca</p> }
            <p>
              {`Resultado de álbuns de: ${artist}`}
              <br />
              {artistList.map((e) => (
                <li key={ artist.collectionId }>
                  {`Nome do artista: ${e.artistName}`}
                  <br />
                  {` Nome do Album: ${e.collectionName}`}
                  <br />
                  <Link
                    to={ `/album/${e.collectionId}` }
                    data-testid={ `link-to-album-${e.collectionId}` }
                  >
                    Album
                  </Link>
                  <img src={ artist.artworkUrl100 } alt={ artist.collectionName } />
                </li>
              ))}
            </p>
          </div>
        )}
      </form>

    </div>

  );
}
}

export default Search;
