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

    const id = '615094af051da6a78d694469' //TODO

    Group
        .find({ members: id })
        .then((groups) => res.json({ code: 200, message: 'Groups fetched', groups }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching groups', err: err.message }))
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


module.exports = router