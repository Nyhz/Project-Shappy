
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
            <Route exact path="/creategroup" render={(props) => loggedUser ? <CreateGroup loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route exact path="/profile" render={(props) => loggedUser ? <ProfilePage loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route exact path="/shop" render={() => loggedUser ? <ShopPage loggedUser={loggedUser} storeUser={storeUser} /> : <Redirect to='/' />} />
            <Route exact path="/dashboard" render={(props) => loggedUser ? <DashPage loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route path="/group/:groupId" render={(props) => loggedUser ? <GroupPage loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route path="/summary/:groupId" render={(props) => loggedUser ? <SummaryPage loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route exact path="/createimage" render={(props) => loggedUser ? <CreateImage loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route exact path="/createslander" render={(props) => loggedUser ? <CreateSlander loggedUser={loggedUser} storeUser={storeUser} {...props} /> : <Redirect to='/' />} />
            <Route exact path="/payment" render={() => loggedUser ? <PaymentPage loggedUser={loggedUser} storeUser={storeUser} /> : <Redirect to='/' />} />
        </Switch>

    )
}

export default Routes