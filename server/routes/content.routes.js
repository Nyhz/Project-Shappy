const express = require("express");
const router = express.Router();

const Slander = require('./../models/Slander.model')
const Image = require('./../models/Image.model')
const User = require('./../models/User.model')



router.post('/slander', (req, res) => {

    // const { authorId } = req.session.currentUser
    const { authorId, content } = req.body

    Slander
        .create({ authorId, content })
        .then(() => res.json({ code: 200, message: 'Slander created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating slander', err: err.message }))
})

router.put('/slander/like/', (req, res) => {

    // const { id } = req.params

    const id = '6152067df03c0e5a13099164'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Slander
        .findById(id)
        .then((slander) => {

            if (!slander.likes.includes(userId)) {

                Slander
                    .findByIdAndUpdate(id, { $push: { likes: userId } })
                    .then(() => res.json({ code: 200, message: 'Slander liked' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking slander', err: err.message }))
            }
            else {

                Slander
                    .findByIdAndUpdate(id, { $pull: { likes: userId } })
                    .then(() => res.json({ code: 200, message: 'Slander like removed' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking slander', err: err.message }))
            }

        })
})

router.put('/slander/dislike/', (req, res) => {

    // const { id } = req.params

    const id = '6152067df03c0e5a13099164'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Slander
        .findById(id)
        .then((slander) => {

            if (!slander.dislikes.includes(userId)) {

                Slander
                    .findByIdAndUpdate(id, { $push: { dislikes: userId } })
                    .then(() => res.json({ code: 200, message: 'Slander disliked' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking slander', err: err.message }))
            }
            else {

                Slander
                    .findByIdAndUpdate(id, { $pull: { dislikes: userId } })
                    .then(() => res.json({ code: 200, message: 'Slander dislike removed' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking slander', err: err.message }))
            }

        })
})


router.post('/image', (req, res) => {

    // const { authorId } = req.session.currentUser

    const { authorId, imageUrl, tag, groupRef, shields } = req.body

    Image
        .create({ authorId, imageUrl, tag, groupRef, shields })
        .then(() => res.json({ code: 200, message: 'Image created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating image', err: err.message }))
})

router.put('/image/like/', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser


    const id = '6151e51cebea69b476ca8721'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Image
        .findById(id)
        .then((image) => {

            if (!image.likes.includes(userId)) {

                Image
                    .findByIdAndUpdate(id, { $push: { likes: userId } })
                    .then(() => res.json({ code: 200, message: 'Image liked' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
            }
            else {

                Image
                    .findByIdAndUpdate(id, { $pull: { likes: userId } })
                    .then(() => res.json({ code: 200, message: 'Image like removed' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
            }

        })
})






router.put('/image/dislike/', (req, res) => {

    // const { id } = req.params

    const id = '6151e51cebea69b476ca8721'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Image
        .findById(id)
        .then((image) => {

            if (!image.dislikes.includes(userId)) {

                Image
                    .findByIdAndUpdate(id, { $push: { dislikes: userId } })
                    .then(() => res.json({ code: 200, message: 'Image disliked' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
            }
            else {

                Image
                    .findByIdAndUpdate(id, { $pull: { dislikes: userId } })
                    .then(() => res.json({ code: 200, message: 'Image dislike removed' }))
                    .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
            }

        })
})


router.put('/image/shield', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '6151c946db328131a8163f8e'
    const userId = '615094af051da6a78d694469'

    const data = []


    User
        .findById(userId)
        .then(user => {
            data.push(user.shields)
            return Image
                .findById(id)
        })
        .then(image => {
            data.push(image.shields)
            if (data[0] <= 0) {
                return
            } else {
                let newImageShields = ++data[1]
                return Image.
                    findByIdAndUpdate(id, { shields: newImageShields })
            }
        })
        .then(() => {
            if (data[0] <= 0) {
                res.json({ code: 200, message: 'User has no shields' })
            } else {
                res.json({ code: 200, message: 'Image shielded successfuly' })

                let newUserShields = --data[0]
                return User
                    .findByIdAndUpdate(userId, { shields: newUserShields })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})


router.put('/image/attack', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '6151ca2692f0edebf2a0d746'
    const userId = '615094af051da6a78d694469'

    const data = []


    User
        .findById(userId)
        .then(user => {
            data.push(user.attacks)
            return Image
                .findById(id)
        })
        .then(image => {
            data.push(image.shields)
            if (data[0] <= 0) {
                return
            } else if (data[1] > 0) {
                let newImageShields = --data[1]
                return Image.
                    findByIdAndUpdate(id, { shields: newImageShields })
            } else {
                return Image.
                    findByIdAndRemove(id)
            }
        })
        .then(() => {
            if (data[0] <= 0) {
                res.json({ code: 200, message: 'User has no attacks' })
            } else {
                res.json({ code: 200, message: 'Image attacked succesfuly' })
                let newUserAttacks = --data[0]
                return User
                    .findByIdAndUpdate(userId, { attacks: newUserAttacks })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})


module.exports = router