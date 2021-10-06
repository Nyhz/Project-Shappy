import React, { Component } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class SummaryImages extends Component {
    constructor() {
        super()

        this.state = {
            images: null
        }

    }




    render() {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card>
                        <Link className='card_img' to={`/group/${this.props?.groupRef}`}>
                            <Card.Img variant="top" src={this.props?.imageUrl} />
                        </Link>
                        <Card.Body>
                            <Card.Title className='card_title'>#{this.props?.tag}</Card.Title>
                            <Card.Text>
                                <span>Likes: {this.props.likes.length}</span> -
                                <span>Dislikes: {this.props.dislikes?.length}</span> -
                                <span>Shields: {this.props.shields}</span> -
                                <span>Attacks: {this.props.loggedUser?.attacks}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        )
    }
}
