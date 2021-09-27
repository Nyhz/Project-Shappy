const express = require("express");
const router = express.Router();

const Slander = require('./../models/Slander.model')
const Image = require('./../models/Image.model')



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

router.put('/image/addlike/', (req, res) => {

    // const { id } = req.params

    const id = '6151c946db328131a8163f8e'
    const userId = '615094af051da6a78d694469'

    Image
        .findByIdAndUpdate(id, { $push: { likes: userId } })
        .then(() => res.json({ code: 200, message: 'Image liked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
})






module.exports = router