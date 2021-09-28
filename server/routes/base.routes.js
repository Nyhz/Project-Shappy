const express = require("express");
const Group = require("../models/Group.model");
const router = express.Router();

const Image = require('./../models/Image.model');
const User = require('./../models/User.model')

router.get('/list', (req, res) => {

    const id = '6152f1effc943b4ab2b6c3d1'

    User
        .findById(id)
        .populate('groups')
        .select('groups')
        .then(({ groups }) => {
            let flatImageArr = groups.map(elm => elm.images).flat()
            const imgPromiseArray = flatImageArr.map((image) => Image.findById(image.toString()))
            return Promise.all(imgPromiseArray)
        })
        .then(results => res.json({ code: 200, message: 'Group created', results }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating group', err: err.message }))
})

module.exports = router