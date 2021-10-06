const express = require("express");
const router = express.Router();

const Slander = require('./../models/Slander.model')
const Image = require('./../models/Image.model')
const User = require('./../models/User.model')
const Group = require('./../models/Group.model')
const { democracy, democracySlander } = require("./../utils");


router.post('/slander', (req, res) => {

    const authorId = req.session.currentUser._id
    const { content, groupRef } = req.body

    Slander
        .create({ authorId, content, groupRef })
        .then((slander) => res.json({ code: 200, message: 'Slander created', slander }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating slander', err: err.message }))
})

router.put('/slander/:slanderId/like', (req, res) => {

    const userId = req.session.currentUser._id
    const { slanderId } = req.params

    const isAlreadyLiked = (slander, userId) => slander.likes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))
    const isNotVoted = (slander, userId) => !slander.likes.includes(userId) && !slander.dislikes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))
    const isAlreadyDisliked = (slander, userId) => !slander.likes.includes(userId) && slander.dislikes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))



    Slander
        .findById(slanderId)
        .then((slander) => {

            if (isAlreadyLiked(slander, userId)) {

                 return Slander.findByIdAndUpdate(slander, { $pull: { likes: userId } }, { new: true })

                    .then((slander) => {

                       return slander.countUsersInGroup()
                            .then(totalUsers => {

                                return Slander.findByIdAndUpdate(slander, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })
                            })
                    })
            }
            else if (isNotVoted(slander, userId)) {

                return Slander.findByIdAndUpdate(slander, { $push: { likes: userId } }, { new: true })

                    .then((slander) => {

                        return slander.countUsersInGroup()
                            .then(totalUsers => {

                                return Slander.findByIdAndUpdate(slander, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })
                            })
                    })

            }
            else if (isAlreadyDisliked(slander, userId)) {

                return Slander.findByIdAndUpdate(slander, { $push: { likes: userId }, $pull: { dislikes: userId } }, { new: true })

                    .then((slander) => {

                        return slander.countUsersInGroup()
                            .then(totalUsers => {

                                if (democracySlander(slander.dislikes, slander.likes, totalUsers) == 1) {

                                    return Slander.findByIdAndUpdate(slander, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })
                                }
                            })
                    })
            }
        })
        .then(() => res.json({ code: 200, message: 'slander liked ' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking slander', err: err.message }))
})

router.put('/slander/:slanderId/dislike', (req, res) => {

    const userId = req.session.currentUser._id
    const { slanderId } = req.params

    const isAlreadyLiked = (slander, userId) => slander.likes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))
    const isNotVoted = (slander, userId) => !slander.likes.includes(userId) && !slander.dislikes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))
    const isAlreadyDisliked = (slander, userId) => !slander.likes.includes(userId) && slander.dislikes.includes(userId) && (slander.isValidated == 0 || (slander.shields > 0 && slander.isValidated < 0))


    Slander
        .findById(slanderId)
        .then((slander) => {

            if (isAlreadyLiked(slander, userId)) {

                return Slander.findByIdAndUpdate(slander, { $push: { dislikes: userId }, $pull: { likes: userId } }, { new: true })

                    .then((slander) => {

                        return slander.countUsersInGroup()
                            .then(totalUsers => {

                                return Slander.findByIdAndUpdate(slanderId, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })

                            })
                    })
            }

            else if (isNotVoted(slander, userId)) {

                return Slander.findByIdAndUpdate(slander, { $push: { dislikes: userId } }, { new: true })
                    .then((slander) => {

                        return slander.countUsersInGroup()
                            .then(totalUsers => {

                                return Slander.findByIdAndUpdate(slanderId, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })

                            })
                    })
            }

            else if (isAlreadyDisliked(slander, userId)) {

                return Slander.findByIdAndUpdate(slander, { $pull: { dislikes: userId } }, {
                    new: true
                })
                    .then((slander) => {

                        return slander.countUsersInGroup()
                            .then(totalUsers => {

                                return Slander.findByIdAndUpdate(slanderId, { isValidated: democracySlander(slander.dislikes, slander.likes, totalUsers) }, { new: true })

                            })
                    })
            }
        })
        .then(() => res.json({ code: 200, message: 'Slander disliked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking slander', err: err.message }))

})

