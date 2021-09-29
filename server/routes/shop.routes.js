const express = require("express");
const router = express.Router();
const User = require('./../models/User.model')

router.put('/shield', (req, res) => { 

  
    const userId = '6152e7fb9ba3688e1998bb78'

    // User
    // .findById(userId)
    // .then((user)=>{

        User
            .findByIdAndUpdate(userId,{$inc: { shields: 1, coins:-1 }}, {runValidators : true})
            .then((user) => res.json({ code: 200, message: 'User bought a shield'}))
            .catch(err => res.status(500).json({ code: 500, message: 'DB error while buying a shield', err: err.message }))

    // })  

})



module.exports = router