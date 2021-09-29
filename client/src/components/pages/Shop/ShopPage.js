import React from 'react'
import { Container } from 'react-bootstrap'
import ShopItem from './ShopItem'


//TODO coleccion de backend para iterar shopitems
export default function ShopPage({ loggedUser }) {
    return (
        <Container className='shop_container'>
            <h1>Welcome {loggedUser?.username}</h1>

            <ShopItem title="Shield" />
  
        </Container>
    )
}