router.put('/slander/:id/shield', (req, res) => {

    const { id } = req.params
    const userId = req.session.currentUser._id

    const data = []

    User
        .findById(userId)
        .then(user => {
            data.push(user.shields)
            return Slander
                .findById(id)
        })
        .then(slander => {

            data.push(slander.shields)

            if (slander.isValidated > 0) {

                return 
            }
            else if ((data[0] > 0 && data[1]<5) && (slander.isValidated == 0 || (slander.isValidated < 0 && data[1] > 0))) {

                let newSlanderShields = ++data[1]

                return Slander.findByIdAndUpdate(id, { shields: newSlanderShields })
                    .then(() => {

                        let newUserShields = --data[0]
                        return User.findByIdAndUpdate(userId, { shields: newUserShields })
                    })
            }
        })

        .then(() => {

            if(data[1]==5){
                throw new Error ('Maximun shields reached')
               
            }
            else if (data[0] == 0) {
                throw new Error ('You dont have any shields')
                
            }
            else {
               res.json({ code: 200, message: 'Slander shieled succesfuly' })
                

            }
        })
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.put('/slander/:id/attack', (req, res) => {

    const { id } = req.params
    const userId = req.session.currentUser._id
    const data = []

    User
        .findById(userId)
        .then(user => {
            data.push(user.attacks)
            return Slander
                .findById(id)
        })
        .then(slander => {
            data.push(slander.shields)

            if (data[0] == 0 || (data[1] == 0 && (slander.isValidated == -1 || slander.isValidated == 1))) {

                return

            } else if ((data[1] > 0 && slander.isValidated == 0) || (data[1] > 0 && (slander.isValidated < 0 && slander.shields > 0))) {

                let newSlanderShields = --data[1]
                let newUserAttacks = --data[0]

                return Slander.findByIdAndUpdate(id, { shields: newSlanderShields })
                    .then(() => {

                        return User.findByIdAndUpdate(userId, { attacks: newUserAttacks })
                    })
            }
            else if (data[1] == 0) {

                let newUserAttacks = --data[0]

                return Slander.findByIdAndUpdate(id, { isValidated: -1 }, { new: true })

                    .then(() => {

                        return User.findByIdAndUpdate(userId, { attacks: newUserAttacks })
                    })
            }
        })
        .then(() => {

            if (data[1] == 0) {
                throw new Error ('Slander is checked')
            }
            else if(data[0] == 0) {

                 throw new Error ('You dont have any attacks')
            }
            else {
                res.json({ code: 200, message: 'Slander attacked succesfuly' })

            }
        })
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})


router.get('/getformdata', (req, res) => {

    const userId = req.session.currentUser._id

    User
        .findById(userId)
        .populate('groups')
        .select('groups')
        .then((groups) => res.json({ code: 200, message: 'Groups fetched', groups }))
})


router.post('/image', (req, res) => {

    const authorId = req.session.currentUser._id
    const { imageUrl, groupRef, tag } = req.body

    Image
        .create({ authorId, imageUrl, tag, groupRef })
        .then((image) => {
            Group
                .findByIdAndUpdate(image.groupRef, { $push: { images: image._id } }, { new: true })
                .then(() => {
                    return Image.findById(image._id)
                })
                .then(()=>{
                    return User.findByIdAndUpdate(authorId,{ $inc: { coins: 1 } } )
                })
                .then(image => res.json({ code: 200, message: 'Image created', image }))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating image', err: err.message }))
})

router.get('/image/:imageId/get', (req, res) => {

    const { imageId } = req.params

    Image
        .findById(imageId)
        .then((image) => res.json({ code: 200, message: 'Image liked', image }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching image', err: err.message }))


})

router.put('/image/:imageId/like', (req, res) => {

    const userId = req.session.currentUser._id
    const { imageId } = req.params

    const isAlreadyLiked = (image, userId) => image.likes.includes(userId)
    const isNotVoted = (image, userId) => !image.likes.includes(userId) && !image.dislikes.includes(userId)
    const isAlreadyDisliked = (image, userId) => !image.likes.includes(userId) && image.dislikes.includes(userId)

    Image
        .findById(imageId)
        .then((image) => {
            if (isAlreadyLiked(image, userId)) {

                return Image.findByIdAndUpdate(image, { $pull: { likes: userId } }, { new: true })
            }
            else if (isNotVoted(image, userId)) {

                return Image.findByIdAndUpdate(image, { $push: { likes: userId } }, { new: true })
            }
            else if (isAlreadyDisliked(image, userId)) {

                return Image.findByIdAndUpdate(image, { $push: { likes: userId }, $pull: { dislikes: userId } }, { new: true })
            }
        })
        .then((newImage) => res.json({ code: 200, message: 'Image liked', newImage }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
})

router.put('/image/:imageId/dislike', (req, res) => {

    const userId = req.session.currentUser._id
    const { imageId } = req.params

    let imageDoc, checkDestroy = true

    const isAlreadyLiked = (image, userId) => !image.dislikes.includes(userId) && image.likes.includes(userId)
    const isNotVoted = (image, userId) => !image.dislikes.includes(userId) && !image.likes.includes(userId)
    const isAlreadyDisliked = (image, userId) => image.dislikes.includes(userId)

    Image
        .findById(imageId)
        .then((image) => {

            if (isAlreadyLiked(image, userId)) {
                return Image.findByIdAndUpdate(image, { $push: { dislikes: userId }, $pull: { likes: userId } }, { new: true })
            }
            else if (isNotVoted(image, userId)) {
                return Image.findByIdAndUpdate(image, { $push: { dislikes: userId } }, { new: true })
            }
            else if (isAlreadyDisliked(image, userId)) {
                checkDestroy = false
                return Image.findByIdAndUpdate(image, { $pull: { dislikes: userId } }, { new: true })
            }
        })
        .then((image) => {
            imageDoc = image
            return image.countUsersInGroup()
        })
        .then(totalUsers => {
            if (!checkDestroy) return imageDoc

            if (democracy(imageDoc.dislikes, imageDoc.shields, totalUsers)) {

                return imageDoc.destroy()
            }
        })
        .then((newImage) => res.json({ code: 200, message: 'Image disliked', newImage }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking image', err: err.message }))
})

router.put('/image/:id/shield', (req, res) => {

    const { id } = req.params
    const userId = req.session.currentUser

    const data = []

    User
        .findById(userId)
        .then(user => {
            data.push(user.shields)
            return Image
                .findById(id)
        })
        .then((image) => {
            data.push(image.shields)
            if (data[0] > 0) {
                return User.findByIdAndUpdate(userId, { $inc: { shields: -1 } }, { new: true })
            }
            else{
                throw new Error ('You dont have shields')
            }
        })
        .then(() => {
            if (data[0] > 0 && data[1] < 5) {
                return Image.findByIdAndUpdate(id, { $inc: { shields: 1 } }, { new: true })
            }
            else{
                throw new Error ('Maximun shields reached')
            }
        })
        .then(newImage => {
            if (newImage) {
                res.json({ code: 200, message: 'Image shielded succesfuly', newImage })
            } 
        })
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})


router.put('/image/:id/attack', (req, res) => {

    const { id } = req.params
    const userId = req.session.currentUser._id
    const data = [] //ATAQUES VS ESCUDOS

    User
        .findById(userId)
        .then(user => {
            data.push(user.attacks)
            return Image.findById(id)
        })
        .then((image) => {

            data.push(image.shields)
            if (data[0] > 0) {

                return User.findByIdAndUpdate(userId, { $inc: { attacks: -1 } }, { new: true })
                    .then(res => console.log(res))
                    .catch(err => console.log(err, "Error"))
            }
            else{
                throw new Error ('You don´t have attacks')
            }
        })
        .then(image => {

            if (data[0] > 0 && data[1] > 0) {

                return Image.findByIdAndUpdate(id, { $inc: { shields: -1 } }, { new: true })
                    .then((image) => {

                        return image.countUsersInGroup()
                            .then(totalUsers => {

                                if (democracy(image.dislikes, image.shields, totalUsers)) {

                                    return image.destroy()
                                }
                            })
                    })

            } else if (data[0] > 0 && data[1] == 0) {

                return Image.findByIdAndUpdate(id)

                .then((image)=> image.destroy())
            }
        })
        .then((newImage) => res.json({ code: 200, message: 'Image attacked', newImage }))
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.get('/getuser/:userId', (req, res) => {

    const { userId } = req.params
    console.log(userId);

    User
        .findById(userId)
        .then(user => res.json({ code: 200, message: 'User fetched', user }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
})

module.exports = router