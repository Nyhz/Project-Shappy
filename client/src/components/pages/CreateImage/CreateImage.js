import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import UploadsService from '../../../services/uploads.services'
import ContentService from '../../../services/content.services'

export default class CreateImage extends Component {
    constructor() {
        super()
        this.state = {
            imageUrl: null,
            tag: null,
            groupRef: null,
            groups: null,
            name: 'groupRef'

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
                    <option value={elm._id} name={'groupRef'}>{elm.name}</option>
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


    handleChange = (e) => {

        const { value } = e.target;
        console.log(value);
        console.log(this.state.tag);

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
        console.log(e.target);
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
        console.log(this.state);
        this.contentService.newImage(this.state)
            .then((resImage) => {
                console.log('RES IMAGE', resImage.data.image);
                this.setState({
                    image: resImage.data.image,
                    imageUrl: ""
                })
            })
            .then(() => this.props.history.push(`/group/${this.state.groupRef}`))
            .catch(err => console.error(err))
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
                        <Form.Label>Imagen: </Form.Label>
                        <Form.Control onChange={(e) => this.handleFile(e)} name="imageUrl" type="file" />
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container >
        )
    }
}
