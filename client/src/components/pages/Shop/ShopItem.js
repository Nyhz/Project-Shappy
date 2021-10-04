import React from 'react'
import {Card, Col } from 'react-bootstrap'

export default function ShopItem({description, title, image, buyShield, buyAttack}) {
   
   
  const chooseProduct = (title) =>{

        switch (title){

            case "Attack":

                return buyAttack

            case "Shield":

                return buyShield

            default:

                return 0
        }
    }
   
    return (
        <div>
            <Col md={4} className="mb-3">
                <Card onClick={chooseProduct(title)}>
                    <Card.Img className='card_img' variant="top" src={image}/>
                    <Card.Body>
                        <Card.Title className='card_title'>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
        </div>  
        
    )
}


