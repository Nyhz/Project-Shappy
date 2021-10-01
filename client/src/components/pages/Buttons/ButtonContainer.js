import React from 'react'
import AddImage from './AddImage'
import AddSlander from './AddSlander'
import './ButtonContainer.css'

export default function ButtonContainer() {
    return (
        <div className='btn_container'>
            <AddImage />
            <AddSlander />

        </div>
    )
}
