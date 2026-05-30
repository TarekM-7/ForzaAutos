const Auto = require('../models/auto.js');
const mongoose = require('mongoose');
const { seedAutos } = require('./seedData.js')

main()
.then(() => console.log('Connected to Mongo'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/forzaAutosApp');
}

const seedDB = async () => {
    await Auto.deleteMany({}).then(() => console.log('All cars deleted'));
    await Auto.insertMany(seedAutos);
    console.log('All cars seeded')
}

seedDB().then(() => mongoose.connection.close());