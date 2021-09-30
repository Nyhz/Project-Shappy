import React, { Component } from 'react'
import BaseService from '../../../services/base.services'
import DashItem from './DashItem'
import GroupList from '../GroupList/GroupList'

export default class DashPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: null

        }
        this.baseService = new BaseService()
    }

    componentDidMount = () => {
        this.refreshImages()
        console.log(this.props)
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









