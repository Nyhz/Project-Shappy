const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const User = require('./../models/User.model')

router.post("/charge", async (req, res) => {

    let { userId, amount, id } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "EUR",
            description: "Shappy Project",
            payment_method: id,
            confirm: true,
        })
        console.log("stripe-routes.js 19 | payment", payment);
        res.json({
            amount: amount,
            message: "Payment Successful",
            success: true,
        })
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        })
    }
});

router.put('/addcoins/:amount', (req, res) => {

    const { amount } = req.params
    console.log('AMOUNT', amount);
    const userId = req.session.currentUser._id

    switch (amount) {
        case '99':
            return User
                .findByIdAndUpdate(userId, { $inc: { coins: 10 } }, { new: true })
                .then((newUser) => {
                    res.json({ code: 200, message: 'Coins added', newUser })
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
        case '499':
            return User
                .findByIdAndUpdate(userId, { $inc: { coins: 60 } }, { new: true })
                .then((newUser) => {
                    res.json({ code: 200, message: 'Coins added', newUser })
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
        case '999':
            return User
                .findByIdAndUpdate(userId, { $inc: { coins: 150 } }, { new: true })
                .then((newUser) => {
                    res.json({ code: 200, message: 'Coins added', newUser })
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
        case '1999':
            return User
                .findByIdAndUpdate(userId, { $inc: { coins: 350 } }, { new: true })
                .then((newUser) => {
                    res.json({ code: 200, message: 'Coins added', newUser })
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
        case '4999':
            console.log('entra case')
            return User
                .findByIdAndUpdate(userId, { $inc: { coins: 1000 } }, { new: true })
                .then((newUser) => {
                    console.log('user', newUser);
                    res.json({ code: 200, message: 'Coins added', newUser })
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching group', err: err.message }))
    }
})

module.exports = router