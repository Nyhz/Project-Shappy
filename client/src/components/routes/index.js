
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import CreateGroup from '../pages/CreateGroup/CreateGroup'
import LandingPage from '../pages/LandingPage/LandingPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'


const Routes = ({ storeUser, loggedUser }) => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => <LandingPage {...props} />} />
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login storeUser={storeUser} {...props} />} />
            <Route exact path="/creategroup" render={(props) => <CreateGroup loggedUser={loggedUser} {...props} />} />
            <Route exact path="/profile" render={(props) => <ProfilePage loggedUser={loggedUser} {...props} />} />
            <Route exact path="/dashboard" />


        </Switch>
    )
}

export default Routes