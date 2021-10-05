import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import ShopService from '../../../services/shop.services'
import ProfileService from '../../../services/profile.services'


export default class ShopPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : null,
          
        }

       this.shopService = new ShopService()
       this.profileService = new ProfileService()
    }

    componentDidMount = () => {
        
        this.refreshUser()

    }


    refreshUser = () => {

        this.profileService.getInfo()

        .then((user)=>{

            this.setState({
                ...this.state,
                user: user.data.user
            })
        })
        .catch(err => console.log(err))
    }

    buyShield = () =>{

        this.shopService.buyShield()

        .then(()=>{

            this.refreshUser()

        })
    }

    buyAttack = () =>{

        this.shopService.buyAttack()

        .then(()=>{

            this.refreshUser()

        })
    }

    render() {

        return (

             <Container className='shop_container'>

                <h1>Welcome {this.state.user?.username}</h1>
                <h3>Shields: {this.state.user?.shields} - Attacks:{this.state.user?.attacks} - Coins:{this.state.user?.coins} </h3>

                <ShopItem title="Shield" description="Adds one shield to an image or slander. You can only add a maximum of 10 shields to a particular content." image="hola" buyShield={this.buyShield}/>
                <ShopItem title="Attack" description="Reduce the shields protecting an image or a slander by one. If there are no shields, the image or slander gets destroyed." image="a" buyShield={this.buyShield} buyAttack = {this.buyAttack}/>

            </Container>
        )
    }
}


