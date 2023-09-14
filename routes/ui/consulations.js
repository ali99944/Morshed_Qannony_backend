const express = require('express')
const router = express.Router()
const Consulation = require('../../models/consultation')

router.get('/consulations',async (req,res) =>{
    try{
        let consulations = await Consulation.find({})

        return res.status(200).render('consulations/index',{
            consultations:consulations
        })
    }catch(error){
        return res.status(500).render('handlers/500',{
            error:error.message
        })
    }
})

router.get('/consulations/:id/view',async (req,res) =>{
    try{
        const { id } = req.params
        let consulation = await Consulation.findOne({ _id: id })
        return res.status(200).render('consulations/view',{
            consultation:consulation
        })
    }catch(error){
        return res.status(500).render('handlers/500',{
            error: error.message
        })
    }
})

module.exports = router