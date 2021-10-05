const express = require("express");
const router = express.Router();
const User = require('./../models/User.model')

router.put('/shield', (req, res) => { 

  
    const userId = req.session.currentUser._id

    hasCoins = (user) => user.coins >= 10

    User
    .findById(userId)
    .then((user)=>{

        if(hasCoins(user)){

            return User.findByIdAndUpdate(user,{$inc: { shields: 1, coins:-10 }}, {new:true})
        }
        
    })  
    .then(() => res.json({ code: 200, message: 'User bought a shield'}))
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while buying a shield', err: err.message }))

})

router.put('/attack', (req, res) => { 

  
    const userId = req.session.currentUser._id

    hasCoins = (user) => user.coins >= 10

    User
    .findById(userId)
    .then((user)=>{

        if(hasCoins(user)){

            return User.findByIdAndUpdate(user,{$inc: { attacks: 1, coins:-10 }},{new:true})
        }           
    })  
    .then(() => res.json({ code: 200, message: 'User bought an attack'}))
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while buying an attack, err: err.message'}))

})



module.exports = router

