import React from 'react'
import { Card } from 'react-bootstrap'
import './ShopItem.css'

export default function ShopItem({ title, image, buyShield, buyAttack, buyFiveAttacks, buyFiveShields }) {

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
        <div className='card_container' onClick={chooseProduct(title)}>
            <img className='shop-image' src={image} alt="shop" />
        </div>

    )
}