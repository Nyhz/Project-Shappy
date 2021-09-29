import { Component } from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ContentService from '../../../services/content.services'

class DashItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: this.props,
            userId: "",
            imageId: ""

        }

        this.contentService = new ContentService()
    }

    addLike = (userId, imageId) => {
        console.log('ENTRANDO EN ADDLIKE')
        this.contentService.addLike(userId, imageId)
            .then((res) => {
                console.log('RESPUESTA', res)
                this.setState({
                    ...this.state

                })
            })

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
                                <span onClick={this.addLike}>Likes: {this.state.image.likes?.length}</span> - <span>Dislikes: {this.state.image.dislikes?.length}</span> - Shields: {this.state.image.shields}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div >
        )
    }
}

export default DashItem