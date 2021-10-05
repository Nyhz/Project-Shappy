import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import GroupList from '../GroupList/GroupList'
import DashItem from '../Dashboard/DashItem'
import SlanderBox from './SlanderBox'
import './GroupPage.css'

import ButtonContainer from '../Buttons/ButtonContainer'

export default class GroupPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: null,
            users: null,
            group: null

        }
        this.groupService = new GroupService()
    }

    componentDidMount = () => {
        this.refreshImages()
        this.countUsers()
         this.getGroupName()

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.groupId !== this.props.match.params.groupId) {
            this.refreshImages()
            this.countUsers()
            this.getGroupName()
        }
    }

    getGroupName = () => {

        this.groupService.getGroupName(this.props.match.params.groupId)
            .then(group => {
                console.log('GRRRRRRR', group);
                this.setState({
                    ...this.state,
                    group: group.data.group
                })
            })
    }

    countUsers = () => {
        this.groupService.countUsers(this.props.match.params.groupId)
            .then(users => {
                this.setState({
                    ...this.state,
                    users: users.data.users
                })
            })
    }


    refreshImages = () => {
        this.groupService.getSingleGroup(this.props.match.params.groupId)
            .then((group) => {
                console.log('adsasdsadas', group)
                this.setState({
                    ...this.state,
                    images: group.data.images
                })
            })
            .catch(err => console.log(err))
    }

    displayImages = () => {

        return (
            this.state.images.length > 0 ?
                this.state.images.map(image => {
                    return (
                        <DashItem key={image._id} {...image} refreshImages={this.refreshImages} loggedUser={this.props.loggedUser} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }


    render() {
        return (
            <>
                <GroupList />
                {
                    this.state.images ?

                        <h2 className='group-title'>{this.state.group?.name} - {this.state.users}</h2>

                        :
                        <h2>Loading</h2>
                }
                <SlanderBox loggedUser={this.props.loggedUser} groupId={this.props.match.params.groupId} />
                <div className='dashboard_container'>
                    <h2 className='images-title'>Images</h2>

                    {
                        this.state.images ?
                            this.displayImages()
                            :
                            <h1>Loading</h1>
                    }
                </div>
                <ButtonContainer />
            </>
        )
    }
}