const express = require("express");
const router = express.Router();

const User = require('./../models/User.model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const Group = require('./../models/Group.model')


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



module.exports = router