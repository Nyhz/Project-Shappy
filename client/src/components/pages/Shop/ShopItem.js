import React from 'react'
import { Card, Col } from 'react-bootstrap'
import './ShopItem.css'

export default function ShopItem({ description, title, image, buyShield, buyAttack, buyFiveAttacks, buyFiveShields }) {


    const chooseProduct = (title) => {

        switch (title) {

            case "Attack":

                return buyAttack

            case "Attack5":

                return buyFiveAttacks

            case "Shield":

                return buyShield

            case "Shield5":

                return buyFiveShields

            default:

                return 0
        }
    }

    return (
        <div>
            <Col md={4} className="mb-3">
                <Card className='item-card' onClick={chooseProduct(title)}>
                    <Card.Img className='card_img' variant="top" src={image} />
                    <Card.Body>
                        <Card.Title className='card_title'>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>

                    </Card.Body>
                </Card>
            </Col>
        </div>

    )
}

{/* <option value="99">10 coins = 9.99€</option>
                <option value="499">50 + 10 FREE coins = 4.99€</option>
                <option value="999">100 + 50 FREE coins = 9.99€</option>
                <option value="1999">200 + 150 FREE coins = 19.99€</option>
                <option value="4999">500 + 500 FREE coins = 49.99€</option> */}
