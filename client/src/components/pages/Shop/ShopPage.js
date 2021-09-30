import React from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'
import ShopService from '../../../services/shop.services'


//TODO coleccion de backend para iterar shopitems
export default function ShopPage({ loggedUser}) {

    const shopService = new ShopService()

    const buyShield = () =>{
        shopService.buyShield()
    }

    const buyAttack = () =>{
        shopService.buyAttack()
    }

    return (

        <Container className='shop_container'>

            <h1>Welcome {loggedUser?.username}</h1>
            <h3>Shields: {loggedUser?.shields} - Attacks:{loggedUser?.attacks} - Coins:{loggedUser?.coins} </h3>

            <ShopItem title="Shield" description="Adds one shield to an image or slander. You can only add a maximum of 10 shields to a particular content." image="hola" buyShield={buyShield}/>
            <ShopItem title="Attack" description="Reduce the shields protecting an image or a slander by one. If there are no shields, the image or slander gets destroyed." image="a" buyShield={buyShield} buyAttack = {buyAttack}/>

        </Container>
    )
}


