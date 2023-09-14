const express = require('express')
const router = express.Router()
const Lawyer = require('../../models/consultation')

router.get('/lawyers',async (req,res) =>{
    try{
        let lawyers = await Lawyer.find({})
        return res.status(200).json(lawyers)
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.post('/lawyers',async (req,res) =>{
    try {
        const { name, phone, country } = req.body
        const lawyer = new Lawyer({
            name,phone,country
        })

        await lawyer.save()
        return res.status(200).send("Lawyer Was Created Successfully")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.delete('/lawyers', async (req,res) =>{
    try{
        await Lawyer.deleteMany({})
        return res.status(200).send("All Lawyers Were Deleted")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.delete('/lawyers/:id',async (req,res) =>{
    try{
        let isDeleted = await Lawyer.deleteOne({ _id: req.params.id })
        if(isDeleted){
            return res.status(200).send("Lawyer Was Deleted")
        }
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.put('/lawyers/:id',async (req,res) =>{
    try{
        const { name,phone,country } = req.body
        await Lawyer.findOneAndUpdate({ _id: req.params.id },{
            name,phone,country
        },{ $new: true })
        return res.status(200).send("Lawyer Was Updated")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

module.exports = router