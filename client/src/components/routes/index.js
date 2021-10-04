
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import CreateGroup from '../pages/CreateGroup/CreateGroup'
import LandingPage from '../pages/LandingPage/LandingPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ShopPage from '../pages/Shop/ShopPage'
import DashPage from '../pages/Dashboard/DashPage'
import GroupPage from '../pages/GroupPage/GroupPage'
import CreateImage from '../pages/CreateImage/CreateImage'
import CreateSlander from '../pages/CreateSlander/CreateSlander'
import SummaryPage from '../pages/GroupSummary/SummaryPage'
import PaymentPage from '../pages/Payment/PaymentPage'


const Routes = ({ storeUser, loggedUser }) => {
    return (

        <Switch>
            <Route exact path="/" render={(props) => <LandingPage loggedUser={loggedUser} storeUser={storeUser} {...props} />} />
            <Route exact path="/creategroup" render={(props) => <CreateGroup loggedUser={loggedUser} {...props} />} />
            <Route exact path="/profile" render={(props) => <ProfilePage loggedUser={loggedUser} {...props} />} />
            <Route exact path="/shop" render={() => <ShopPage loggedUser={loggedUser} />} />
            <Route exact path="/dashboard" render={(props) => loggedUser ? <DashPage loggedUser={loggedUser} {...props} /> : <Redirect to='/' />} />
            <Route path="/group/:groupId" render={(props) => <GroupPage loggedUser={loggedUser} {...props} />} />
            <Route path="/summary/:groupId" render={(props) => <SummaryPage loggedUser={loggedUser} {...props} />} />
            <Route exact path="/createimage" render={(props) => <CreateImage loggedUser={loggedUser} {...props} />} />
            <Route exact path="/createslander" render={(props) => <CreateSlander loggedUser={loggedUser} {...props} />} />
            <Route exact path="/payment" render={() => <PaymentPage loggedUser={loggedUser} />} />

        </Switch>
    )
}

export default Routes