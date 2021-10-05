import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import GroupService from '../../../services/group.services'
import UploadsService from '../../../services/uploads.services'

export default class CreateGroup extends Component {

    constructor({ props }) {
        super(props)
        this.state = {
            name: "",
            secret: "",
            groupAvatar: "",
            endDate: "",
            isEnded: false,
            owner: "",
            isLoading: false,
            groups: null
        }
        this.groupService = new GroupService()
        this.uploadsService = new UploadsService()
    }

    checkMaxGroups = () => {

        this.groupService.getGroups()
            .then(groups => {
                const totalOpenGroups = groups.data.groupArr.filter(group => group.isEnded === false)
                if (totalOpenGroups.length < 4) {
                    // this.setState() true
                } else {
                    return false
                }
            })
            .catch(err => console.log(err))
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { name, secret, endDate, groupAvatar } = this.state
        const owner = this.props.loggedUser._id
        this.groupService.create(name, secret, endDate, owner, groupAvatar)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err))
    }

    handleJoinForm = (e) => {
        e.preventDefault()
        this.groupService.join(this.state.secret)
            .then(() => this.props.history.push('/dashboard'))
            .catch(err => console.log(err))

    }

    handleSecret = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFile = (e) => {
        console.log(e.target);
        this.setState({
            ...this.state,
            isLoading: true
        })

        const uploadData = new FormData()

        uploadData.append('imageData', e.target.files[0])

        this.uploadsService.uploadImg(uploadData)
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    groupAvatar: res.data.cloudinary_url
                })
            })
            .catch(err => alert(err, "Error"))

    }

    render() {
        return (
            <div>
                <Container className='form_container'>
                    <h1>Create a group</h1>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Name of the group</Form.Label>
                            <Form.Control name="name" value={this.state.name} onChange={this.handleInput} type="text" placeholder="Enter group name..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Group Avatar </Form.Label>
                            <Form.Control onChange={(e) => this.handleFile(e)} name="imageUrl" type="file" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Specify end date</Form.Label>
                            <Form.Control name="endDate" value={this.state.endDate} onChange={this.handleInput} type="date" />
                        </Form.Group>

                        {
                            this.checkMaxGroups() ?
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                :
                                <h2>You already have the maximum amount of groups</h2>
                        }
                    </Form>
                </Container>
                <Container>
                    <Form onSubmit={this.handleJoinForm}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Type supersecret code:</Form.Label>
                            <Form.Control name="secret" value={this.state.secret} onChange={this.handleSecret} type="text" placeholder="Enter code..." />
                        </Form.Group>

                        {/* {
                            console.log(this.checkMaxGroups())
                        }
                        {
                            this.checkMaxGroups() ?
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                :
                                <h2>You already have the maximum amount of groups</h2>
                        } */}
                    </Form>


                </Container>
            </div>
        )
    }
}
