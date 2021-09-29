import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ShopItem({description, title}) {
    // title.lowerCase()
    return (
        <div>
            <Col md={4} className="mb-3">
                <Card>
                    <Card.Img className='card_img' variant="top" src="hola" />
                    <Card.Body>
                        <Card.Title className='card_title'>{title}</Card.Title>
                        <Card.Text>Protect your slanders and photos against attacks from other users</Card.Text>
                        <Button variant="primary">Buy</Button>
                    </Card.Body>
                </Card>
            </Col>
        </div>
        
    )
}
