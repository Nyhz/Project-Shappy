import { Component } from 'react'
import { Card } from 'react-bootstrap'
import ContentService from '../../../services/content.services'
import { JackInTheBox } from "react-awesome-reveal";
import './SlanderItem.css'


class SlanderItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            error: null
        }

        this.contentService = new ContentService()
    }

    componentDidMount = () => {
        this.getUser()
    }

    addLike = () => {

        this.contentService.addSlanderLike(this.props._id)

            .then((res) => {

                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))
    }

    addDislike = () => {
        this.contentService.addSlanderDislike(this.props._id)
            .then((res) => {
                this.props.refreshSlanders()
            })
            .catch(err => console.log(err))
    }

    addShield = () => {

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
            .catch(err => {
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }


    getUser = () => {

        this.contentService.getUser(this.props.authorId)
            .then(user => {
                this.setState({
                    ...this.state,
                    user: user.data.user
                })
            })
    }

    showAlert = () => {
        alert(this.state.error)
    }

    render() {
        return (
            <div>
                <JackInTheBox>
                    <Card className='slander_container'>
                        <Card.Body className='slander-card'>
                            <Card.Title className='slander-card-active'>{this.props.content}</Card.Title>
                            {
                                this.props.isValidated === -1 && <p>User: {this.state.user?.username}</p>
                            }
                        </Card.Body>
                    </Card>
                </JackInTheBox>
                <br />
                {
                    this.props.isValidated === 0 &&
                    <div className='slander_interactions'>
                        <span className="display" onClick={this.addAttack}><img src="../../../../Bomb.png" alt="Like" /></span>
                        <span className="display" onClick={this.addLike}> <img src="../../../../Like2.png" alt="Like" /> {this.props?.likes?.length}</span>
                        <span className="display" onClick={this.addDislike}><img src="../../../../Dislike2.png" alt="Like" /> {this.props?.dislikes?.length}</span>
                        <span className="display" onClick={this.addShield}><img src="../../../../Shield.png" alt="Like" /> {this.props?.shields}</span>
                    </div>
                }

                {
                    this.state.error && this.showAlert()
                }
            </div>
        )
    }
}

export default SlanderItem




