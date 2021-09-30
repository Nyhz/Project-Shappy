import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './GroupCircle.css'



export default function GroupCircle(props) {

    return (
        <Col>
            <Link className='search_container' to={`/group/${props._id}`}>
                <img src={props.groupAvatar} alt="GroupImage" />
            </Link>
            <p>{props.name}</p>
        </Col >
    )
}

