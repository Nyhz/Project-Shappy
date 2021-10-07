import React from 'react'
import { Container } from 'react-bootstrap'
import UserInfo from './UserInfo'
import GroupInfo from './GroupInfo'
import GroupList from '../GroupList/GroupList'
import './ProfilePage.css'


export default function ProfilePage({ loggedUser }) {

    return (
        <div className='profile_container'>
            <GroupList loggedUser={loggedUser} />
            <Container className='profile_container'>
                <h1>Profile of {loggedUser?.username}</h1>
                <div>
                    <UserInfo loggedUser={loggedUser} />

                </div>
                <div>
                    <GroupInfo loggerUser={loggedUser} />

                </div>
            </Container>
        </div>
    )
}
