const express = require("express");
const router = express.Router();

const User = require('./../models/User.model')

router.get('/', (req, res) => {

    const id = req.session.currentUser._id

    User
        .findById(id)
        .then((user) => {
            console.log(user)
            res.json({ code: 200, message: 'User profile retrieved', user })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while retrieving user profile', err: err.message }))

})

router.get('/groups', (req, res) => {

    const id = req.session.currentUser._id

    User
        .findById(id)
        .populate('groups')
        .select('groups')
        .then((user) => {
            console.log('USERRRRRRRRRR', user)
            res.json({ code: 200, message: 'User historic groups retrieved', user })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while retrieving user groups', err: err.message }))

})











module.exports = router