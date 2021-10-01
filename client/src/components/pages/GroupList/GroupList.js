import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import GroupCircle from './GroupCircle'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './GroupList.css'


export default class GroupList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groups: null

        }
        this.groupService = new GroupService()
    }

    componentDidMount = () => {
        this.refreshGroups()
    }

    refreshGroups = () => {
        this.groupService.getGroups()
            .then((groups) => {
                this.setState({
                    ...this.state,
                    groups: groups.data.groupArr
                })
            })
            .catch(err => console.log(err))
    }

    displayGroups = () => {
        const filteredGroups = this.state.groups.filter(group => group.isEnded === false)

        return (
            filteredGroups.length > 0 ?
                filteredGroups.map(group => {
                    return (
                        <GroupCircle key={group._id} {...group} loggedUser={this.props.loggedUser} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }

    render() {
        return (
            <Container className='groups_container'>
                <Row>
                    {
                        this.state.groups ?
                            this.displayGroups()
                            :
                            <h1>Loading groups</h1>
                    }
                </Row>
            </Container >
        )
    }
}





