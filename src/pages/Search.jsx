import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      button: true,
    };
  }

  resetFormSearch = (event) => {
    event.preventDefault();
  }

  enableButton = ({ target }) => {
    const value = target.value.length;
    const number = 2;
    this.setState({ button: value < number });
  }

  render() {
    const { button } = this.state;
    return (
      <form onSubmit={ this.resetFormSearch }>
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
            onClick={ this.enableButton }
          >
            Pesquisar
          </button>
        </div>
      </form>
    );
  }
}

export default Search;
