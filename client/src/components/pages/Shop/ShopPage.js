import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import ShopService from '../../../services/shop.services'


export default class ShopPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //WAT
        }
       this.shopService = new ShopService()
    }

    componentDidMount = () => {

        this.refreshImages()

    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.match.params.groupId !== this.props.match.params.groupId) this.refreshImages()

    }

    buyShield = () =>{

        this.shopService.buyShield()
    }

    buyAttack = () =>{

        this.shopService.buyAttack()
    }


    render() {

        return (

             <Container className='shop_container'>

                <h1>Welcome {this.loggedUser?.username}</h1>
                <h3>Shields: {this.loggedUser?.shields} - Attacks:{this.loggedUser?.attacks} - Coins:{this.loggedUser?.coins} </h3>

                <ShopItem title="Shield" description="Adds one shield to an image or slander. You can only add a maximum of 10 shields to a particular content." image="hola" buyShield={this.buyShield}/>
                <ShopItem title="Attack" description="Reduce the shields protecting an image or a slander by one. If there are no shields, the image or slander gets destroyed." image="a" buyShield={this.buyShield} buyAttack = {this.buyAttack}/>

            </Container>
        )
    }
}


