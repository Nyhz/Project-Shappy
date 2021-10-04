import React from 'react'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './GroupCircle.css'



export default function GroupCircle(props) {

    return (
        <Col className='grouplist-column' xs={4}>
            <NavLink
                className="search_container"
                activeStyle={{ display: "block", borderRadius: "50%", border: '1px solid #c44598', boxShadow: '0px 0px 25px 5px #cb7bbe' }}
                to={`/group/${props._id}`}>
                <img className='grouplist-image' style={{ borderRadius: "50%" }} src={props.groupAvatar} alt="GroupImage" />
            </NavLink>
            <p>{props.name}</p>
        </Col >
    )
}



