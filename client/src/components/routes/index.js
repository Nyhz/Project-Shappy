
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'


const Routes = ({ storeUser }) => {
    return (
        <Switch>
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login storeUser={storeUser} {...props} />} />


        </Switch>
    )
}

export default Routes