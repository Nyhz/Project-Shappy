import React, { Component } from 'react'
import ProfileService from '../../../services/profile.services'
import './UserInfo.css'


export default class UserInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null

        }
        this.profileService = new ProfileService()
    }

    componentDidMount = () => {
        this.getInfo();
    }


    getInfo = () => {
        this.profileService.getInfo()
            .then(info => {
                this.setState({
                    ...this.state,
                    user: info.data.user,
                })
            })
            .catch(err => console.log(err))
    }



    render() {
        return (
            <div className='user_container'>
                <img src={this.state.user?.avatar} alt="avatar" />
                <p>Email: {this.state.user?.email}</p>
            </div>
        )
    }
}
