const mongoose = require('mongoose')

const ConsultationSchema = new mongoose.Schema({
    phone:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    paymentImage:{
        type: String,
        required: true
    }
})

const ConsultationModel = mongoose.model('Consultation', ConsultationSchema)

module.exports = ConsultationModel