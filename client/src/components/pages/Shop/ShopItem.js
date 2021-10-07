import React from 'react'
import { Card, Col } from 'react-bootstrap'
import './ShopItem.css'

export default function ShopItem({ description, title, image, buyShield, buyAttack, buyFiveAttacks, buyFiveShields }) {

    const chooseProduct = (title) => {
        switch (title) {

            case "Attack":
                return buyAttack

            case "Attack x 5":
                return buyFiveAttacks

            case "Shield":
                return buyShield

            case "Shield x 5":
                return buyFiveShields

            default:
                return 0
        }
    }

    return (
        <div className='card_container'>
            <Card className='item-card' onClick={chooseProduct(title)}>
                <Card.Img className='card_img' variant="top" src={image} />
            </Card>
        </div>

    )
}