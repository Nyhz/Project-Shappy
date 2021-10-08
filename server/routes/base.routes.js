const express = require("express");
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
            let flatImageArr = groups.map(elm => elm.images).flat().slice(-30)
            const imgPromiseArray = flatImageArr.map((image) => Image.findById(image._id).populate('groupRef'))
            return Promise.all(imgPromiseArray)
        })
        .then(results => {
            console.log(results);
            const orderedDashboard = results.sort((a, b) => b.updatedAt - a.updatedAt)
            res.json({ code: 200, message: 'Images found!', results: orderedDashboard })
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating group', err: err.message }))
})

module.exports = router