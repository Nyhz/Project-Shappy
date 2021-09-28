const express = require("express");
const router = express.Router();

const User = require('./../models/User.model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const Group = require('./../models/Group.model')
const Image = require('./../models/Image.model');
const Slander = require("../models/Slander.model");


router.post('/create', (req, res) => {

    // const { id } = req.session.currentUser
    const { name, password, groupAvatar, endDate, owner } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    Group
        .create({ owner, name, password: hashPass, groupAvatar, endDate })
        .then(() => res.json({ code: 200, message: 'Group created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating group', err: err.message }))
})

router.get('/list', (req, res) => {

    // const { id} = req.session.currentUser

    const id = '6152e7fb9ba3688e1998bb78'

    User
        .findById(id)
        .populate('groups')
        .select('groups')
        .then((user) => res.json({ code: 200, message: 'User groups retrieved', user }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while retrieving user groups', err: err.message }))

})

router.get('/images', (req, res) => {

    const groupId = '6151a8a9c522331a3ac4d0ca' //TODO

    Image
        .find({ groupRef: groupId })
        .then((images) => res.json({ code: 200, message: 'Images fetched', images }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching images', err: err.message }))
})


router.get('/slanders', (req, res) => {

    const groupId = '6151a8a9c522331a3ac4d0ca' //TODO

    Slander
        .find({ groupRef: groupId })
        .then((slanders) => res.json({ code: 200, message: 'Slanders fetched', slanders }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching slanders', err: err.message }))
})

router.get('/tag', (req, res) => {

    // const { tag } = req.body
    const tag = 'asdf'

    Image
        .find({ tag })
        .then((images) => res.json({ code: 200, message: 'Images fetched', images }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching images', err: err.message }))
})

router.get('/tag/:tag', (req, res) => {

    // const { tag } = req.params
    const tag = 'asdf'

    Image
        .find({ tag })
        .then((images) => res.json({ code: 200, message: 'Images by tag fetched', images }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching images', err: err.message }))
})


router.get('/desc', (req, res) => { //TODO Group Id params

    // const { id } = req.params

    const groupRef = '6151c2f176e7c343e24183a2'

    Image
        .find({ groupRef })
        .sort({ 'createdAt': 'desc' })
        .then((images) => {
            res.json({ code: 200, message: 'Fetched images by group, order DESC', images })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group images', err: err.message }))
})

router.get('/morelikes', (req, res) => { //TODO Group Id params

    // const { id } = req.params

    const groupRef = '6151a8a9c522331a3ac4d0ca'

    Image
        .find({ groupRef })
        .sort({ 'likes': 'desc' })
        .then((images) => {
            res.json({ code: 200, message: 'Fetched images by group, ordered by popularity (HIGHER FIRST)', images })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group images', err: err.message }))
})

router.get('/lesslikes', (req, res) => { //TODO Group Id params

    // const { id } = req.params

    const groupRef = '6151a8a9c522331a3ac4d0ca'

    Image
        .find({ groupRef })
        .sort({ 'likes': 'asc' })
        .then((images) => {
            res.json({ code: 200, message: 'Fetched images by group, ordered by popularity (LOWER FIRST)', images })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group images', err: err.message }))
})



module.exports = router