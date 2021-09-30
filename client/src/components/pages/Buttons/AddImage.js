import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function AddImage() {
    return (
        <div>
            <Link to='/addimage'><Button className='btn btn-dark'>Add Image</Button></Link>
        </div>
    )
}
