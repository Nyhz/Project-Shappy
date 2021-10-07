import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import UploadsService from '../../../services/uploads.services'
import ContentService from '../../../services/content.services'
import './CreateImage.css'

export default class CreateImage extends Component {
    constructor() {
        super()
        this.state = {
            imageUrl: null,
            tag: null,
            groupRef: null,
            groups: null,
            name: 'groupRef',
            error: null

        }

        this.uploadService = new UploadsService()
        this.contentService = new ContentService()

    }

    componentDidMount = () => {
        this.getGroupList()
    }

    displayGroupList = () => {
        const openGroups = this.state.groups?.filter(elm => elm.isEnded !== true)
        return (
            openGroups.length > 0 ?
                openGroups.map(elm => {
                    return (
                        <option value={elm._id} name={'groupRef'}>{elm.name}</option>
                    )
                }) :
                <p>Sin resultados</p>
        )
    }

    getGroupList = () => {
        this.contentService.getGroups()
            .then((groups) => {
                this.setState({
                    groups: groups.data.groups.groups
                })
            })
            .catch(err => console.log(err))
    }


    handleChange = (e) => {

        const { value } = e.target;

        this.setState({
            ...this.state,
            tag: value
        })
    }

    handleSelectChanges = (e) => {

        const { value } = e.target;

        this.setState({
            ...this.state,
            groupRef: value
        })
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
                this.setState({
                    image: resImage.data.image,
                    imageUrl: ""
                })
            })
            .then(() => this.props.history.push(`/group/${this.state.groupRef}`))
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    error: err
                })
                console.error(err)
            })
    }


    render = () => {
        return (
            <Container className='form_container'>
                <h1>Upload new image</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="tag">
                        <Form.Label>Tag: </Form.Label>
                        <Form.Control onChange={(e) => this.handleChange(e)} name="tag" type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Control className='image-upload' onChange={(e) => this.handleFile(e)} name="imageUrl" type="file" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select" onChange={(e) => this.handleSelectChanges(e)}>
                            <option>Select group</option>
                            {
                                this.state.groups ?
                                    this.displayGroupList()
                                    :
                                    <option value="">Loading groups</option>
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button className='image-submit' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <img className='bg-image' src="../../../../Photo_background.png" alt="Photo" />
            </Container >
        )
    }
}
