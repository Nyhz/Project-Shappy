import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './GroupItem.css'


export default function GroupItem({ _id, name, groupAvatar, endDate, createdAt }) {


    const formatDate = (date) => { // TODO PASAR A UTILS
        return moment.utc(date).format('MMM Do, YYYY')
    }

    return (

        <Col md={4} className="mb-3">
            <Card className='card_container2'>
                <Card.Title className='card_title'>{name}</Card.Title>
                <Card.Img className='card_img' variant="top" src={groupAvatar} />
                <Card.Body className='card_body'>
                    <Card.Text className='card_text'>
                        Start date: {formatDate(createdAt)} <br />
                        End date: {formatDate(endDate)}
                    </Card.Text>
                    <Link to={`/summary/${_id}`}>
                        <Button variant="primary">Ver detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    )
}