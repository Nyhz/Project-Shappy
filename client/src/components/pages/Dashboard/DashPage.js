import React, { Component } from 'react'
import BaseService from '../../../services/base.services'
import DashItem from './DashItem'
import GroupList from '../GroupList/GroupList'
import ButtonContainer from '../Buttons/ButtonContainer'

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
                        <DashItem refreshImages={this.refreshImages} key={image._id} {...image} loggedUser={this.props.loggedUser} />//? EN IMAGE EVITA QUE EXPLOTE
                    )
                }) :
                <h2>Sin resultados</h2>
        )
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









