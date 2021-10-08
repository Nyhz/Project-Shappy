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
                const allSlanders = slanders.data.slanders

                const confirmedSlanders = allSlanders.filter(elm => elm.isValidated === 1)
                const deniedSlanders = allSlanders.filter(elm => elm.isValidated === -1)
                const activeSlanders = allSlanders.filter(elm => elm.isValidated === 0)

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



        const slandersCopy = [...this.state.slanders[type]]

        slandersCopy.sort((a, b) => {
            const aCopy = new Date(a.updatedAt)
            const bCopy = new Date(b.updatedAt)

            return bCopy - aCopy
        })

        if (type === 'active') {
            slandersCopy.splice(5)
        }

        return (
            slandersCopy?.length > 0 ?
                slandersCopy?.map(slander => {
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

                <div className='slander_container'>
                    <Tabs defaultActiveKey="Active" id="uncontrolled-tab-example" className="tabs_container">
                        <Tab className='confirmed-tab' eventKey="Confirmed" title="Confirmed">
                            <Carousel
                                showThumbs={false}
                                className="carousel-style"
                                stopOnHover={true}
                                showIndicators={false}
                                showStatus={false}
                                showArrows={false}
                                width="100%"
                            >
                                {
                                    this.displaySlanders('confirmed')
                                }
                            </Carousel>
                        </Tab>
                        <Tab className='active-tab' eventKey="Active" title="Active">
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
                        <Tab className='denied-tab' eventKey="Denied" title="Denied">
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
