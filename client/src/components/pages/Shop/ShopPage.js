import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import { Link } from 'react-router-dom'
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
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }

    buyFiveShields = () => {
        this.shopService.buyFiveShields()
            .then(() => {
                this.refreshUser()
            })
            .catch(err => {
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
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }

    buyFiveAttacks = () => {
        this.shopService.buyFiveAttacks()
            .then(() => {
                this.refreshUser()
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
            })
    }

    render() {

        return (
            <div className='shop_container'>
                <img className='shoppy-image' src="../../../../Shoppy.png" alt="Shoppy" />

                <h3 className='inventory_container'><img className='shield-image' src="../../../../Shield.png" alt="shield" />: {this.state.user?.shields} - <img className='bomb-image' src="../../../../Bomb.png" alt="" />:{this.state.user?.attacks} - <img className='coin-image' src="../../../../Coin.png" alt="Coin" /> {this.state.user?.coins} </h3>
                <Link to='/payment'><img className='exchange' src="../../../../Exchange.png" alt="Exchange" /></Link>
                <div className='shop-items'>
                    <ShopItem className='shopimage' title="Shield" image="../../../../Oneshield.png" buyShield={this.buyShield} />
                    <ShopItem className='shopimage' title="Shield x 5" image="../../../../Shieldsprice5x.png" buyFiveShields={this.buyFiveShields} />
                    <ShopItem className='shopimage' title="Attack" image="../../../../Pricebomb1x.png" buyAttack={this.buyAttack} />
                    <ShopItem className='shopimage' title="Attack x 5" image="../../../../5xbombs.png" buyFiveAttacks={this.buyFiveAttacks} />
                    <img className='shopimage' src="../../../../Shirt.png" alt="Shirt" />
                    <img className='shopimage' src="../../../../Pin.png" alt="Pin" />
                </div>
                {this.state.error && <p id='errorMessage'>{this.state.error}</p>}
            </div>
        )
    }
}


{/* <Container className='shop_container'>
    <h1>Welcome, {this.state.user?.username}</h1>
    <h3><img className='shield-image' src="../../../../Shield.png" alt="shield" />: {this.state.user?.shields} - <img className='bomb-image' src="../../../../Bomb.png" alt="" />:{this.state.user?.attacks} - Coins:{this.state.user?.coins} </h3>
    <div className='shields_container'>
        <ShopItem className='item-card-one' title="Shield" description="Adds one shield to an image or slander." image="../../../../1xshield.png" buyShield={this.buyShield} />
        <ShopItem className='item-card-two' title="Shield x 5" description="Adds one shield to an image or slander." image="../../../../5xshield.png" buyFiveShields={this.buyFiveShields} />
    </div>
    <div className='attacks_container'>
        <ShopItem className='item-card-one' title="Attack" description="Reduce the shields protec" image="../../../../1xbomb.png" buyAttack={this.buyAttack} />
        <ShopItem className='item-card-two' title="Attack x 5" description="Reduce the shields protec" image="../../../../5xBomb.png" buyFiveAttacks={this.buyFiveAttacks} />
    </div>
    <div className='merch_container'>
        <img className='item-card-one' src="../../../../Shirt.png" alt="Shirt" />
        <img className='item-card-two' src="../../../../Pin.png" alt="Pin" />
    </div>
    {this.state.error && <p id='errorMessage'>{this.state.error}</p>}
</Container> */}

