import { Component } from 'react'
import {Card} from 'react-bootstrap'
import ContentService from '../../../services/content.services'



class SlanderItem extends Component {
    constructor(props) {
        super(props)

    this.contentService = new ContentService()
    }
    addLike = () => {
        
        this.contentService.addSlanderLike(this.props._id)
        
            .then((res) => {
                
                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))
        // console.log("CLICKY");
    }

    addDislike = () => {
        this.contentService.addSlanderDislike(this.props._id)
            .then((res) => {
                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))
    }

    addShield = async () => {
       
        this.contentService.addSlanderShield(this.props._id)
            .then((res) => {
                
                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))

    }

    addAttack = () => {
        this.contentService.addSlanderAttack(this.props._id)
            .then((res) => {
                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))

    }
    render() {
        return (
            <div>
             <Card>
                <Card.Body>
                    <Card.Title className='slander-card-active'>{this.props.content}</Card.Title>
                </Card.Body>
            </Card> 
            <br/>
                            <span className="display" onClick={this.addLike}>Likes: {this.props?.likes?.length}</span> -
                            <span className="display" onClick={this.addDislike}>Dislikes: {this.props?.dislikes?.length}</span> -
                            <span className="display" onClick={this.addShield}>Shields: {this.props?.shields}</span> -
                            <span className="display" onClick={this.addAttack}>Attacks: {this.props.loggedUser?.attacks}</span>
            </div>
        )
    }
}

export default SlanderItem




