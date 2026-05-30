const mongoose = require('mongoose')

const autoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    carClass: {
        type: Number,
        required: true,
        min: 100
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto;