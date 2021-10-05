import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import SlanderItem from './SlanderItem'
import './SlanderBox.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card } from 'react-bootstrap'


export default class SlanderBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slanders: null


        }
        this.groupService = new GroupService()
    }


    componentDidMount = () => {
        this.refreshSlanders()
    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.groupId !== this.props.groupId) this.refreshSlanders()

    }

    refreshSlanders = () => {

        this.groupService.getSlanders(this.props.groupId)

            .then((slanders) => {
                this.setState({
                    ...this.state,
                    slanders: slanders.data.slanders
                })
            })
            .catch(err => console.log(err))
    }

    displaySlanders = () => {

        return (
            this.state.slanders?.length > 0 ?
                this.state.slanders.map(slander => {
                    return (
                        <SlanderItem refreshSlanders={this.refreshSlanders} key={slander._id} {...slander} loggedUser={this.props.loggedUser} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }

    render = () => {
        return (

            this.state.slanders?.length > 0 ?

                <div className="slider-container">
                    <Carousel
                        showThumbs={false}
                        className="carousel-style"
                        stopOnHover={true}
                        showIndicators={false}
                        showStatus={false}
                        width="100%"
                    >
                        {this.displaySlanders()}
                    </Carousel>
                </div>
                :
                <Carousel
                    showThumbs={false}
                    className="carousel-style"
                    stopOnHover={true}
                    showIndicators={false}
                    showStatus={false}
                    width="100%"
                >
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title className='slander-card'>No active slanders</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </Carousel>

        )
    }
}
