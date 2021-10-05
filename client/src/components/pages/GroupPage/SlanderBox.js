import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import SlanderItem from './SlanderItem'
import './SlanderBox.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card, Tab, Tabs } from 'react-bootstrap'


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
                console.log('slanders', slanders);

                const allSlanders = slanders.data.slanders
                console.log('allSlanders', allSlanders);

                const confirmedSlanders = allSlanders.filter(elm => elm.isValidated === 1)
                console.log('confirmed', confirmedSlanders);
                const deniedSlanders = allSlanders.filter(elm => elm.isValidated === -1)
                console.log('denied', deniedSlanders);
                const activeSlanders = allSlanders.filter(elm => elm.isValidated === 0)
                console.log('active', activeSlanders);

                this.setState({
                    ...this.state,
                    slanders: {
                        confirmed: confirmedSlanders,
                        denied: deniedSlanders,
                        active: activeSlanders
                    }
                })
            })
            .catch(err => console.log(err))

    }

    displaySlanders = (type) => {

        return (
            this.state.slanders[type]?.length > 0 ?
                this.state.slanders[type]?.map(slander => {
                    return (
                        <SlanderItem refreshSlanders={this.refreshSlanders} key={slander._id} {...slander} loggedUser={this.props.loggedUser} />
                    )
                }) :
                <h2>Sin resultados</h2>
        )
    }

    render = () => {
        return (

            this.state.slanders ?

                <div>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="Confirmed    " title="Confirmed  ">
                            <Carousel
                                showThumbs={false}
                                className="carousel-style"
                                stopOnHover={true}
                                showIndicators={false}
                                showStatus={false}
                                width="100%"
                            >
                                {
                                    this.displaySlanders('confirmed')
                                }
                            </Carousel>
                        </Tab>
                        <Tab eventKey="Active" title="Active">
                            <Carousel
                                showThumbs={false}
                                className="carousel-style"
                                stopOnHover={true}
                                showIndicators={false}
                                showStatus={false}
                                width="100%"
                            >
                                {
                                    this.displaySlanders('active')
                                }
                            </Carousel>
                        </Tab>
                        <Tab eventKey="Denied" title="Denied">
                            <Carousel
                                showThumbs={false}
                                className="carousel-style"
                                stopOnHover={true}
                                showIndicators={false}
                                showStatus={false}
                                width="100%"
                            >
                                {
                                    this.displaySlanders('denied')
                                }
                            </Carousel>
                        </Tab>
                    </Tabs>
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
