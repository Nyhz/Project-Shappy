import { Component } from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './DashItem.css'
import moment from 'moment'
import ContentService from '../../../services/content.services'
import GroupService from '../../../services/group.services'
import { Slide } from "react-awesome-reveal";


class DashItem extends Component {
    constructor() {
        super()

        this.contentService = new ContentService()
        this.groupService = new GroupService()
    }

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

    addImageShield = () => {
        this.contentService.addShield(this.props._id)
            .then((res) => {
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

    formatDate = (date) => {
        return moment(date).utcOffset('+0200').format('MMM Do, HH:mm')
    }

    render = () => {
        return (
            <div>
                <Col md={4} className="mb-3">
                    <Card className='image-card'>
                        <h2 className='tag-element' onClick={() => this.props.filterByTag(this.props.tag)}>#{this.props.tag}</h2>
                        <Card.Img variant="top" src={this.props?.imageUrl} />
                        <Card.Body>
                            <Link className='groupname-element' to={`/group/${this.props.groupRef._id}`}><span className='groupname-element'>/{this.props.groupRef.name}</span></Link>
                            <Card.Text className='interactions_container'>
                                <span className='interaction-image' onClick={this.addImageAttack}><img src="../../../../Bomb.png" alt="Attack" /></span>

                                <span onClick={this.addImageLike}>Likes: {this.props?.likes?.length}</span> -
                                <span onClick={this.addImageDislike}>Dislikes: {this.props?.dislikes?.length}</span> -
                                <span className='interaction-image' onClick={this.addImageShield}><img src="../../../../Shield.png" alt="Shield" /> {this.props?.shields}</span> -
                                <p className='date-element'>{this.formatDate(this.props.createdAt)}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div >
        )
    }
}

export default DashItem