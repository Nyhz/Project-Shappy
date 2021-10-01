const express = require("express");
const router = express.Router();

const Slander = require('./../models/Slander.model')
const Image = require('./../models/Image.model')
const User = require('./../models/User.model')
const Group = require('./../models/Group.model')
const { democracy } = require("./../utils");


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

                return Slander.findByIdAndUpdate(id, { $push: { likes: userId }, $pull: { dislikes: userId } })
            }
            else if (isNotVoted(slander, userId)) {

                return Slander.findByIdAndUpdate(id, { $push: { likes: userId } })
            }
            else if (isAlreadyLiked(slander, userId)) {

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
                return Slander.findByIdAndUpdate(id, { $push: { dislikes: userId }, $pull: { likes: userId } })
            }
            else if (isNotVoted(slander, userId)) {
                return Slander.findByIdAndUpdate(id, { $push: { dislikes: userId } })
            }
            else if (isAlreadyDisliked(slander, userId)) {
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

    const authorId = req.session.currentUser._id
    const { imageUrl } = req.body

    Image
        .create({ authorId, imageUrl, tag: "tagRandom", groupRef: "61532a2642b46ced2efb889e" })
        .then((image) => {
            Group
                .findByIdAndUpdate(image.groupRef, { $push: { images: image._id } }, { new: true })
                .then(() => {
                    return Image.findById(image._id)
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
    

    const isAlreadyLiked = (image, userId) => !image.dislikes.includes(userId) && image.likes.includes(userId)
    const isNotVoted = (image, userId) => !image.dislikes.includes(userId) && !image.likes.includes(userId)
    const isAlreadyDisliked = (image, userId) => image.dislikes.includes(userId)

    Image
        .findById(imageId)
        .then((image) => {

            if (isAlreadyLiked(image, userId)) {
                
                Image.findByIdAndUpdate(image, { $push: { dislikes: userId }, $pull: { likes: userId } }, { new: true })

                .then((image)=>{

                    image.countUsersInGroup()
                    .then(totalUsers => {

                         if(democracy(image.dislikes,image.shields,totalUsers)){

                           image.destroy()
                        }  
                    })
                })
            }
            else if (isNotVoted(image, userId)) {
                
                Image.findByIdAndUpdate(image, { $push: { dislikes: userId } }, { new: true })

                .then((image)=>{

                    image.countUsersInGroup()
                    .then(totalUsers => {
                        
                        if(democracy(image.dislikes,image.shields,totalUsers)){
               
                            image.destroy()
                        }  
                    })
                })
            }
            else if (isAlreadyDisliked(image, userId)) {
                return Image.findByIdAndUpdate(image, { $pull: { dislikes: userId } }, { new: true })
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
                return User
                    .findByIdAndUpdate(userId, { $inc: { shields: -1 } }, { new: true })
            }
        })
        .then(() => {
            if (data[0] > 0 && data[1] < 5) {
                return Image
                    .findByIdAndUpdate(id, { $inc: { shields: 1 } }, { new: true })
            }
        })
        .then(newImage => {
            if (newImage) {
                res.json({ code: 200, message: 'Image shielded succesfuly', newImage })
            } else {
                return
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})


router.put('/image/:id/attack', (req, res) => {


    const { id } = req.params
    const userId = req.session.currentUser._id

    const data = []


    //Promise.all()
    User
        .findById(userId)
        .then(user => {
            data.push(user.attacks)
            return Image.findById(id)
        })
        .then((image) => {
            data.push(image.shields)
            console.log(data[0] > 0, "attacks vs shields", userId, id)

            if (data[0] > 0) {
                User.findByIdAndUpdate(userId, { $inc: { attacks: -1 } }, { new: true })
                .then(res => console.log(res))
                .catch(err => console.log(err, "ERORORRORORORO"))
            } 

            return image
        })
        .then(image => {

            if (data[0]>0 && data[1]>0) {
                Image.findByIdAndUpdate(id, { $inc: { shields: -1 } }, { new: true })
                .then(res => console.log(res))
                .catch(err => console.log(err, "ERORORRORORORO"))

            } else if(data[0]>0 && data[1]==0){

                Group.findByIdAndUpdate(image.groupRef, {$pull: {images:image._id}})
                .then(group => {
                    Image.findByIdAndDelete(id)
                    .then(res => console.log(res))
                    .catch(err => console.log(err, "ERORORRORORORO"))
                })
            }
        })
        .then((newImage) => res.json({ code: 200, message: 'Image attacked', newImage }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})



//instanceOf























/*
    const { id } = req.params
    const userId = req.session.currentUser

    User
        .findById(userId)
        .then(user => {
            return Image.findById(id)
        })
        .then(image => {
            
            if (image.shields > 0) {
                
                return Image.findByIdAndUpdate(id, { $inc: { shields: -1 } }, { new: true })

            } else {

                return Image.findByIdAndRemove(id)
            }
        })
        .then(() => {
            if (userId.attacks <= 0) {
                res.json({ code: 200, message: 'User has no attacks' })

            } else {
                res.json({ code: 200, message: 'Image attacked succesfuly'})
                return User
                    .findByIdAndUpdate(userId, { $inc: { attacks: -1 } }, { new: true })
            }
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while applying shield to image', err: err.message }))
})
*/


module.exports = router