const express = require('express')
const router = express.Router()

router.get('/lawyers',async (req,res) => {
    return res.status(200).render('lawyers/index')
})

module.exports = router