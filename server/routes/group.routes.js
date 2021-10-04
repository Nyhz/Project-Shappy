const express = require("express");
const router = express.Router();

const Group = require('./../models/Group.model')
const User = require('../models/User.model')
const Image = require('./../models/Image.model');
const Slander = require("../models/Slander.model");

const transporter = require('../config/mailing.config')

let rand = function () {
    return Math.random().toString(36).substr(2)
}

let token = function () {
    return rand() + rand()
}

router.post('/create', (req, res) => {

    const secret = token()
    const { _id, email, username } = req.session.currentUser
    const { name, endDate, groupAvatar } = req.body

    Group
        .create({ name, secret, endDate, groupAvatar, owner: _id })
        .then((newGroup) => {
            return User
                .findByIdAndUpdate(_id, { $push: { groups: newGroup._id } })
        })
        .then(() => res.json({ code: 200, message: 'Group created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating group', err: err.message }))

    transporter
        .sendMail({
            from: 'Shappy <shappycrew@gmail.com>',
            to: email,
            subject: 'Here is your group access token!',
            text: 'Hello',
            html: `
            Hello ${username}!
            <br>
            Welcome to Shappy :) 
            <br><br> 
            Here is your access token: <b>${secret}</b> 
            <br><br> 
            Make sure you share it with your friends.
            <br><br>
            Sincerely, 
            <br>
            the Shappy Team!`
        })
})

router.put('/join/:secret', (req, res) => {

    const { secret } = req.params
    const userId = req.session.currentUser._id

    Group
        .find({ secret })
        .then(group => {
            const groupId = group[0]._id.toString()
            return User
                .findByIdAndUpdate(userId, { $push: { groups: groupId } }, { new: true })
        })
        .then(user => {
            res.json({ code: 200, message: 'User joined the group!', user })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while joining group', err: err.message }))
})

router.get('/list', (req, res) => {

    const id = req.session.currentUser._id

    User
        .findById(id)
        .populate('groups')
        .select('groups')
        .then((groups) => {
            const groupArr = groups.groups
            res.json({ code: 200, message: 'User groups retrieved', groupArr })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while retrieving user groups', err: err.message }))
})

router.get('/images/:groupId', (req, res) => {

    const { groupId } = req.params

    Image
        .find({ groupRef: groupId })
        .populate('groupRef')
        .then((images) => {
            res.json({ code: 200, message: 'Images fetched', images })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching images', err: err.message }))
})

router.get('/slanders/:groupId', (req, res) => {

    const groupId = req.params.groupId

    Slander
        .find({ groupRef: groupId })
        .then((slanders) => res.json({ code: 200, message: 'Slanders fetched', slanders }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching slanders', err: err.message }))
})

router.get('/tag/:tag', (req, res) => {

    //const { tag } = req.params
    //const tag = 'asdf'

    Image
        .find({ tag })
        .then((images) => res.json({ code: 200, message: 'Images by tag fetched', images }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching images', err: err.message }))
})

router.get('/morelikes/:groupId', (req, res) => {

    const { groupId } = req.params

    Image
        .find({ groupRef: groupId })
        .then((images) => {
            const sortedImages = [...images].sort((a, b) => a.likes.length > b.likes.length)
            res.json({ code: 200, message: 'Fetched images by group, ordered by popularity (HIGHER FIRST)', images: sortedImages })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group images', err: err.message }))
})

router.get('/summary/:groupId', (req, res) => {

    const { groupId } = req.params

    Group
        .findById(groupId)
        .populate('images')
        .then(group => {
            res.json({ code: 200, message: 'Group fetched', group })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
})

router.get('/groupend', (req, res) => {

    const today = new Date();
    console.log(today);

    Group
        .find({})
        .then((groups) => {

            const closingGroups = []

            for (let i = 0; i < groups.length; i++) {
                if (!groups[i].isEnded && groups[i].endDate < today) {
                    closingGroups.push(groups[i])
                }
            }
            return closingGroups


        })
        .then(groups => {
            console.log(groups);
            return Group
                .findByIdAndUpdate(groups[0]?._id, { isEnded: true })
        })
        .then(group => res.json({ code: 200, message: 'Group closed', group }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while closing groups', err: err.message }))
})

router.put('/closegroup', (req, res) => {

    Group
        .findByIdAndUpdate({})
})


module.exports = router