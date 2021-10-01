import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './AddSlander.css'


export default function AddSlander() {
    return (
        <div className='slander-btn'>
            <Link to='/createslander'><Button className='btn btn-dark'>Add Slander</Button></Link>
        </div>
    )
}
