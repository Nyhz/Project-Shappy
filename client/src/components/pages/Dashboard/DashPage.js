import React, { Component } from 'react'
import BaseService from '../../../services/base.services'
import GroupService from '../../../services/group.services'
import DashItem from './DashItem'
import GroupList from '../GroupList/GroupList'
import ButtonContainer from '../Buttons/ButtonContainer'
import './DashPage.css'

export default class DashPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: null
        }
        this.baseService = new BaseService()
        this.groupService = new GroupService()
    }

    componentDidMount = () => {
        this.refreshImages()
    }


    refreshImages = () => {
        this.baseService.showDashboard()
            .then((images) => {
                this.setState({
                    ...this.state,
                    images: images.data.results
                })
            })
            .catch(err => console.log(err))
    }

    displayImages = () => {
        const openGroupImages = this.state.images.filter(elm => elm.groupRef.isEnded === false)

        return (
            openGroupImages?.length > 0 ?
                openGroupImages.map(image => {
                    return (
                        <DashItem refreshImages={this.refreshImages} filterByTag={this.filterByTag} key={image._id} {...image} loggedUser={this.props.loggedUser} />//? EN IMAGE EVITA QUE EXPLOTE
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }

    filterByTag = (tag) => {
        this.groupService.filterByTag(tag)
            .then((images) => {
                this.setState({
                    ...this.state,
                    images: images.data.images
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <GroupList />
                <div className='dashboard_container'>
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









