import { Component } from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ContentService from '../../../services/content.services'

class DashItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: this.props

        }
        this.contentService = new ContentService()
    }


    addLike = () => {

    }


    render = () => {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card>
                        <Link className='card_img' to={`/group/${this.state.image.groupRef}`}>
                            <Card.Img variant="top" src={this.state.image.imageUrl} />
                        </Link>
                        <Card.Body>
                            <Card.Title className='card_title'>{this.state.image.tag}</Card.Title>
                            <Card.Text>
                                <span>Likes: {this.state.image.likes?.length}</span> - <span>Dislikes: {this.state.image.dislikes?.length}</span> - Shields: {this.state.image.shields}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div >
        )
    }
}

export default DashItem