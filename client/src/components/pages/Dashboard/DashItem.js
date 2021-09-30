import { Component } from 'react'
import { Card, Col } from 'react-bootstrap'
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

    addImageLike = () => {
        this.contentService.addLike(this.props._id)
            .then((res) => {
                this.setState({
                    ...this.state,
                    image: res.data.newImage
                })
            })
            .catch(err => console.log(err))
    }

    addImageDislike = () => {
        this.contentService.addDislike(this.props._id)
            .then((res) => {
                this.setState({
                    ...this.state,
                    image: res.data.newImage
                })
            })
            .catch(err => console.log(err))
    }

    addImageShield = () => {
        this.contentService.addShield(this.props._id)
            .then((res) => {
                console.log('res de shield', res)
                this.setState({
                    ...this.state,
                    image: res.data.newImage
                })
            })
            .catch(err => console.log(err))

    }

    render = () => {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card>
                        <Link className='card_img' to={`/group/${this.state.image?.groupRef}`}>
                            <Card.Img variant="top" src={this.state.image?.imageUrl} />
                        </Link>
                        <Card.Body>
                            <Card.Title className='card_title'>{this.state.image?.tag}</Card.Title>
                            <Card.Text>
                                <span onClick={this.addImageLike}>Likes: {this.state.image?.likes?.length}</span> - <span onClick={this.addImageDislike}>Dislikes: {this.state.image?.dislikes?.length}</span> - <span onClick={this.addImageShield}>Shields: {this.state.image?.shields}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div >
        )
    }
}

export default DashItem