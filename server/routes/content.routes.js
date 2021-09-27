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

router.put('/slander/like/', (req, res) => {

    // const { id } = req.params

    const id = '6152067df03c0e5a13099164'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Slander
    .findById(id)
    .then ((slander)=>{

     if(!slander.likes.includes(userId)){

         Slander
             .findByIdAndUpdate(id, { $push: { likes: userId } })
             .then(() => res.json({ code: 200, message: 'Slander liked' }))
             .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking slander', err: err.message }))
     }
     else{

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
    .then ((slander)=>{

     if(!slander.dislikes.includes(userId)){

         Slander
             .findByIdAndUpdate(id, { $push: { dislikes: userId } })
             .then(() => res.json({ code: 200, message: 'Slander disliked' }))
             .catch(err => res.status(500).json({ code: 500, message: 'DB error while disliking slander', err: err.message }))
     }
     else{

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

router.put('/image/like/', (req, res) => {

    // const { id } = req.params

    const id = '6151e51cebea69b476ca8721'
    const userId = '615094af051da6a78d694469'
    const arr = [];

    Image
    .findById(id)
    .then ((image)=>{

     if(!image.likes.includes(userId)){

         Image
             .findByIdAndUpdate(id, { $push: { likes: userId } })
             .then(() => res.json({ code: 200, message: 'Image liked' }))
             .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
     }
     else{

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
    .then ((image)=>{

     if(!image.dislikes.includes(userId)){

         Image
             .findByIdAndUpdate(id, { $push: { dislikes: userId } })
             .then(() => res.json({ code: 200, message: 'Image disliked' }))
             .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
     }
     else{

        Image
             .findByIdAndUpdate(id, { $pull: { dislikes: userId } })
             .then(() => res.json({ code: 200, message: 'Image dislike removed' }))
             .catch(err => res.status(500).json({ code: 500, message: 'DB error while liking image', err: err.message }))
     }
    
    })
})





module.exports = router