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

autoSchema.virtual('carClassLetter').get(function() {
    const pi = this.carClass;
    if (pi <= 500) return 'D';
    if (pi <= 600) return 'C';
    if (pi <= 700) return 'B';
    if (pi <= 800) return 'A';
    if (pi <= 900) return 'S1';
    if (pi <= 998) return 'S2';
    if (pi = 999) return 'R';
    return 'X';
});

const Auto = mongoose.model('Auto', autoSchema);

module.exports = Auto;