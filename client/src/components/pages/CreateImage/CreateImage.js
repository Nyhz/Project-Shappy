import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import UploadsService from '../../../services/uploads.services'
import ContentService from '../../../services/content.services'

export default class CreateImage extends Component {
    constructor() {
        super()
        this.state = {
            image: null,
            imageUrl: null,
            // isLoading: "",
            groups: null

        }

        this.uploadService = new UploadsService()
        this.contentService = new ContentService()

    }

    componentDidMount = () => {
        this.getGroupList()
    }

    displayGroupList = () => {
        return (
            this.state.groups?.map(elm => {
                return (
                    <option onSelect={(e) => this.handleFile(e)} value={elm._id}>{elm.name}</option>
                )
            })
        )
    }

    getGroupList = () => {
        this.contentService.getGroups()
            .then((groups) => {
                console.log(groups.data.groups.groups)
                this.setState({
                    groups: groups.data.groups.groups
                })
            })
            .catch(err => console.log(err))
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
                    image: resImage.data.image,
                    imageUrl: ""
                })
            })
            .catch(err => console.error(err))
    }


    render = () => {
        return (
            <Container className='form_container'>
                <h1>Upload new image</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Imagen: </Form.Label>
                        <Form.Control onChange={(e) => this.handleFile(e)} name="imageUrl" type="file" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select">
                            {
                                this.state.groups ?
                                    this.displayGroupList()
                                    :
                                    <option value="">Loading groups</option>
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container >
        )
    }
}
