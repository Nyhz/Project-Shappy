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

    const id = '61543bb2bb9ead502cf12702'
    const userId = '6152e7fb9ba3688e1998bb78'

    const isAlreadyLiked = (slander, userId) => slander.likes.includes(userId)     
    const isNotVoted = (slander, userId) => !slander.likes.includes(userId) && !slander.dislikes.includes(userId)
    const isAlreadyDisliked = (slander, userId) => !slander.likes.includes(userId) && slander.dislikes.includes(userId)
   

    Slander
        .findById(id)
        .then((slander) => {

            if (isAlreadyDisliked(slander, userId)) {

                return Slander.findByIdAndUpdate(id, { $push: { likes: userId }, $pull:{dislikes:userId} })
                }
            else if (isNotVoted(slander, userId)){
                    
                return Slander.findByIdAndUpdate(id, { $push: { likes: userId }})
                }
            else if (isAlreadyLiked(slander, userId)){
                    
                return Slander.findByIdAndUpdate(id, { $pull: { likes: userId } })
                }
            })
        .then(() => res.json({ code: 200, message: 'Slander liked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking slander', err: err.message }))
})

router.put('/slander/dislike/', (req, res) => {

    // const { id } = req.params

    const id = '61543bb2bb9ead502cf12702'
    const userId = '6152e7fb9ba3688e1998bb78'

    const isAlreadyLiked = (slander, userId) => slander.likes.includes(userId)     
    const isNotVoted = (slander, userId) => !slander.likes.includes(userId) && !slander.dislikes.includes(userId)
    const isAlreadyDisliked = (slander, userId) => !slander.likes.includes(userId) && slander.dislikes.includes(userId)
    

    Slander
        .findById(id)
        .then((slander) => {

            if (isAlreadyLiked(slander, userId)) {
                return Slander.findByIdAndUpdate(id, { $push: { dislikes: userId }, $pull: {likes : userId} })
            }
            else if (isNotVoted(slander, userId)){
                return Slander.findByIdAndUpdate(id, { $push: { dislikes: userId }})
            }
            else if (isAlreadyDisliked(slander, userId)){
                return Slander.findByIdAndUpdate(id, { $pull: { dislikes: userId } })
            }       
        })
        .then(() => res.json({ code: 200, message: 'Slander disliked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking slander', err: err.message }))
        
})

router.put('/slander/shield', (req, res) => { //TODO LINK DEL SLANDER? EN PARAMS
   
    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '61543bb2bb9ead502cf12702'
    const userId = '6152e7fb9ba3688e1998bb78'

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
            if (data[0] <= 0) {
                return
            } else {
                let newSlanderShields = ++data[1]
                return Slander.
                    findByIdAndUpdate(id, { shields: newSlanderShields })
            }
        })
        .then(() => {
            if (data[0] <= 0) {
                res.json({ code: 200, message: 'User has no shields' })
            } else {
                res.json({ code: 200, message: 'Slander shielded successfuly' })

                let newUserShields = --data[0]
                return User
                    .findByIdAndUpdate(userId, { shields: newUserShields })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to slander', err: err.message }))
})

router.put('/slander/attack', (req, res) => { //TODO LINK DEL SLANDER EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '61543bb2bb9ead502cf12702'
    const userId = '6152e7fb9ba3688e1998bb78'

    const data = []
   

    User
        .findById(userId)
        .then(user => {
            data.push(user.attacks)
            return Slander
                .findById(id)
        })
        .then(s => {
            data.push(s.shields)
            if (data[0] <= 0) {
                return
            } else if (data[1] > 0) {
                let newSlanderShields = --data[1]
                return Slander.
                    findByIdAndUpdate(id, { shields: newSlanderShields })
            } else {
                return Slander.
                    findByIdAndRemove(id)
            }
        })
        .then(() => {
            if (data[0] <= 0) {
                res.json({ code: 200, message: 'User has no attacks' })
            } else {
                res.json({ code: 200, message: 'Slander attacked succesfuly' })
                let newUserAttacks = --data[0]
                return User
                    .findByIdAndUpdate(userId, { attacks: newUserAttacks })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to slander', err: err.message }))
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
    const userId = '6152e7fb9ba3688e1998bb78'

    const isAlreadyLiked = (image, userId) => image.likes.includes(userId)     
    const isNotVoted = (image, userId) => !image.likes.includes(userId) && !image.dislikes.includes(userId)
    const isAlreadyDisliked = (image, userId) => !image.likes.includes(userId) && image.dislikes.includes(userId)
   

    Image
        .findById(id)
        .then((image) => {

            if (isAlreadyDisliked(image, userId)) {

                return Image.findByIdAndUpdate(id, { $push: { likes: userId }, $pull:{dislikes:userId} })
                }
            else if (isNotVoted(image, userId)){
                    
                return Image.findByIdAndUpdate(id, { $push: { likes: userId }})
                }
            else if (isAlreadyLiked(image, userId)){
                    
                return Image.findByIdAndUpdate(id, { $pull: { likes: userId } })
                }
            })
        .then(() => res.json({ code: 200, message: 'Image liked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
})

router.put('/image/dislike/', (req, res) => {

    // const { id } = req.params

    const id = '6151e51cebea69b476ca8721'
    const userId = '6152e7fb9ba3688e1998bb78'
    
    const isAlreadyLiked = (image, userId) => !image.dislikes.includes(userId) && image.likes.includes(userId)      
    const isNotVoted = (image, userId) => !image.dislikes.includes(userId) && !image.likes.includes(userId)
    const isAlreadyDisliked = (image, userId) => image.dislikes.includes(userId)

    Image
        .findById(id)
        .then((image) => {

            if (isAlreadyLiked(image, userId)) {
                return Image.findByIdAndUpdate(id, { $push: { dislikes: userId }, $pull:{likes:userId} })
            }
            else if (isNotVoted(image, userId)){
                return Image.findByIdAndUpdate(id, { $push: { dislikes: userId }})
            }
            else if (isAlreadyDisliked(image, userId)){
                return Image.findByIdAndUpdate(id, { $pull: { dislikes: userId } })
            }       
        })
        .then(() => res.json({ code: 200, message: 'Image disliked' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking image', err: err.message }))
})

router.put('/image/shield', (req, res) => { //TODO LINK DE LA IMAGEN EN PARAMS

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '6151c946db328131a8163f8e'
    const userId = '6152e7fb9ba3688e1998bb78'

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


router.put('/image/attack', (req, res) => {

    // const { id } = req.params
    // const userId = req.session.currentUser

    const id = '6151ca2692f0edebf2a0d746'
    const userId = '6152e7fb9ba3688e1998bb78'

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