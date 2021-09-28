import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Routes from './components/routes/index'
import Navigation from './components/layout/navbar/Navbar'
import AuthService from './services/auth.services';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedUser: undefined
    }
    this.authService = new AuthService()
  }

  componentDidMount = () => {
    this.fetchUser()
  }

  storeUser = (user) => this.setState({ loggedUser: user })

  fetchUser = () => {
    this.authService.isloggedin()
      .then(res => this.storeUser(res.data))
      .catch(err => this.storeUser(null))
  }

  render = () => {
    return (
      <>
        <Navigation loggedUser={this.state.loggedUser} storeUser={this.storeUser} />
        <Routes storeUser={this.storeUser} loggedUser={this.state.loggedUser} />


      </>
    );
  }
}

export default App;
