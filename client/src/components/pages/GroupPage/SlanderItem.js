import React from 'react'
import { Card } from 'react-bootstrap'
import './SlanderItem.css'

export default function SlanderItem({ content }) {
    return (
        <div >
            <Card>
                <Card.Body>
                    <Card.Title className='slander-card-active'>{content}</Card.Title>
                </Card.Body>
            </Card>
        </div >
    )
}
