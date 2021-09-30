import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import UploadsService from '../../../services/uploads.services'
import ContentService from '../../../services/content.services'

export default class CreateImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            imageUrl: null,
            isLoading: ""

        }

        this.uploadService = new UploadsService()
        this.contentService = new ContentService()

    }


    handleFile = (e) => {
        this.setState({
            ...this.state,
            isLoading: true
        })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        this.uploadService.uploadImg(uploadData)
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    imageUrl: res.data.cloudinary_url
                })
            })
            .catch(err => alert(err, "ERRRORRRRR"))
    }

    handleSubmit = (e) => {

        e.preventDefault();

        this.contentService.newImage(this.state)
            .then((resImage) => {
                console.log('RES IMAGE', resImage.data.image);
                this.setState({
                    image: resImage.data.image
                })
            })
            .catch(err => console.error(err))
    }


    render() {
        return (
            <Container className='form_container'>
                <h1>Upload new image</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen: </Form.Label>
                        <Form.Control onChange={(e) => this.handleFile(e)} name="imageUrl" type="file" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}
