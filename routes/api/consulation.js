const express = require('express')
const router = express.Router()
const Consultation = require('../../models/consultation')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/consultations/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.get('/consultations',async (req,res) =>{
    try{
        let consultations = await Consultation.find({})
        return res.status(200).json(consultations)
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.post('/consultations',upload.single('image'),async (req,res) =>{
    try {
        const { name,phone,subject,gender } = req.body
        console.log(req.body)
        console.log(req.file)
        if(!req.file){
            return res.status(400).send("Image must be provided")
        }


        const consultation = new Consultation({
            name,phone,subject,gender,
            paymentImage: process.env.BASE_URL + "images/consultations/" + req.file.filename
        })

        await consultation.save()
        return res.status(200).send("Consultation Was Created Successfully")
    }catch (error){
        return res.status(500).json({
            error: error.message,
            file: req.file
        })
    }
})

router.delete('/consultations', async (req,res) =>{
    try{
        await Consultation.deleteMany({})
        return res.status(200).send("All Consultations Were Deleted")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.delete('/consulations/:id',async (req,res) =>{
    try{
        let isDeleted = await Consultation.deleteOne({ _id: req.params.id })
        if(isDeleted){
            return res.status(200).send("Consultation Was Deleted")
        }
    }catch (error){
        return res.status(500).send(error.message)
    }
})

router.delete('/consulations',async (req,res) =>{
    try{
        await Consultation.deleteMany({})

        return res.status(200).send("All Consulations Were Deleted")
    }catch(error){
        return res.status(500).send(error.message)
    }
})

router.put('/consulations/:id',async (req,res) =>{
    try{
        const { name,phone,subject,gender } = req.body
        await Consultation.findOneAndUpdate({ _id: req.params.id },{
            name,phone,paymentImage,subject,gender
        },{ $new: true })

        return res.status(200).send("Consultation Was Updated")
    }catch (error){
        return res.status(500).send(error.message)
    }
})

module.exports = router