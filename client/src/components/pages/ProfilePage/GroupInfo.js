import React, { Component } from 'react'
import ProfileService from '../../../services/profile.services'
import GroupItem from './GroupItem'
import './GroupInfo.css'

export default class UserInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            group: null

        }
        this.profileService = new ProfileService()
    }

    componentDidMount = () => {
        this.refreshGroups();
    }

    refreshGroups = () => {
        this.profileService.getGroups()
            .then((groups) => {
                this.setState({
                    ...this.state,
                    group: groups.data.user.groups
                })
            })
            .catch(err => console.log(err))

    }

    displayGroups = () => {

        const filteredGroups = this.state.group.filter(group => group.isEnded === true)
        return (
            filteredGroups.length > 0 ?
                filteredGroups.map(group => {
                    return (
                        <GroupItem key={group._id} {...group} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }


    render() {
        return (
            <div className='group_container'>{
                this.state.group ?
                    this.displayGroups()
                    :
                    <h1>Loading</h1>
            }
            </div>
        )
    }
}