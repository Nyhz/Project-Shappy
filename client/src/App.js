import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import GroupService from './services/group.services';

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
    this.groupService = new GroupService()
  }

  componentDidMount = () => {
    this.fetchUser()
    setInterval(this.checkEndDate, 1000 * 60 * 60)
  }

  checkEndDate = () => {

    this.groupService.getGroupEnd()
      .then((groups) => {
      })
      .catch(err => console.log)

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
