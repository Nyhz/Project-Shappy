const router = require("express").Router()
const authRouter = require('./auth.routes')
const contentRouter = require('./content.routes')
const groupRouter = require('./group.routes')

router.use("/auth", authRouter)
router.use('/content', contentRouter)
router.use('/group', groupRouter)


module.exports = router