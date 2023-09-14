const express = require('express')
const router = express.Router()

router.get('/countries',async (req,res) => {
    return res.status(200).render('countries/index')
})

module.exports = router