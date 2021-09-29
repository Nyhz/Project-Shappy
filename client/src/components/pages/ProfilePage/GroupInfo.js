import React, { Component } from 'react'
import ProfileServices from '../../../services/profile.services'
import GroupItem from './GroupItem'

export default class UserInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            group: null

        }
        this.profileServices = new ProfileServices()
    }

    componentDidMount = () => {
        this.refreshGroups();
    }

    refreshGroups = () => {
        this.profileServices.getGroups()
            .then((groups) => {
                console.log('DATAAAAAAAAAAAA', groups.data.user.groups)
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
            console.log('grupos acabados', filteredGroups),
            filteredGroups.length > 0 ?
                filteredGroups.map(group => {
                    console.log('cada grupo', group)
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