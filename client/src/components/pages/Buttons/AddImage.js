import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './AddImage.css'


export default function AddImage() {
    return (
        <div className='image-btn'>
            <Link to='/createimage'><Button className='btn btn-dark'>Add Image</Button></Link>
        </div>
    )
}
