const express = require("express");
const router = express.Router();

const Group = require('./../models/Group.model')
const User = require('../models/User.model')
const Image = require('./../models/Image.model');
const Slander = require("../models/Slander.model");

const transporter = require('../config/mailing.config')


let rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};

let token = function () {
    return rand() + rand(); // to make it longer
};

token();


router.post('/create', (req, res) => {


    const secret = token()
    const { _id, email, username } = req.session.currentUser
    const { name, endDate } = req.body

    console.log(_id, email, username);

    Group
        .create({ name, secret, endDate, owner: _id })
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
            html: `<b>Hello ${username}!<br>Welcome to Shappy :) Here is your access token: ${secret} <br> Make sure you share it with your friends</b>`
        })
})

router.put('/join/:secret', (req, res) => {

    const { secret } = req.params
    const userId = req.session.currentUser._id

    Group
        .find({ secret })
        .then(group => {
            const groupId = group[0]._id.toString()
            console.log('grupo obtenido', group);
            console.log('id de ese grup', group[0]._id.toString());
            return User
                .findByIdAndUpdate(userId, { $push: { groups: groupId } }, { new: true })
        })
        .then(user => {
            console.log('usuario', user);
            res.json({ code: 200, message: 'User joined the group!', user })
        })
        .catch(err => console.log(err))
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