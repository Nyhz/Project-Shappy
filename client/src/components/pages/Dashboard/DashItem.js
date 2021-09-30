import { Component } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ContentService from '../../../services/content.services'

class DashItem extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     calling: false
        // }

        this.contentService = new ContentService()
    }

    // shouldCall = (func) => {
    //     !this.state.calling && func()
    // }

    addImageLike = () => {
        this.contentService.addLike(this.props._id)
            .then((res) => {
                this.props.refreshImages()
            })
            .catch(err => console.log(err))
    }

    addImageDislike = () => {
        this.contentService.addDislike(this.props._id)
            .then((res) => {
                this.props.refreshImages()
            })
            .catch(err => console.log(err))
    }

    addImageShield = async () => {
        // await this.setState({ calling: true })
        this.contentService.addShield(this.props._id)
            .then((res) => {
                // this.setState({ calling: false })
                this.props.refreshImages()
            })
            .catch(err => console.log(err))

    }

    addImageAttack = () => {
        this.contentService.addAttack(this.props._id)
            .then((res) => {
                this.props.refreshImages()
            })
            .catch(err => console.log(err))

    }
    render = () => {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card>
                        <Link className='card_img' to={`/group/${this.props?.groupRef}`}>
                            <Card.Img variant="top" src={this.props?.imageUrl} />
                        </Link>
                        <Card.Body>
                            <Card.Title className='card_title'>{this.props?.tag}</Card.Title>
                            <Card.Text>
                                <span onClick={this.addImageLike}>Likes: {this.props?.likes?.length}</span> -
                                <span onClick={this.addImageDislike}>Dislikes: {this.props?.dislikes?.length}</span> -
                                <span onClick={this.addImageShield}>Shields: {this.props?.shields}</span> -
                                <span onClick={this.addImageAttack}>Attacks: {this.props.loggedUser?.attacks}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default DashItem