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

router.post('/image', (req, res) => {

    // const { authorId } = req.session.currentUser

    const { authorId, imageUrl, tag, groupRef } = req.body

    Image
        .create({ authorId, imageUrl, tag, groupRef })
        .then(() => res.json({ code: 200, message: 'Image created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating image', err: err.message }))
})

router.put('/image/like/', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser


    const id = '6151c946db328131a8163f8e'
    const userId = '615094af051da6a78d694469'

    Image
        .findByIdAndUpdate(id, { $push: { likes: userId } })
        .then(() => res.json({ code: 200, message: 'Image liked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
})

router.put('/image/dislike/', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '6151c946db328131a8163f8e'
    const userId = '615094af051da6a78d694469'

    Image
        .findByIdAndUpdate(id, { $push: { dislikes: userId } })
        .then(() => res.json({ code: 200, message: 'Image disliked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking image', err: err.message }))
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
                let newUserShields = --data[0]
                return User
                    .findByIdAndUpdate(userId, { shields: newUserShields })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})
























//     User
//         .findByIdAndUpdate(userId, { shields: --user.shields })
//         .then(() => {
//             return Image
//                 .findByIdAndUpdate(id, { shields: shields - 1 })
//         })
//         .then(() => res.json({ code: 200, message: 'Image correctly shielded!' }))
//         .catch(err => res.status(500).json({ code: 500, message: 'DB error while adding shield to image', err: err.message }))

// })


module.exports = router