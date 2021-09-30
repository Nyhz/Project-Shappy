import React from 'react'
import { Container } from 'react-bootstrap'
import UserInfo from './UserInfo'
import GroupInfo from './GroupInfo'
import GroupList from '../GroupList/GroupList'


export default function ProfilePage({ loggedUser }) {

    return (
<<<<<<< HEAD
        <div>
            <GroupList loggedUser={loggedUser} />
            <Container className='profile_container'>
                <h1>Profile of {loggedUser?.username}</h1>
                <div>
                    <UserInfo loggedUser={loggedUser} />
=======
        <Container className='profile_container'>
        
            <h1>Profile of {loggedUser?.username}</h1>
            <div>
                <UserInfo loggedUser={loggedUser} />
>>>>>>> ae213d7be76655c909e038aa0f91dfdac321fcf6

                </div>
                <div>
                    <GroupInfo loggerUser={loggedUser} />

                </div>



            </Container>
        </div>
    )
}
