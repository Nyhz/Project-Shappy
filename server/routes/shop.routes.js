const express = require("express");
const router = express.Router();
const User = require('./../models/User.model')
const { hasCoins, hasMoreCoins } = require("./../utils");

router.put('/shield', (req, res) => {

    const userId = req.session.currentUser._id

    User
        .findById(userId)
        .then((user) => {
            if (hasCoins(user)) {
                return User.findByIdAndUpdate(user, { $inc: { shields: 1, coins: -10 } }, { new: true })
            }
            else {
                throw new Error('You dont have enough coins')
            }
        })
        .then(() => res.json({ code: 200, message: 'User bought a shield' }))
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.put('/fiveshields', (req, res) => {

    const userId = req.session.currentUser._id

    User
        .findById(userId)
        .then((user) => {
            if (hasMoreCoins(user)) {
                return User.findByIdAndUpdate(user, { $inc: { shields: 5, coins: -50 } }, { new: true })
            }
            else {
                throw new Error('You dont have enough coins')
            }
        })
        .then(() => res.json({ code: 200, message: 'User bought five shields' }))
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.put('/attack', (req, res) => {

    const userId = req.session.currentUser._id

    User
        .findById(userId)
        .then((user) => {
            if (hasCoins(user)) {
                return User.findByIdAndUpdate(user, { $inc: { attacks: 1, coins: -10 } }, { new: true })
            }
            else {
                throw new Error('You dont have enough coins')
            }
        })
        .then(() => res.json({ code: 200, message: 'User bought an attack' }))
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

router.put('/fiveattacks', (req, res) => {

    const userId = req.session.currentUser._id

    User
        .findById(userId)
        .then((user) => {
            if (hasMoreCoins(user)) {
                return User.findByIdAndUpdate(user, { $inc: { attacks: 5, coins: -50 } }, { new: true })
            }
            else {
                throw new Error('You dont have enough coins')
            }
        })
        .then(() => res.json({ code: 200, message: 'User bought five attacks' }))
        .catch(err => res.status(500).json({ code: 500, message: err.message }))
})

module.exports = router

