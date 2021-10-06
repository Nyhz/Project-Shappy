import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import ShopService from '../../../services/shop.services'
import ProfileService from '../../../services/profile.services'
import './ShopPage.css'

export default class ShopPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            error: null
        }

        this.shopService = new ShopService()
        this.profileService = new ProfileService()
    }

    componentDidMount = () => {
        this.refreshUser()
    }

    refreshUser = () => {
        this.profileService.getInfo()
            .then((user) => {
                this.setState({
                    ...this.state,
                    user: user.data.user
                })
            })
            .catch(err => console.log(err))
    }

    buyShield = () => {
        this.shopService.buyShield()
            .then(() => {
                this.refreshUser()
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }

    buyAttack = () => {
        this.shopService.buyAttack()
            .then(() => {
                this.refreshUser()
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }

    render() {

        return (

            <Container className='shop_container'>
                <h1>Welcome, {this.state.user?.username}</h1>
                <h3><img className='shield-image' src="../../../../Shield.png" alt="shield" />: {this.state.user?.shields} - <img className='bomb-image' src="../../../../Bomb.png" alt="" />:{this.state.user?.attacks} - Coins:{this.state.user?.coins} </h3>
                <div className='shields_container'>
                    <ShopItem className='item-card-one' title="Shield" description="Adds one shield to an image or slander." image="hola" buyShield={this.buyShield} />
                    <ShopItem className='item-card-two' title="Shield x5" description="Adds one shield to an image or slander." image="hola" buyShield={this.buyShield} />
                </div>
                <div className='attacks_container'>
                    <ShopItem className='item-card-one' title="Attack" description="Reduce the shields protec" image="a" buyAttack={this.buyAttack} />
                    <ShopItem className='item-card-two' title="Attack x5" description="Reduce the shields protec" image="a" buyAttack={this.buyAttack} />
                </div>
                {this.state.error && <p id='errorMessage'>{this.state.error}</p>}
            </Container>
        )
    }
}


