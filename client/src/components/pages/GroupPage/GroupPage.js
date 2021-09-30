import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import GroupList from '../GroupList/GroupList'
import DashItem from '../Dashboard/DashItem'

export default class GroupPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: null

        }
        this.groupService = new GroupService()
    }

    componentDidMount = () => {
        this.refreshImages()

    }


    componentDidUpdate = () => {
        this.refreshImages()
    }

    refreshImages = () => {
        const groupId = this.props.match.params.groupId

        this.groupService.getSingleGroup(groupId)
            .then((group) => {
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
                        <DashItem key={image._id} {...image} loggedUser={this.props.loggedUser} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }


    render() {
        return (
            <>
                <GroupList loggedUser={this.state.loggedUser} storeUser={this.storeUser} />
                <div className='dashboard_container'>

                    {
                        this.state.images ?
                            this.displayImages()
                            :
                            <h1>Loading</h1>
                    }
                </div>
            </>
        )
    }
}