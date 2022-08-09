import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      button: true,
      name: '',
      loading: false,
      carregado: false,
    };
  }

  resetForm = (event) => {
    event.preventDefault();
  }

  saveName = (event) => {
    this.setState({ name: event.target.value });
    const value = event.target.value.length;
    const number = 3;
    this.setState({ button: value < number });
  }

  submitCreateUser = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ carregado: true });
  }

  render() {
    const { button, loading, carregado } = this.state;
    return (
      <div>
        { carregado && <Redirect to="/search" /> }
        { loading && <Loading /> }
        { !loading && (
          <form onSubmit={ this.resetForm } data-testid="page-login">
            Nome
            <label htmlFor="name">
              <input
                id="name"
                type="Text"
                onChange={ this.saveName }
                data-testid="login-name-input"
              />
            </label>
            <br />
            <button
              disabled={ button }
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.submitCreateUser }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
