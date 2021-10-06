import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './AddImage.css'


export default function AddImage() {
    return (
        <div className='image-btn'>
            <Link to='/createimage'><img src="../../../../Camera.png" alt="Photo" /></Link>
        </div>
    )
}
