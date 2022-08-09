import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    nameUser: '',
    loading: true,
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      nameUser: data.name,
      loading: false,
    });
  }

  render() {
    const { nameUser, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <nav>
            <h3 data-testid="header-user-name">{ nameUser }</h3>
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
