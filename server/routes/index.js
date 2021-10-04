const router = require("express").Router()
const authRouter = require('./auth.routes')
const contentRouter = require('./content.routes')
const groupRouter = require('./group.routes')
const profileRouter = require('./profile.routes')
const shopRouter = require('./shop.routes')
const uploadsRouter = require('./uploads.routes')
const paymentRouter = require('./payment.routes')

const baseRouter = require('./base.routes')

router.use("/auth", authRouter)
router.use('/content', contentRouter)
router.use('/group', groupRouter)
router.use('/profile', profileRouter)
router.use('/shop', shopRouter)
router.use('/uploads', uploadsRouter)
router.use('/stripe', paymentRouter)
router.use('/', baseRouter)


module.exports = router