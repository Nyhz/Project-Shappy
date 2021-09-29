import React from 'react'
import { Container } from 'react-bootstrap'
import UserInfo from './UserInfo'
import GroupInfo from './GroupInfo'


export default function ProfilePage({ loggedUser }) {
    return (
        <Container className='profile_container'>
        
            <h1>Profile of {loggedUser?.username}</h1>
            <div>
                <UserInfo loggedUser={loggedUser} />

            </div>
            <div>
                <GroupInfo loggerUser={loggedUser} />

            </div>



        </Container>
    )
}
