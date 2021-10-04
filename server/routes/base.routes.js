const express = require("express");
const Group = require("../models/Group.model");
const router = express.Router();
const Image = require('./../models/Image.model');
const User = require('./../models/User.model')

router.get('/list', (req, res) => {

    const id = req.session.currentUser._id

    User
        .findById(id)
        .populate('groups')
        .select('groups')
        .then(({ groups }) => {
            console.log(groups)
            let flatImageArr = groups.map(elm => elm.images).flat()
            const imgPromiseArray = flatImageArr.map((image) => Image.findById(image.toString()))
            return Promise.all(imgPromiseArray)
        })
        .then(results => {
            res.json({ code: 200, message: 'Images found!', results })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating group', err: err.message }))
})

module.exports = router