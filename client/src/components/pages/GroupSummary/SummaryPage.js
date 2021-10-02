import React, { Component } from 'react'
import GroupService from '../../../services/group.services'
import SummaryImages from './SummaryImages'
import SummaryInfo from './SummaryInfo'

export default class SummaryPage extends Component {
    constructor() {
        super()

        this.state = {
            group: null,
            images: null,
            mostLikedUrl: ""
        }

        this.groupService = new GroupService()
    }

    componentDidMount = () => {
        this.getGroup()
        this.getImagesByLikes()
    }

    getGroup = () => {
        this.groupService.getSummary(this.props.match.params.groupId)
            .then(group => {
                this.setState({
                    ...this.state,
                    group: group
                })
            })
    }

    getImagesByLikes = () => {

        this.groupService.getImageByLikes(this.props.match.params.groupId)
            .then((orderedImages) => {
                this.setState({
                    ...this.state,
                    images: orderedImages.data.images
                })
            })
    }


    displayImagesByLikes = () => {

        return (
            this.state.images?.length > 0 ?
                this.state.images.map(image => {
                    return (
                        <SummaryImages key={image._id} {...image} loggedUser={this.props.loggedUser} />
                    )
                })
                :
                <h2>Loading</h2>
        )
    }

    displaySummaryInfo = () => {

        return (
            <SummaryInfo group={this.state.group} loggedUser={this.props.loggedUser} />
        )
    }


    // getMostLiked = () => {

    //     const imageArr = this.state.group.images
    //     const mostLikedImage = []

    //     mostLikedImage.push(imageArr[0])

    //     for (let i = 1; i < imageArr.length; i++) {
    //         if (imageArr[i].likes.length > mostLikedImage[0].likes.length) {
    //             mostLikedImage.pop()
    //             mostLikedImage.push(imageArr[i])
    //         }
    //     }
    //     return mostLikedImage[0]

    // }


    render() {
        return (
            <div>

                {
                    this.displaySummaryInfo()
                }
                {
                    this.displayImagesByLikes()
                }
            </div>
        )
    }
}
