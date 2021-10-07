const express = require("express");
const router = express.Router();

const User = require('./../models/User.model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.post('/signup', (req, res) => {

    const { username, password, avatar, email } = req.body
    const preDefinedGroup = '615f2fbb875149aab5fad2df'

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                throw new Error('Username already exists')
            }
            if (password.length < 4) {
                throw new Error('Password must have at least 4 characters')
            }
            if (!email.match(/^[^@]+@[^@]{2,}\.[^@]{2,}$/)) {
                throw new Error('Please, enter a valid email')
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            return User
                .create({ username, password: hashPass, avatar, email })
        })
        .then((user) => {
            return User
                .findByIdAndUpdate(user._id, { $push: { groups: preDefinedGroup } }, { new: true }) //pushing predifined group
        })
        .then((user) => {
            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.post('/login', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                throw new Error('Username not registered')
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                throw new Error('Incorrect password')
            }
            req.session.currentUser = user
            res.json(req.session.currentUser)
        })
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})

router.post('/isloggedin', (req, res) => {
    req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

module.exports = router