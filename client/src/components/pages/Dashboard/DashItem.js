import { Component } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './DashItem.css'

import ContentService from '../../../services/content.services'

class DashItem extends Component {
    constructor(props) {
        super(props)

        this.contentService = new ContentService()
    }

    componentDidMount = () => {
        console.log(this.props.groupRef)
    }

    addImageLike = () => {
        this.contentService.addLike(this.props._id)
            .then((res) => {
                this.props.refreshImages()
            })
            .catch(err => console.log(err))
    }

    addImageDislike = () => {
        console.log('entrando en dislike');
        this.contentService.addDislike(this.props._id)
            .then((res) => {
                console.log('entrando en then');
                console.log(this.props);
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
                console.log(this.props.refreshImages)
                this.props.refreshImages()
            })
            .catch(err => console.log(err))
    }
    render = () => {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card className='image-card'>
                        <h2>#{this.props?.tag}</h2>
                        <Card.Img variant="top" src={this.props?.imageUrl} />
                        <Card.Body>
                            <Link to={`/group/${this.props.groupRef._id}`}><span>{this.props.groupRef.name}</span></Link>

                            <Card.Text>
                                <span onClick={this.addImageLike}>Likes: {this.props?.likes?.length}</span> -
                                <span onClick={this.addImageDislike}>Dislikes: {this.props?.dislikes?.length}</span> -
                                <span onClick={this.addImageShield}>Shields: {this.props?.shields}</span> -
                                <span onClick={this.addImageAttack}>Attacks: {this.props.loggedUser?.attacks}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div >
        )
    }
}

export default DashItem